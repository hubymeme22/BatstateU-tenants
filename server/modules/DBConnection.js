import { Account, Pending } from "../models/accounts.js";
import { Room } from "../models/rooms.js";
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

    // add room details
    addUnit(slotName, maxTennants) {
        if (this.userTokenData.access != 'admin')
            return this.rejectCallback('InsufficientPermission');

        const newRoom = new Room({
            'slot': slotName,
            'max_slot': maxTennants,
            'available_slot': maxTennants,
            'users': [],
            'bills': [],
            'status': 'not occupied'
        });

        newRoom.save().then(this.acceptCallback).catch(this.rejectCallback);
    }

    // gets units with specified filter
    getUnit(filterQuery) {
        Room.find(filterQuery).then(this.acceptCallback).catch(err => {
            console.log(err);
            this.rejectCallback(err)
        });
    }

    // gets the units with available slots
    getAvailableUnits() {
        Room.find().where('availablme_slot').gt(0).then(this.acceptCallback).catch(this.rejectCallback);
    }
}