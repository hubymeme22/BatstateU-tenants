import { MongoDBConnection } from "./DBConnection.js";
import { Pending, Account } from "../models/accounts.js";
import { Bills } from "../models/bills.js";
import { Room } from "../models/rooms.js";
import paramChecker from "./paramchecker.js";

// database operations that only admin can execute
export class AdminMongoDBConnection extends MongoDBConnection {
    constructor(userTokenData) {
        super();
        this.userTokenData = userTokenData;
    }

    // registers an admin account
    registerAdmin(username, email, password, nameJSON) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        const adminAccount = new Account({
            username: username,
            email: email,
            password: password,
            name: nameJSON,
            access: 'admin'
        });

        adminAccount.save(this.acceptCallback).catch(this.rejectCallback);
    }

    // verifies a student account from pending
    verifyStudent(username) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

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

    //////////////////
    //  UNITS PART  //
    //////////////////
    // add room details
    addUnit(slotName, maxTennants) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        const newRoom = new Room({
            'slot': slotName,
            'max_slot': maxTennants,
            'available_slot': maxTennants,
            'users': [],
            'status': 'not occupied'
        });

        newRoom.save().then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets units with specified filter
    getUnit(filterQuery) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Room.find(filterQuery).then(this.acceptCallback).catch(err => {
            console.log(err);
            this.rejectCallback(err)
        });
    }

    // gets the units with available slots
    getAvailableUnits() {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        Room.find().where('availablme_slot').gt(0).then(this.acceptCallback).catch(this.rejectCallback);
    }


    /////////////////////
    //  BILLINGS PART  //
    /////////////////////
    // for adding a new bill for a specific user
    addUserBill(unitID, username, costDetails) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        const missedParams = paramChecker(['rate', 'currentKWH', 'due', 'days_present'], costDetails);
        if (missedParams.length > 0)
            return this.rejectCallback(`missed_params=costDetails->${missedParams}`);

        // to make sure that the unitID does exist
        Room.findOne({slot: unitID})
            .then(userdata => {
                if (userdata == null)
                    return this.rejectCallback('NonexistentUnitID');

                const newBill = new Bills({
                    username: username,
                    rate: costDetails.rate,
                    currentKWH: costDetails.currentKWH,
                    due: costDetails.due,
                    slot: userdata._id,
                    numOfDaysPresent: costDetails.days_present,
                    paid: false
                });

                newBill.save().then(this.acceptCallback).catch(this.rejectCallback);
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
        Bills.find({ username: username })
    }

    getIndivUnpaidBilling(username) {
    }
}