"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
// Create a transporter object
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
// Function to send order confirmation email
const sendOrderConfirmationEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: config_1.default.email.user,
        to: email,
        subject: 'OTP Verification',
        html: `
        <h1>OTP Verification</h1>
        <p>Your OTP is ${otp}</p>
        `
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');
    }
    catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
});
exports.sendOrderConfirmationEmail = sendOrderConfirmationEmail;
