import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors";
import status from 'http-status';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Increase payload size limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/api', router)

//global routes
app.get("/", (req, res) => {
    res.send("Voting server is running!!");
});

// global error handler
app.use(globalErrorHandler)

// not found route handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: "Api Not Found",
        error: {
            path: req.originalUrl,
            message: "Your request path is not found!"
        }
    })
})

export default app;