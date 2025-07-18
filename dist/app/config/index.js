"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    jwt: {
        jwt_access_secret: process.env.JWT_ACCESS_SECRET,
        jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
        jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
        jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
        bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
        jwt_reset_password_secret: process.env.JWT_RESET_PASSWORD_SECRET,
        jwt_reset_password_expires_in: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    email: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD
    },
    saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
    node_env: process.env.NODE_ENV,
};
