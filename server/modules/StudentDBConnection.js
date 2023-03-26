import { MongoDBConnection } from "./DBConnection.js";
import { Student } from "../models/accounts.js";

// this class is made for student's functionalities
export class StudentDBConnection extends MongoDBConnection {
    constructor(userTokenData) {
        super();
        this.userTokenData = userTokenData;
    }

    // retrieves the current account's detail
    getAccountDetails() {
        const srCode = this.userTokenData.username;
        Student.findOne({username: srCode})
            .then(this.acceptCallback)
            .catch(this.rejectCallback);
    }

    // changes the password of this account
    changePass(newPassword) {
        const srCode = this.userTokenData.username;
        Student.findOne({username: srCode})
            .then(userdata => {
                if (userdata == null)
                    return this.rejectCallback('NonexistentUser');

                // changes the password
                userdata.password = newPassword;
                userdata.save().then(this.acceptCallback).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }

    // update account details
}