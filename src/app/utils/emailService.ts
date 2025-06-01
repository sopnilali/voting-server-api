import nodemailer from 'nodemailer';
import config from '../config';

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to send order confirmation email
export const sendOrderConfirmationEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: 'OTP Verification',
        html: `
        <h1>OTP Verification</h1>
        <p>Your OTP is ${otp}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
}; 