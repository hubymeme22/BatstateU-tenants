import { Account, Pending } from "../models/accounts.js";

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

export class AdminMongoDBConnection extends MongoDBConnection {
    constructor(userTokenData) {
        super();
        this.userTokenData = userTokenData;
    }

    // registers an admin account
    registerAdmin(username, password, nameJSON) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        const adminAccount = new Account({
            username: username,
            password: password,
            name: nameJSON,
            access: 'admin'
        });
    }

    // verifies a student account from pending
    verifyStudent(username) {
        Pending.findOne({ username: username })
            .then(userdata => {
                if (userdata != null) {
                    const newAccount = new Account({
                        username: userdata.username,
                        email: userdata.email,
                        password: userdata.password,
                        name: userdata.name,
                        access: 'student'
                    });
                    Pending.deleteOne({ username: username }).then(userdata => {
                        return newAccount.save().then(this.acceptCallback).catch(this.rejectCallback);
                    }).catch(this.rejectCallback);
                }

                this.rejectCallback("alredy_verified");
            }).catch(this.rejectCallback);
    }
}