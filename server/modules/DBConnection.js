import { Admin, Student } from "../models/accounts.js";
import { getCEmail } from "./passwordRecovery.js";
import './paramchecker.js'

export class MongoDBConnection {
    constructor() {
        this.acFormat = (userData) => {};
        this.rjFormat = (error) => {};

        this.acceptCallback = this.acFormat;
        this.rejectCallback = this.rjFormat;
    }

    // sets the template for the accept callback
    setAcceptCallback(callback=this.acFormat) { this.acceptCallback = callback; }

    // sets the template for the reject callback
    setRejectCallback(callback=this.rjFormat) { this.rejectCallback = callback; }

    // checks the existence of student username
    checkStudentUserAndEmail(username, email) {
        Student.find({'$or': [{username: username}, {email: email}]})
            .then(this.acceptCallback).catch(this.rejectCallback);
    }

    // tries to login the account
    login(username, password) {
        Student.findOne({'$or': [{username: username}, {email: username}]})
            .then(userdata => {
                if (userdata == null)
                    return this.rejectCallback('NonExistentEmail');

                if (!userdata.verified)
                    return this.rejectCallback('UnverifiedAccount');

                if (userdata.password == password)
                    return this.acceptCallback(userdata);
                this.rejectCallback('InvalidCredentials');
            })
            .catch(this.rejectCallback);
    }

    // logs in an admin account
    loginAdmin(email, password) {
        Admin.findOne({'email': email})
            .then(userdata => {
                if (userdata == null)
                    return this.rejectCallback('NonExistentEmail');

                if (userdata.password == password) {
                    return this.acceptCallback(userdata);
                }
                this.rejectCallback('InvaildCredentials');
            })
    }

    // registers a student account
    registerStudent(username, email, password, contact, nameJSON) {
        const newStudentAccount = new Student({
            username: username,
            email: email,
            password: password,
            contact: contact,
            access: 'student',
            verified: false,
            details: {
                name: nameJSON
            }
        });
        newStudentAccount.save().then(this.acceptCallback).catch(this.rejectCallback);
    }

    // changes the password of the user registered in this changepass pin
    changePass(changePassKey, password) {
        const email = getCEmail(changePassKey);
        if (email == null) return this.rejectCallback('NonexistentChangePasswordKey');

        Student.findOneAndUpdate({email: email}, {password: password}, {upsert: true})
            .then(this.acceptCallback).catch(this.rejectCallback);
    }
}