import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// simply sends an email to the recipient
export function sendMail(to, subject, text, acceptCallback, rejectCallback) {
    if (process.env.GMAIL_USER == "" || process.env.GMAIL_PASS == "") {
        rejectCallback('NoAccountSet');
        return false;
    }

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return rejectCallback(err);
        acceptCallback(info);
    });

    return true;
}