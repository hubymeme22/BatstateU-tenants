import { MongoDBConnection } from "./DBConnection.js";
import { Student } from "../models/accounts.js";
import { Bills } from "../models/bills.js";

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
            .select('details.name email contact password')
            .then(this.acceptCallback)
            .catch(this.rejectCallback);
    }

    // gets all the user's bills
    getUserBills() {
        Bills.find({'users.username': this.userTokenData.username})
            .then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets all the user's unpaid bills
    getUserUnpaidBills() {
        Bills.find({'$and': [{'users.username': this.userTokenData.username}, {'users.paid': false}]})
            .then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets the latest bill
    getLatestUserBill() {
        Bills.find({'users.username': this.userTokenData.username})
            .sort('dueDate.year')
            .sort('dueDate.month')
            .sort('dueDate.day')
            .then(billdata => {
                if (billdata.length > 0)
                    return this.acceptCallback(billdata[billdata.length - 1]);
                this.acceptCallback(null);
            }).catch(this.rejectCallback);
    }

    // changes the password of this account
    changeInfo(userDetails) {
        const username = this.userTokenData.username;
        Student.findOne({username: username})
            .then(studentdata => {

                if (studentdata == null)
                    return this.rejectCallback('NonexistentUsername');

                const { firstname, lastname, contact, password } = userDetails;

                if (firstname != '') studentdata.details.name.first = firstname;
                if (password != '') studentdata.password = password;
                if (lastname != '') studentdata.details.name.last = lastname;
                if (contact != '') studentdata.contact = contact;

                studentdata.save().then(this.acceptCallback).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }
}