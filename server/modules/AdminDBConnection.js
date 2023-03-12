import { MongoDBConnection } from "./DBConnection.js";
import { Admin, Student } from "../models/accounts.js";
import { Bills } from "../models/bills.js";
import { Room } from "../models/rooms.js";
import paramChecker from "./paramchecker.js";

// Test
import adminRoleChecker from "./adminRoleChecker.js"

// database operations that only admin can execute
export class AdminMongoDBConnection extends MongoDBConnection {
    constructor(userTokenData) {
        super();
        this.userTokenData = userTokenData;
    }

    // registers an admin account
    registerAdmin(username, email, contact, password, nameJSON) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');
        
        const missedParams = paramChecker(['first', 'middle', 'last'], nameJSON);
        if (missedParams.length > 0)
            return this.rejectCallback(`missed_params=${missedParams}`);

        const adminAccount = new Admin({
            username: username,
            email: email,
            password: password,
            name: nameJSON,
            contact: contact,
            access: 'admin'
        });

        adminAccount.save(this.acceptCallback).catch(this.rejectCallback);
    }

    // verifies a student account from pending
    verifyStudent(username) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Student.findOne({username: username})
            .then(userdata => {
                if (userdata.verified)
                    return this.rejectCallback('StudentAlreadyVerified');

                // verify the student
                Student.findOneAndUpdate({username: username}, {verified: true}, {upsert: true})
                    .then(this.acceptCallback)
                    .catch(this.rejectCallback);
            })
            .catch(this.rejectCallback);
    }

    ////////////////////////
    //  HELPER FUNCTIONS  //
    ////////////////////////
    calculateBill(previouskwh, currentkwh, rate) {
        return (currentkwh - previouskwh) * rate;
    }

    //////////////////
    //  UNITS PART  //
    //////////////////
    // add room details
    // addUnit(slotName, maxTennants) {
    //     // adminRoleChecker(this.userTokenData)
    //     if (this.userTokenData.access != 'admin')
    //         return this.rejectCallback('InsufficientPermission');

    //     const newRoom = new Room({
    //         'slot': slotName,
    //         'max_slot': maxTennants,
    //         'available_slot': maxTennants,
    //         'users': [],
    //         'status': 'not occupied'
    //     });

    //     newRoom.save().then(this.acceptCallback).catch(this.rejectCallback);
    // }
    addUnit(slotName, maxTennants) {
        adminRoleChecker(this.userTokenData)
            .then(() => {
                const newRoom = new Room({
                    'slot': slotName,
                    'max_slot': maxTennants,
                    'available_slot': maxTennants,
                    'users': [],
                    'status': 'not occupied'
                });
    
                newRoom.save().then(this.acceptCallback).catch(this.rejectCallback);
            })
            .catch(error => {
                this.rejectCallback(error);
            });
    }

    // adds a new student in the room
    addStudentRoom(slotName, username) {
        Room.findOne({slot: slotName})
            .then(roomdata => {
                if (roomdata == null)
                    return this.rejectCallback('NonexistentRoomID');

                // verify if the user is already in the room
                if (roomdata.users.find(user => user == username))
                    return this.rejectCallback('UserAlreadyExists');

                // remove the user on the other room if there is
                Room.findOne({users: username})
                    .then(existingroomdata => {
                        if (existingroomdata != null)
                            existingroomdata.users.pop(username);

                        // verify if this username does exist
                        Student.findOne({ username: username, verified: true })
                            .then(userdata => {
                                if (userdata == null)
                                    return this.rejectCallback('NonexistentUsername');

                                // append this user to the room
                                roomdata.users.push(username);
                                roomdata.save().then(this.acceptCallback).catch(this.rejectCallback);

                            }).catch(this.rejectCallback);

                    }).catch(this.rejectCallback);

            }).catch(this.rejectCallback);
    }

    // gets units with specified filter
    getAllUnits() {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Room.find().then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets the units with available slots
    getAvailableUnits() {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Room.find().where('available_slot').gt(0).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets units with n number of available spaces
    getUnitsWithSpace(n) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Room.find().where('available_slot').equals(n).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // Underdevelopmen Delete class
    deleteStudentRoom(slotName, username){
        

    }


    /////////////////////
    //  BILLINGS PART  //
    /////////////////////
    // for adding a new bill for a specific user
    // TODO: make sure that the username added does really exist
    addUserBill(unitID, username, details) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        const missedParams = paramChecker([
            'previous_kwh', 'current_kwh', 'rate',
            'month', 'day', 'year', 'days_present'], details);
        if (missedParams.length > 0)
            return this.rejectCallback(`missed_params=${missedParams}`);

        // check if the room does exist
        Room.findOne({slot: unitID})
            .then(roomdata => {
                if (roomdata == null)
                    return this.rejectCallback('NonexistentRoomID');

                // find if there exist a bill that has the same details
                Bills.findOne({slot: unitID, 'dueDate.month': details.month, 'dueDate.day': details.day, 'dueDate.year': details.year})
                    .then(billdata => {
                        // data calculation
                        const monthPayment = this.calculateBill(details.previous_kwh, details.current_kwh, details.rate);

                        // generate a new bill
                        if (billdata == null) {
                            const newBill = new Bills({
                                slot: unitID,
                                rate: details.rate,
                                previousKWH: details.previous_kwh,
                                currentKWH: details.current_kwh,
                                fullyPaid: false,
                                currentPayment: monthPayment,
                                dueDate: {
                                    month: details.month,
                                    day: details.day,
                                    year: details.year
                                },
                                users: [{
                                    username: username,
                                    paid: false,
                                    cost: monthPayment,
                                    daysPresent: details.days_present
                                }]
                            });

                            newBill.save().then(billdata => {
                                this.acceptCallback(billdata);
                            }).catch(this.rejectCallback);
                            return;
                        }

                        // additional check if the user already exist
                        if (billdata.users.find((el) => (el.username == username))) {
                            return this.rejectCallback('UserAlreadyOnBill');
                        }

                        // adjust the current billings
                        const userbills = billdata.users;
                        userbills.push({
                            username: username,
                            paid: false,
                            cost: 0,
                            daysPresent: details.days_present
                        });

                        let sumDays = 0;
                        userbills.forEach(userdetails => { sumDays += userdetails.daysPresent });
                        userbills.forEach(userdetails => {
                            userdetails.cost = monthPayment * (userdetails.daysPresent / sumDays);
                        });

                        billdata.users = userbills;
                        billdata.save().then(this.acceptCallback).catch(this.rejectCallback);

                    }).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }

    // gets all the indiv billing
    getAllBills() {
        Bills.find().then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets all the indiv billings that are unpaid
    getAllUnpaidBills() {
        Bills.find({ paid: false }).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // get the specific indiv billing
    getIndivBilling(username) {
        Bills.find({ username: username }).then(this.acceptCallback).catch(this.rejectCallback);
    }

    getIndivUnpaidBilling(username) {
        Bills.find({ username: username, paid: false }).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // deletes a user from a bill
    deleteUserBill(unitID, username) {
        if(this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        // checks if the room w/username does really exist
        Room.findOne({slot: unitID, username: username})
            .then(roomdata => {
                if (roomdata == null)
                    return this.rejectCallback('NonexistentRoomID');

                // only updates the bill, since it only does apply to individual
                // pops the username out of the list, and manually compute everyone's
                // new billings
                Bills.findOneAndUpdate({slot: unitID}, {'$pull': { 'users': {username: username} }}, {upsert: true, new: true})
                    .then(billdata => {
                        const payment = billdata.currentPayment;
                        const userInfoCopy = billdata.users;
                        let daysSum = 0;

                        // calculate the adjustment payments for the remaining tennatns
                        userInfoCopy.forEach(elem => { daysSum += elem.daysPresent; });
                        userInfoCopy.forEach(elem => {
                            elem.cost = payment * (elem.daysPresent / daysSum);
                        });

                        // update the billdata
                        billdata.users = userInfoCopy;
                        billdata.save().then(this.acceptCallback).catch(this.rejectCallback);
                    }).catch(this.rejectCallback)
            });
    }
}

