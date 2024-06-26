import { MongoDBConnection } from "./DBConnection.js";
import { Admin, Student } from "../models/accounts.js";
import { Bills } from "../models/bills.js";
import { Room } from "../models/rooms.js";
import paramChecker from "./paramchecker.js";
import * as sc from "../modules/constants.js";

// database operations that only admin can execute
export class AdminMongoDBConnection extends MongoDBConnection {
    constructor(userTokenData) {
        super();
        this.userTokenData = userTokenData;
    }

    // override the setAcceptCallback for additional permission checking
    setAcceptCallback(callback=this.acFormat) {
        if (this.userTokenData.access != 'admin')
            return super.setAcceptCallback((userdata) => {
                this.rejectCallback('InsufficientPermission');
            });

        super.setAcceptCallback(callback);
    }

    // registers an admin account
    registerAdmin(email, contact, password, nameJSON) {
        const missedParams = paramChecker(['first', 'middle', 'last'], nameJSON);
        if (missedParams.length > 0)
            return this.rejectCallback(`missed_params=${missedParams}`);

        Admin.findOne({email: email})
            .then(admindata => {
                if (admindata != null)
                    return this.rejectCallback('EmailAlreadyExists');

                // generates a new admin account
                const adminAccount = new Admin({
                    email: email,
                    password: password,
                    name: nameJSON,
                    contact: contact,
                    access: 'admin'
                });
        
                adminAccount.save().then(this.acceptCallback).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }

    // verifies a student account from pending
    verifyStudent(username) {
        Student.findOne({username: username})
            .then(userdata => {
                if (userdata == null)
                    return this.rejectCallback('NonexistentUsername');

                if (userdata.verified)
                    return this.rejectCallback('StudentAlreadyVerified');

                // verify the student
                Student.findOneAndUpdate({username: username}, {verified: true}, {upsert: true})
                    .then(this.acceptCallback)
                    .catch(this.rejectCallback);
            })
            .catch(this.rejectCallback);
    }

    // unverifies a verified student account
    unverifyStudent(username) {
        Student.findOne({username: username})
            .then(userdata => {
                if (userdata == null)
                    return this.rejectCallback('NonexistentUsername');

                if (!userdata.verified)
                    return this.rejectCallback('StudentAlreadyUnverified');

                // verify the student
                Student.findOneAndUpdate({username: username}, {verified: false}, {upsert: true})
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

    // returns the summary of the slots in the database
    getRoomSummaryData() {
        const temporaryCallback = this.acceptCallback;
        const roomSummaryData = {
            'occupiedDorms': 0,
            'numberOfDorms': 0,
            'totalNumberOfRooms': 0,
            'totalDormSlot': 0,
            'totalDormBorders': 0,
            'totalCanteenSlot': 0,
            'totalCanteenTenants': 0
        };

        // add additional process for the accept callback
        this.acceptCallback = (roomdata) => {
            roomdata.forEach(room => {
                if (room.status == 'occupied' || room.status == 'full')
                    roomSummaryData.occupiedDorms++;

                if (room.label == 'dorm') {
                    roomSummaryData.totalDormBorders += room.users.length;
                    roomSummaryData.totalDormSlot += room.max_slot;
                } else if (room.label == 'canteen') {
                    roomSummaryData.totalCanteenTenants += room.users.length;
                    roomSummaryData.totalCanteenSlot += room.max_slot;
                }

                // add the number to the total dormslots
                roomSummaryData.totalNumberOfRooms += room.max_slot;
                roomSummaryData.numberOfDorms++;
            });

            // pass the room data summary to the callback set by the user
            temporaryCallback(roomSummaryData);
        };

        this.getAllUnits();
    }

    //////////////////
    //  UNITS PART  //
    //////////////////
    // add room details
    addUnit(slotName, maxTennants, label) {
        const newRoom = new Room({
            'slot': slotName,
            'max_slot': maxTennants,
            'available_slot': maxTennants,
            'users': [],
            'status': 'not occupied',
            'label': label,
            'bills': []
        });

        newRoom.save().then(this.acceptCallback).catch(this.rejectCallback);
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
                        if (existingroomdata != null) {
                            // additional check to check if the user is already in the same room
                            if (existingroomdata._id == roomdata._id)
                                return this.rejectCallback('UserAlreadyExists');

                            if (existingroomdata.label != 'genesis') {
                                existingroomdata.available_slot++;

                                if (existingroomdata.available_slot == existingroomdata.max_slot) existingroomdata.status = 'not occupied';
                                else if (existingroomdata.available_slot <= 0) existingroomdata.status = 'full';
                                else existingroomdata.status = 'occupied';
                            }

                            const idIndex = existingroomdata.users.indexOf(username);
                            existingroomdata.users.splice(idIndex, 1);
                            existingroomdata.userref.splice(idIndex, 1);

                            existingroomdata.save().then(updatedUserRoom => {
                                // verify if this username does exist
                                Student.findOne({ username: username, verified: true })
                                    .then(userdata => {
                                        if (userdata == null)
                                            return this.rejectCallback('NonexistentUsername');

                                        // checks if the slot is already full
                                        if (roomdata.available_slot <= 0)
                                            return this.rejectCallback('SlotAlreadyFull');

                                        // append this user to the room
                                        roomdata.users.push(username);
                                        roomdata.userref.push(userdata._id);

                                        if (roomdata.label != 'genesis')
                                            roomdata.available_slot--;

                                        // for room status
                                        if (roomdata.available_slot == roomdata.max_slot) roomdata.status = 'not occupied';
                                        else if (roomdata.available_slot <= 0) roomdata.status = 'full';
                                        else roomdata.status = 'occupied';

                                        roomdata.save().then(_roomdata => {
                                            userdata.room = _roomdata._id;
                                            userdata.save().then(_userdata => {
                                                this.acceptCallback(_roomdata);
                                            }).catch(this.rejectCallback);
                                        }).catch(this.rejectCallback);
                                    }).catch(this.rejectCallback);
                            }).catch(this.rejectCallback)
                        }

                        // fix: we encountered a bug where data in database
                        // becomes corrupted, so we'll just apply this part
                        else {
                            // verify if this username does exist
                            Student.findOne({ username: username, verified: true })
                                .then(userdata => {
                                    if (userdata == null)
                                        return this.rejectCallback('NonexistentUsername');

                                    // checks if the slot is already full
                                    if (roomdata.available_slot <= 0)
                                        return this.rejectCallback('SlotAlreadyFull');

                                    // append this user to the room
                                    roomdata.users.push(username);
                                    roomdata.userref.push(userdata._id);

                                    if (roomdata.label != 'genesis')
                                        roomdata.available_slot--;

                                    // for room status
                                    if (roomdata.available_slot == roomdata.max_slot) roomdata.status = 'not occupied';
                                    else if (roomdata.available_slot <= 0) roomdata.status = 'full';
                                    else roomdata.status = 'occupied';

                                    roomdata.save().then(_roomdata => {
                                        userdata.room = _roomdata._id;
                                        userdata.save().then(_userdata => {
                                            this.acceptCallback(_roomdata);
                                        }).catch(this.rejectCallback);
                                    }).catch(this.rejectCallback);
                                }).catch(this.rejectCallback);
                        }
                    }).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }    

    // gets units with specified filter
    getAllUnits() {
        Room.find({label: { $ne: 'genesis' }})
            .then(this.acceptCallback)
            .catch(this.rejectCallback);
    }

    // gets all the dorm unit info
    getAllDormUnits() {
        Room.find({label: 'dorm'}).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets all the canteen unit info
    getAllCanteenUnits() {
        Room.find({label: 'canteen'}).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets the units with available slots
    getAvailableUnits(username=undefined) {
        if (!username) {
            Room.find().where('available_slot').gt(0).then(this.acceptCallback).catch(this.rejectCallback);
        } else {
            Room.find({ $or: [{available_slot: { $gt: 0 }}, {users: username}] })
                .then(this.acceptCallback).catch(this.rejectCallback);
        }
    }

    // gets units with n number of available spaces
    getUnitsWithSpace(n) {
        Room.find().where('available_slot').gte(n).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // Underdevelop Delete a student in room
    deleteStudentRoom(slotID, username) {
        Room.findOneAndUpdate({ slot: slotID, users: username })
            .then((roomdata) => {
                if (roomdata == null) return this.rejectCallback('NonexistentRoomID');

                // manual deleting of user from the room
                roomdata.users.pop(username);
                roomdata.available_slot++;
                if (roomdata.users.length <= 0) roomdata.status = 'not occupied';
                roomdata.save().then(this.acceptCallback).catch(this.rejectCallback);

            }).catch(this.rejectCallback);
    }

    // completely delete a room
    deleteRoom(roomID) {
        Room.findOneAndDelete({slot: roomID})
            .then(roomdata => {
                Room.findOne({label: 'genesis'})
                    .then(genroom => {
                        // retrieve all the students and remove
                        // their rooms parallel to room deletion
                        Student.find({room: roomdata._id})
                            .then(studentsdata => {
                                studentsdata.forEach(student => {
                                    // register the student's account to the room
                                    genroom.users.push(student.username);
                                    genroom.userref.push(student._id);

                                    // register the room to the student's account
                                    student.room = genroom._id;
                                    student.save();
                                });

                                genroom.save();
                                this.acceptCallback(roomdata);

                            }).catch(this.rejectCallback);
                    }).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }

    /////////////////////
    //  BILLINGS PART  //
    /////////////////////
    // for adding a new bill for a specific user
    addUserBill(unitID, username, details) {
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

                // check if user is registered to this room
                if (!roomdata.users.find(user => (user == username)))
                    return this.rejectCallback('UserNotRegisteredInRoom');

                // check the room type for water and room billing
                let waterBill;
                let roomBill;
                if (roomdata.label == 'dorm') {
                    waterBill = sc.waterDormPayment;
                    roomBill = sc.roomDormPayment;
                } else {
                    waterBill = sc.waterCanteenPayment;
                    roomBill = sc.roomCanteenPayment;
                }

                // find if there exist a bill that has the same details
                Bills.findOne({slot: unitID, 'dueDate.month': details.month, 'dueDate.day': details.day, 'dueDate.year': details.year})
                    .then(billdata => {
                        // data calculation
                        const monthPayment = this.calculateBill(details.previous_kwh, details.current_kwh, details.rate);

                        // generate a new bill
                        if (billdata == null) {
                            // search the username and retrieve the userID
                            return Student.findOne({username: username})
                                .then(userdata => {
                                    if (userdata == null) return;

                                    const newBill = new Bills({
                                        slot: unitID,
                                        rate: details.rate,
                                        previousKWH: details.previous_kwh,
                                        currentKWH: details.current_kwh,
                                        fullyPaid: false,
                                        waterPayment: waterBill,
                                        roomPayment: roomBill,
                                        currentPayment: monthPayment,
                                        dueDate: {
                                            month: details.endDate.month,
                                            day: details.endDate.day,
                                            year: details.endDate.year
                                        },
                                        startDate: {
                                            month: details.startDate.month,
                                            day: details.startDate.day,
                                            year: details.startDate.year
                                        },
                                        users: [{
                                            username: username,
                                            paid: false,
                                            cost: (monthPayment + waterBill),
                                            daysPresent: details.days_present,
                                            userDetails: userdata._id
                                        }],
                                    });
        
                                    // adds the billing to the room's bill list
                                    newBill.save().then(billdata => {
                                        roomdata.bills.push(billdata._id);
                                        roomdata.save();
                                        this.acceptCallback(billdata);
                                    }).catch(this.rejectCallback);
                                }).catch(error => {
                                    this.rejectCallback('UsernameSpecifiedDoesNotExist');
                                })
                        }

                        // additional check if the user already exist
                        if (billdata.users.find((el) => (el.username == username))) {
                            return this.rejectCallback('UserAlreadyOnBill');
                        }

                        // search the student from the collection
                        Student.findOne({username: username})
                            .then(userdata => {
                                // adjust the current billings
                                billdata.fullyPaid = false;
                                const userbills = billdata.users;
                                userbills.push({
                                    username: username,
                                    paid: false,
                                    cost: 0,
                                    daysPresent: details.days_present,
                                    userDetails: userdata._id
                                });

                                let sumDays = 0;
                                userbills.forEach(userdetails => { sumDays += userdetails.daysPresent });
                                userbills.forEach(userdetails => {
                                    userdetails.cost = (monthPayment * (userdetails.daysPresent / sumDays)) + waterBill;
                                });

                                billdata.users = userbills;
                                billdata.save().then(bill => {
                                    roomdata.bills.push(bill._id);
                                    roomdata.save();

                                    this.acceptCallback(bill);
                                }).catch(this.rejectCallback);
                            })
                            .catch(err => this.rejectCallback('UsernameSpecifiedDoesNotExist'));
                    }).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }

    // same feature as the above, but adds an array of users
    // does not care if the user already exists (simply overwrites the data on db)
    addMultipleUserBill(unitID, username, details) {
        // check if the room does exist
        Room.findOne({slot: unitID})
            .then(roomdata => {
                if (roomdata == null)
                    return this.rejectCallback('NonexistentRoomID');

                // check if all the users are registered to this room
                let allowed = true;
                username.forEach(user => {
                    if (!roomdata.users.find(uname => (uname == user))) {
                        allowed = false;
                        return;
                    }
                });

                // display return an error if not
                if (!allowed) return this.rejectCallback('OneOrManyUserNotInRoom');

                // check the room type for water and room billing
                let waterBill;
                let roomBill;
                if (roomdata.label == 'dorm') {
                    waterBill = sc.waterDormPayment;
                    roomBill = sc.roomDormPayment;
                } else {
                    waterBill = sc.waterCanteenPayment;
                    roomBill = sc.roomCanteenPayment;
                }

                // find if there exist a bill that has the same details
                Bills.findOne({slot: unitID, 'dueDate.month': details.month, 'dueDate.day': details.day, 'dueDate.year': details.year})
                    .then(billdata => {
                        // data calculation
                        const monthPayment = this.calculateBill(details.previous_kwh, details.current_kwh, details.rate);

                        // generate a new bill
                        if (billdata == null) {
                            // search the username and retrieve the userID
                            return Student.find({username: {$in: username}})
                                .then(userdata => {
                                    if (userdata.length != username.length) return this.rejectCallback('UsernameSpecifiedDoesNotExist');

                                    // since all the users are added at the same time
                                    // then the calculation is now simplified
                                    const individualBilling = (monthPayment / username.length);
                                    const newBillUsers = [];

                                    userdata.forEach(user => {
                                        newBillUsers.push({
                                            username: user.username,
                                            paid: false,
                                            cost: (individualBilling + waterBill),
                                            daysPresent: details.days_present,
                                            userDetails: user._id
                                        });
                                    });

                                    const newBill = new Bills({
                                        slot: unitID,
                                        rate: details.rate,
                                        previousKWH: details.previous_kwh,
                                        currentKWH: details.current_kwh,
                                        fullyPaid: false,
                                        waterPayment: waterBill,
                                        roomPayment: roomBill,
                                        currentPayment: monthPayment,
                                        dueDate: {
                                            month: details.endDate.month,
                                            day: details.endDate.day,
                                            year: details.endDate.year
                                        },
                                        startDate: {
                                            month: details.startDate.month,
                                            day: details.startDate.day,
                                            year: details.startDate.year
                                        },
                                        users: newBillUsers,
                                    });

                                    // adds the billing to the room's bill list
                                    newBill.save().then(billdata => {
                                        roomdata.bills.push(billdata._id);
                                        roomdata.save();
                                        this.acceptCallback(billdata);
                                    }).catch(this.rejectCallback);
                                }).catch(error => {
                                    this.rejectCallback('UsernameSpecifiedDoesNotExist');
                                })
                        }

                        // search the student from the collection
                        Student.find({username: { $in: username }})
                            .then(userdata => {
                                if (userdata.length != username.length)
                                    return this.rejectCallback('UsernameSpecifiedDoesNotExist');

                                // adjust the current billings
                                billdata.fullyPaid = false;
                                const userbills = billdata.users;

                                userdata.forEach(user => {
                                    // check if the user is already on the list
                                    const existingUserBill = userbills.find(item => item.username == user.username);

                                    // this is a new userbill
                                    if (!existingUserBill)
                                        userbills.push({
                                            username: user.username,
                                            paid: false,
                                            cost: 0,
                                            daysPresent: details.days_present,
                                            userDetails: user._id
                                        });
                                });

                                let sumDays = 0;

                                // recalculation of user charges
                                userbills.forEach(userdetails => { sumDays += userdetails.daysPresent });
                                userbills.forEach(userdetails => {
                                    userdetails.cost = (monthPayment * (userdetails.daysPresent / sumDays)) + waterBill;
                                });

                                billdata.users = userbills;
                                billdata.save().then(bill => {
                                    roomdata.bills.push(bill._id);
                                    roomdata.save();

                                    this.acceptCallback(bill);
                                }).catch(this.rejectCallback);
                            })
                            .catch(err => this.rejectCallback('UsernameSpecifiedDoesNotExist'));
                    }).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }

    // gets all the indiv billing
    getAllBills() {
        Bills.find().then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets all the indiv billings that are unpaid
    getAllUnpaidBills() {
        Bills.find({$or: [{ fullyPaid: false }, {fullyPaid: 'false'}]})
            .then(this.acceptCallback).catch(this.rejectCallback);
    }

    // get the specific indiv billing
    getIndivBilling(username) {
        Bills.find({ username: username }).then(this.acceptCallback).catch(this.rejectCallback);
    }

    getIndivUnpaidBilling(username) {
        Bills.find({ users: { $elemMatch: { username: username, paid: false} } }).then(this.acceptCallback).catch(this.rejectCallback);
    }

    getBillingReport(username) {
        Bills.find({ users: { $elemMatch: { username: username, paid: false} } })
            .then(unpaidBills => {
                // format the data into single report
                const reportFormat = {
                    roomID: '',
                    roomRentalFee: 0,
                    isPaid: false,
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
                    },
                    startDate: {
                        month: 0,
                        day: 0,
                        year: 0
                    }
                };

                // set the assigned due date
                if (unpaidBills.length == 0) {
                    reportFormat.isPaid = true;
                    return this.acceptCallback(reportFormat);
                }

                if (unpaidBills.length == 1) {
                    const currentBill = unpaidBills[0];
                    const user = currentBill.users.find(item => item.username == username);

                    // assign the space part
                    reportFormat.space.currentBalance = parseFloat(currentBill.roomPayment.toFixed(2));
                    reportFormat.space.totalBalance = parseFloat(currentBill.roomPayment.toFixed(2));

                    // assign the utilities part
                    reportFormat.utility.currentBalance = parseFloat(user.cost.toFixed(2));
                    reportFormat.utility.totalBalance = parseFloat(user.cost.toFixed(2));

                    reportFormat.roomRentalFee = currentBill.roomPayment;
                    reportFormat.dueDate = currentBill.dueDate;
                    reportFormat.startDate = currentBill.startDate;
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
                    const currentUserBill = currentBill.users.findIndex(item => item.username == username);
                    const pastUserBill = previousBill.users.findIndex(item => item.username == username);

                    // re-calculation for charge of 5% on past billing
                    if (i < (unpaidBills.length - 1)) {
                        currentBill.roomPayment += (previousBill.roomPayment + (previousBill.roomPayment * 0.05));
                        currentBill.users[currentUserBill].cost += (previousBill.users[pastUserBill].cost + (previousBill.users[pastUserBill].cost * 0.05));
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

                const previousUserUtility = previousBilling.users.find(item => item.username == username);
                const latestUserUtility = latestBilling.users.find(item => item.username == username);

                reportFormat.dueDate = latestBilling.dueDate;
                reportFormat.startDate = latestBilling.startDate;
                reportFormat.space.currentBalance = parseFloat(latestBilling.roomPayment.toFixed(2));
                reportFormat.space.previousBalance = parseFloat(previousBilling.roomPayment.toFixed(2));
                reportFormat.space.totalBalance = parseFloat((reportFormat.space.currentBalance + reportFormat.space.previousBalance).toFixed(2));
                reportFormat.utility.currentBalance = parseFloat(latestUserUtility.cost.toFixed(2));
                reportFormat.utility.previousBalance = parseFloat(previousUserUtility.cost.toFixed(2));
                reportFormat.utility.totalBalance = parseFloat((reportFormat.utility.currentBalance + reportFormat.utility.previousBalance).toFixed(2));

                this.acceptCallback(reportFormat);
            }).catch(this.rejectCallback);
    }

    // deletes a user from a bill
    deleteUserBill(unitID, username) {
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

    // mark the specified username as paid
    markAsPaid(username) {
        // get the last billing statement from this username
        Bills.find({$and: [{'users.username': username}, {'users.paid': false}]})
            .then(billdata => {
                billdata.forEach(bills => {
                    // indicator that one of the bills is not yet paid
                    let allPaid = true;
                    bills.users.forEach(userbill => {
                        if (userbill.username == username) {
                            userbill.paid = true;
                            userbill.datePaid = Date.now();
                        }

                        if (!userbill.paid) allPaid = false;
                    });

                    // all of them must have already paid
                    if (allPaid) {
                        bills.fullyPaid = true;
                    }

                    bills.save();
                });

                this.acceptCallback(billdata);
            }).catch(this.rejectCallback);
    }

    ////////////////
    //  Students  //
    ////////////////
    // retrieves all student account data (verified/unverified)
    retrieveAllStudentData() {
        Student.find().populate('room').select('username email contact verified room details')
            .then(userdata => {
                const studentData = [];
                userdata.forEach(user => {
                    let newDataFormat = {
                        username: user.username,
                        name: user.details.name,
                        contact: user.contact,
                        email: user.email,
                        verified: user.verified,
                        room: user.room.label != 'genesis' ? user.room.slot: 'unassigned',
                    };

                    studentData.push(newDataFormat);
                });

                this.acceptCallback(studentData);
            }).catch(this.rejectCallback);
    }

    // filters all the unverified student accounts
    retrieveAllUnverifiedAccountData() {
        Student.find({verified: false}).select('username email contact verified room')
            .then(this.acceptCallback).catch(this.rejectCallback);
    }

    // filters all the verified student accounts
    retrieveAllVerifiedAccountData() {
        Student.find({verified: true}).select('username email contact verified room')
            .then(this.acceptCallback).catch(this.rejectCallback);
    }

    // search the account by matching description
    studentGeneralSearch(description) {
        Student.aggregate([{
            $lookup: {
                from: 'rooms',
                localField: 'room',
                foreignField: '_id',
                as: 'room'
            }},
            { $match: {
                'username': RegExp(description.srCode, 'ig'),
                'room.label': RegExp(description.area, 'ig'),
            }},
            { $addFields: { room: { $arrayElemAt: ['$room', 0] }}},
            { $lookup: {
                from: 'bills',
                localField: 'room.bills',
                foreignField: '_id',
                as: 'room.bills'
            }}])

        .then((studentData) => {
            const { name, status } = description;
            const filteredData = [];
            const finalizedData = [];

            // filter the students by name
            studentData.forEach(student => {
                const { first, middle, last } = student.details.name;
                const wholeName = `${first} ${middle} ${last}`;
                const nameRegex = RegExp(name, 'ig');

                if (nameRegex.test(wholeName))
                    filteredData.push(student);
            });

            // filtering the status of the room
            filteredData.forEach(student => {
                let newDataFormat = {
                    name: student.details.name,
                    srCode: student.email,
                    area: (student.room.label != 'genesis') ? student.room.label : 'unassigned',
                    roomID: (student.room.label != 'genesis') ? student.room.slot : 'unassigned',
                    status: 'not available'
                };

                // return student with unassigned room
                if (student.room.bills.length > 0) {
                    let latestIndex = student.room.bills.length - 1;
                    let studentBill = student.room.bills[student.room.bills.length - 1].users;
                    let studentLatestBill = studentBill.find(item => item.username === student.username);

                    // loopback and try to find the latest billing
                    // where the target user is listed
                    while (!studentLatestBill && latestIndex >= 0) {
                        latestIndex--;
                        studentBill = student.room.bills[student.room.bills.length - 1].users;
                        studentLatestBill = studentBill.find(item => item.username === student.username);
                    }

                    if (status == '') {
                        if (!studentLatestBill) {
                            newDataFormat.status = 'unavailable';
                            return finalizedData.push(newDataFormat);
                        }

                        if (studentLatestBill.paid) newDataFormat.status = 'paid';
                        else newDataFormat.status = 'unpaid';
                        finalizedData.push(newDataFormat);
                    }

                    else if (status == 'paid') {
                        if (!studentLatestBill) return;
                        if (studentLatestBill.paid) {
                            newDataFormat.status = 'paid';
                            finalizedData.push(newDataFormat);
                        }
                    }

                    else if (status == 'unpaid') {
                        if (!studentLatestBill) return;
                        if (!studentLatestBill.paid) {
                            newDataFormat.status = 'unpaid';
                            finalizedData.push(newDataFormat);
                        }
                    }
                }

                // if the user is looking for ALL data (but has no room assigned)
                else if (status == '') {
                    finalizedData.push(newDataFormat);
                }
            });

            this.acceptCallback(finalizedData);
        })

        .catch(this.rejectCallback);
    }

    ////////////////////////
    //  Summary requests  //
    ////////////////////////
    // retrieves all the student data (w/password not set)
    retrieveAllStudentSummarizedData() {
        Student.find({verified: true})
            .lean()
            .populate({
                path: 'room',
                populate: {
                    path: 'bills'
                },
                options: {strictPopulate: false}
            })
            .then(userdata => {
                const dataFormat = [];

                userdata.forEach(user => {
                    let newDataFormat = {
                        username: user.username,
                        name: user.details.name,
                        contact: user.contact,
                        email: user.email,
                        room_label: user.room.label != 'genesis' ? user.room.label : 'unavailable',
                        roomID: null,
                        status: 'unavailable'
                    };

                    if (!user.room) {
                        newDataFormat.roomID = 'unavailable';
                        newDataFormat.status = 'unavailable';
                    } else {
                        newDataFormat.roomID = user.room.slot;

                        if (user.room.bills.length <= 0) {
                            newDataFormat.status = 'unavailable';
                        } else {
                            let latestIndex = (user.room.bills.length - 1);
                            let latestBill = user.room.bills[latestIndex];
                            let userbill = latestBill.users.find(item => item.username === user.username);

                            // loopback and try to find the latest billing
                            // where the target user is listed
                            latestIndex--;
                            while (!userbill && latestIndex >= 0) {
                                latestBill = user.room.bills[latestIndex];
                                userbill = latestBill.users.find(item => item.username === user.username);
                                latestIndex--;
                            }

                            if (!userbill) {
                                newDataFormat.status = 'unavailable';
                                dataFormat.push(newDataFormat);
                                return;
                            }

                            if (userbill.paid) newDataFormat.status = 'paid';
                            else newDataFormat.status = 'unpaid';
                        }
                    }

                    dataFormat.push(newDataFormat);
                });

                this.acceptCallback(dataFormat);
            }).catch(this.rejectCallback);
    }

    // retrieves all account data (verified/unverified)
    accountSummary() {
        Student.find().populate('room').select('username email contact verified room details')
            .then(userdata => {
                const studentData = [];
                userdata.forEach(user => {
                    let newDataFormat = {
                        username: user.username,
                        name: user.details.name,
                        contact: user.contact,
                        email: user.email,
                        verified: user.verified,
                        room: user.room.label != 'genesis' ? user.room.slot: 'unassigned',
                        access: 'student'
                    };

                    studentData.push(newDataFormat);
                });

                Admin.find().then(admindata => {
                    admindata.forEach(admin => {
                        let newDataFormat = {
                            name: admin.name,
                            contact: admin.contact,
                            email: admin.email,
                            verified: true,
                            access: 'admin'
                        };

                        studentData.push(newDataFormat);
                    });

                    this.acceptCallback(studentData);

                }).catch(this.rejectCallback);
            }).catch(this.rejectCallback);
    }

    // summarizes the user information for on a room
    roomSummary(roomID) {
        Room.findOne({slot: roomID, label: { $ne: "genesis" }})
            .populate({ path: 'bills', options: { strictPopulate: false } })
            .then(roomdata => {
                const summaryData = {};
                const lastestBill = roomdata.bills[roomdata.bills.length - 1];
                const userList = roomdata.userref;

                // retrieve all the account information
                Student.find({_id: {'$in': userList}})
                    .then(userdata => {
                        summaryData['slot'] = roomID;
                        summaryData['userinfo'] = [];

                        userdata.forEach(userinfo => {
                            let tmpdata = {
                                username: userinfo.username,
                                name: userinfo.details.name,
                                contact: userinfo.contact,
                                status: false,
                                bill: []
                            };

                            // additional checking if no bill on current room is added yet
                            if (!lastestBill) {
                                tmpdata.status = 'not available';
                                return summaryData['userinfo'].push(tmpdata);
                            }

                            // checks if the user is registered in the bill (for status checking)
                            const userbillIndex = lastestBill.users.find(item => item.username === tmpdata.username);
                            if (userbillIndex) {

                                // loops through the billings and returns the report
                                roomdata.bills.forEach(bill => {
                                    tmpdata.bill.push({
                                        previousKWH: bill.previousKWH,
                                        currentKWH: bill.currentKWH,
                                        users: bill.users
                                    });
                                });

                                if (userbillIndex.paid) tmpdata.status = 'paid';
                                else tmpdata.status = 'unpaid';
                            } else {
                                tmpdata.status = 'not available';
                            }

                            summaryData['userinfo'].push(tmpdata);
                        });

                        this.acceptCallback(summaryData);
                    })
            }).catch(this.rejectCallback);
    }

    /////////////////
    //  Logs part  //
    /////////////////
    // returns the logs of past invoices of the specific user
    getUserInvoiceLog(username) {
        Bills.find({'users.username': username})
            .then(billdata => {
                if (billdata.length <= 0)
                    return this.rejectCallback('NoBillsLogged');

                const formattedData = [];
                billdata.forEach(bill => {
                    const userPaymentDetails = bill.users.find(item => item.username == username);
                    if (userPaymentDetails == null) return;

                    const format = {
                        previousKWH: bill.previousKWH,
                        currentKWH: bill.currentKWH,
                        utilityTotalPayment: userPaymentDetails.cost,
                        waterBill: bill.waterPayment,
                        roomBill: bill.roomPayment,
                        status: userPaymentDetails.paid ? 'paid' : 'unpaid',
                        dueDate: bill.dueDate,
                        startDate: bill.startDate,
                        datePaid: userPaymentDetails.datePaid
                    };

                    formattedData.push(format);
                });

                this.acceptCallback(formattedData);
            }).catch(this.rejectCallback);
    }
}