import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// simply sends an email to the recipient
export function sendMail(to, subject, text, acceptCallback, rejectCallback) {
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
}

// template for password recovery email
export function passwordRecovery(userEmail, generatedCode, acceptCallback, rejectCallback) {
    const subject = 'PASSWORD RESET';
    const text = `Hello Dear Spartan!\nLooks like you forgot your password, but no worries! you can still retrieve\nit by entering the code: ${generatedCode}. If you don't intend to change your\npassword but recieved this message, it is adviced that you change your password\nimmediately as this means someone's trying to access your account.`;
    sendMail(userEmail, subject, text, acceptCallback, rejectCallback);
}