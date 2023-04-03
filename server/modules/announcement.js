// this json file will contain the current anouncements
// we decided that this will only be stored in single file.
import { sendMail } from "./Mailer.js";

export const announcement = {
    subject: '',
    message: ''
};

export function setAnnouncement(subject, message) {
    announcement.subject = subject;
    announcement.message = message;
}

// emails all the email address on the list
// returns the email list where the announcement is successfully sent
export function announceByEmail(emailAddressArray) {
    const succesfulEmailList = [];
    emailAddressArray.forEach(email => {
        sendMail(email, announcement.subject, announcement.message,
            function(data) {
                succesfulEmailList.push(email);
            });
    });

    return succesfulEmailList;
}

export function getAnnouncement() {
    return announcement;
}