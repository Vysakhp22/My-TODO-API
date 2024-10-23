import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the structure of our JWT payload
interface TokenPayload {
    userId: string;
    email: string;
    // Add other fields you need from your JWT
    iat?: number;
    exp?: number;
}

// Extend Express Request type to include our user data
declare global {
    namespace Express {
        interface Request {
            userData?: TokenPayload;
        }
    }
}

// Environment variable type checking
if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined in environment variables');
}

/**
 * Authentication middleware for Express
 * Verifies JWT tokens and adds decoded user data to request object
 */
export const checkAuth = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: 'No authorization header found'
            });
            return
        }

        // Check for correct authorization format
        if (!authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Invalid authorization format'
            });
            return
        }

        const token = authHeader.split(' ')[1];

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_KEY as string) as TokenPayload;

        // Validate token expiration explicitly
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({
                success: false,
                message: 'Token has expired'
            });
            return
        }

        // Add decoded token to request object
        req.userData = decoded;

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
            return
        } else if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: 'Token has expired'
            });
            return
        }
        res.status(500).json({
            success: false,
            message: 'Internal server error during authentication'
        });
        return
    }
};

export default checkAuth;