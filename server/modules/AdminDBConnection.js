import { MongoDBConnection } from "./DBConnection.js";
import { Admin, Student } from "../models/accounts.js";
import { Bills } from "../models/bills.js";
import { Room } from "../models/rooms.js";
import paramChecker from "./paramchecker.js";

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
            'totalSlot': 0,
            'totalBorders': 0,
            'totalCanteenTenants': 0
        };

        // add additional process for the accept callback
        this.acceptCallback = (roomdata) => {
            roomdata.forEach(room => {
                if (room.label == 'dorm') {
                    if (room.status == 'occupied')
                        roomSummaryData.occupiedDorms++;
                    roomSummaryData.totalBorders += room.users.length;
                } else {
                    if (room.status == 'occupied')
                        roomSummaryData.occupiedDorms++;
                    roomSummaryData.totalCanteenTenants += room.users.length;
                }

                // add the number to the total dormslots
                roomSummaryData.totalSlot += room.max_slot;
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
                            existingroomdata.available_slot++;
                            existingroomdata.users.pop(username);
                            existingroomdata.save();
                        }

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
                                roomdata.available_slot--;

                                // for room status
                                if (roomdata.available_slot == 0) roomdata.status = 'full'
                                else roomdata.status = 'occupied';

                                roomdata.save().then(_roomdata => {
                                    userdata.room = _roomdata._id;
                                    userdata.save().then(_userdata => {
                                        this.acceptCallback(_roomdata);
                                    }).catch(this.rejectCallback);
                                }).catch(this.rejectCallback);

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

    // gets all the dorm unit info
    getAllDormUnits() {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Room.find({label: 'dorm'}).then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets all the canteen unit info
    getAllCanteenUnits() {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Room.find({label: 'canteen'}).then(this.acceptCallback).catch(this.rejectCallback);
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

                // check if user is registered to this room
                if (!roomdata.users.find(user => (user == username)))
                    return this.rejectCallback('UserNotRegisteredInRoom');

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
                                            daysPresent: details.days_present,
                                            userDetails: userdata._id
                                        }],
                                    });
        
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
                                    userdetails.cost = monthPayment * (userdetails.daysPresent / sumDays);
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

    // mark the specified username as paid
    markAsPaid(username) {
        // get the last billing statement from this username
        Bills.find({username: username})
            .sort('dueDate.year')
            .sort('dueDate.month')
            .sort('dueDate.day')
            .then(this.acceptCallback).catch(this.rejectCallback);
    }

    ////////////////
    //  Students  //
    ////////////////
    // retrieves all student account data (verified/unverified)
    retrieveAllStudentData() {
        Student.find().select('username email contact verified room')
            .then(this.acceptCallback).catch(this.rejectCallback);
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
        let {area, status, srCode, name} = description;

        const srCodeRegex = new RegExp(srCode, 'i');
        const studentQuery = { verified: true };
        const roomQuery = {};

        if (srCode && srCode != '') studentQuery['username'] = srCodeRegex;
        if (area && area != '') roomQuery['label'] = area;

        console.log(roomQuery);

        // todo: filter the room label for users that rooms are not assigned
        // todo: room area is bugging when canteen is assigned wtf
        Student.find(studentQuery)
            .populate({
                path: 'room',
                match: roomQuery,
                populate: {
                    path: 'bills'
                },
                options: {strictPopulate: false}})
            .then(studentdata => {
                console.log(studentdata);

                // match the students that has already paid (status)
                const filteredData = [];
                const tmpStorageStatusStorage = [];

                studentdata.forEach(student => {
                    const studentRoom = student.room;
                    if ((status == 'not available' || status == '') && (studentRoom == null)) {
                        filteredData.push(student);
                        tmpStorageStatusStorage.push('not available');
                        return;
                    }

                    const studentBill = studentRoom.bills;
                    if (studentBill.length > 0) {
                        const studentLatestBill = studentBill[studentBill.length - 1].users.find(item => item.username === student.username);

                        // unavailable status
                        if (!studentLatestBill) {
                            if (status == 'not available' || status == '') {
                                filteredData.push(student);
                                tmpStorageStatusStorage.push('not available')
                                return;
                            } else { return; }
                        }

                        // additional conditions for correcting process of
                        // searching ALL and searching specific paid/unpaid status
                        if (status == '') {
                            filteredData.push(student);
                            if (studentLatestBill.paid) tmpStorageStatusStorage.push('paid');
                            else tmpStorageStatusStorage.push('unpaid');
                        } else {
                            if (studentLatestBill.paid && (status == 'paid')) {
                                filteredData.push(student);
                                tmpStorageStatusStorage.push('paid');
                            } else if (!studentLatestBill.paid && (status == 'unpaid')) {
                                filteredData.push(student);
                                tmpStorageStatusStorage.push('unpaid');
                            }
                        }
                    } else {
                        if (status == 'not available' || status == '') {
                            filteredData.push(student);
                            tmpStorageStatusStorage.push('not available')
                            return;
                        } else { return; }
                    }
                });

                // searches for matched student srcode
                filteredData.forEach(student => {
                    if (!srCodeRegex.test(student.username, 'i'))
                        filteredData.pop(student);
                });

                // formatting the necessary info that are needed
                filteredData.forEach((data, index) => {
                    console.log(data);

                    let newFormat = {
                        username: data.username,
                        email: data.email,
                        name: data.details.name,
                        room: data.room != null ? data.room.slot : null,
                        status: tmpStorageStatusStorage[index]
                    };
                    filteredData[index] = newFormat;
                });

                this.acceptCallback(filteredData);
            }).catch(this.rejectCallback);
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
                        room_label: user.room.label,
                        roomID: null,
                        status: 'unavailable'
                    };

                    if (!user.room) {
                        newDataFormat.roomID = 'unavailable';
                        newDataFormat.status = 'unavailable';
                    } else {
                        newDataFormat.roomID = user.room.slot;

                        if (user.room.bills.length <= 0) {
                            newDataFormat = 'unavailable';
                        } else {
                            const latestBill = user.room.bills[user.room.bills.length - 1];
                            const userbill = latestBill.users.find(item => item.username === user.username);

                            if (!userbill)
                                return newDataFormat.status = 'unavailable';

                            if (userbill.paid) newDataFormat.status = 'paid';
                            else newDataFormat.status = 'unpaid';
                        }
                    }

                    dataFormat.push(newDataFormat);
                });

                this.acceptCallback(dataFormat);
            }).catch(this.rejectCallback);
    }

    // summarizes the user information for on a room
    roomSummary(roomID) {
        Room.findOne({slot: roomID})
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
                                status: false
                            };

                            // additional checking if no bill on current room is added yet
                            if (!lastestBill) {
                                tmpdata.status = 'not available';
                                return summaryData['userinfo'].push(tmpdata);
                            }

                            // checks if the user is registered in the bill (for status checking)
                            const userbillIndex = lastestBill.users.find(item => item.username === tmpdata.username);
                            if (userbillIndex) {
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
}