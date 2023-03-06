import { Student } from "../models/accounts.js";
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
        Student.findOne({'$or': [{username: username}, {email: email}]})
            .then(userdata => {
                if (userdata == null)
                    return this.rejectCallback('NonExistentEmail');
                if (userdata.password == password)
                    return this.acceptCallback(userdata);
                this.rejectCallback('InvalidCredentials');
            })
            .catch(this.rejectCallback);
    }

    // registers a student account
    registerStudent(username, email, password, contact, nameJSON) {
        const newStudentAccount = new Student({
            username: username,
            email: email,
            password: password,
            contact: contact,
            access: 'student',
            details: {
                name: nameJSON
            }
        });
        newStudentAccount.save().then(this.acceptCallback).catch(this.rejectCallback);
    }
}