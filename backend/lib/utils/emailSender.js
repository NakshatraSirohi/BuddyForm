import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying email configuration:', error);
    } else {
        console.log('Email configuration is working!');
    }
});
const severityEmailMap = {
    low: "ojhaneha00028@gmail.com",
    medium: "buddyForum6@gmail.com",
    high: "high-coordinator@example.com",
    critical: "critical-coordinator@example.com",
};

// Function to send emails
export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
