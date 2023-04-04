import { MongoDBConnection } from "./DBConnection.js";
import { Student } from "../models/accounts.js";
import { Bills } from "../models/bills.js";
import { announcement } from "./announcement.js";

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

    // returns the finalized and charges added billing of the student
    getStudentFinalizedBilling() {
        Bills.find({ $and: [{ 'users.username': this.userTokenData.username }, { 'users.paid': false }] })
        .then(unpaidBills => {
            // format the data into single report
            const reportFormat = {
                roomID: '',
                roomRentalFee: 0,
                space: {
                    previousBalance: 0,
                    currentBalance: 0,
                    totalBalance: 0,
                },
                utility: {
                    previousBalance: 0,
                    currentBalance: 0,
                    totalBalance: 0,
                },
                dueDate: {
                    month: 0,
                    day: 0,
                    year: 0
                }
            };

            if (unpaidBills.length == 0) return this.acceptCallback(reportFormat);
            if (unpaidBills.length == 1) {
                const currentBill = unpaidBills[0];
                const user = currentBill.users.find(item => item.username == this.userTokenData.username);

                // assign the space part
                reportFormat.space.currentBalance = currentBill.roomPayment;
                reportFormat.space.totalBalance = currentBill.roomPayment;

                // assign the utilities part
                reportFormat.utility.currentBalance = user.cost;
                reportFormat.utility.totalBalance = user.cost;

                reportFormat.roomRentalFee = currentBill.roomPayment;
                reportFormat.dueDate = currentBill.dueDate;
                reportFormat.roomID = currentBill.slot;

                return this.acceptCallback(reportFormat);
            }

            const latestBillingCopy = unpaidBills[unpaidBills.length - 1];
            reportFormat.roomRentalFee = latestBillingCopy.roomPayment;
            reportFormat.roomID = latestBillingCopy.slot;

            // generate the correct billings and apply the 5% charges
            for (let i = 1; i < unpaidBills.length; i++) {
                const currentBill = unpaidBills[i];
                const previousBill = unpaidBills[i - 1];

                // find the current user to the current bill and update it
                const currentUserBill = currentBill.users.findIndex(item => item.username == this.userTokenData.username);
                const pastUserBill = previousBill.users.findIndex(item => item.username == this.userTokenData.username);

                // re-calculation for charge of 5% on past billing
                if (i < (unpaidBills.length - 1)) {
                    currentBill.roomPayment += previousBill.roomPayment + (previousBill.roomPayment * 0.05);
                    currentBill.users[currentUserBill].cost += previousBill.users[pastUserBill].cost + (previousBill.users[pastUserBill].cost * 0.05);    
                } else {
                    currentBill.roomPayment += (previousBill.roomPayment * 0.05);
                    currentBill.users[currentUserBill].cost += (previousBill.users[pastUserBill].cost * 0.05);
                }

                // updates the bills temporarily
                unpaidBills[i] = currentBill;
            }

            // get the latest bill and format it to returnable output
            const previousBilling = unpaidBills[unpaidBills.length - 2];
            const latestBilling = unpaidBills[unpaidBills.length - 1];

            const previousUserUtility = previousBilling.users.find(item => item.username == this.userTokenData.username);
            const latestUserUtility = latestBilling.users.find(item => item.username == this.userTokenData.username);

            reportFormat.dueDate = latestBilling.dueDate;
            reportFormat.space.currentBalance = latestBilling.roomPayment;
            reportFormat.space.previousBalance = previousBilling.roomPayment;
            reportFormat.utility.currentBalance = latestUserUtility.cost;
            reportFormat.utility.previousBalance = previousUserUtility.cost;

            this.acceptCallback(reportFormat);
        }).catch(this.rejectCallback);
    }

    retrieveAnnouncement() {
        this.acceptCallback(announcement);
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