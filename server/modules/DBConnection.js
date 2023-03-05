import { Account, Pending } from "../models/accounts.js";
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
    checkUsernameAndEmail(username, email) {
        Account.findOne({ username: username, email: email })
            .then(this.acceptCallback)
            .catch(this.rejectCallback);
    }

    // tries to login the account
    login(username, password) {
        Account.findOne({ username: username, password: password })
            .then(this.acceptCallback)
            .catch(this.rejectCallback);
    }

    // registers a student account
    registerStudent(username, email, password, nameJSON) {
        const pendingAccount = new Pending({
            username: username,
            email: email,
            password: password,
            name: nameJSON
        });

        pendingAccount.save()
            .then(this.acceptCallback)
            .catch(this.rejectCallback);
    }
}