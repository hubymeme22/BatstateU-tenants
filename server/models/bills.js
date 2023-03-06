import mongoose from "mongoose";

// must make individual bills before room bills
const roomBills = new mongoose.Schema({
    slot: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    previousKWH: {
        type: Number,
        required: true
    },
    currentKWH: {
        type: Number,
        required: true
    },
    fullyPaid: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    currentPayment: {
        type: Number,
        required: true
    },
    dueDate: {
        month: {
            type: Number,
            required: true
        },
        day: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    users: [{
        username: {
            type: String,
            unique: true,
            required: true
        },
        paid: {
            type: mongoose.Schema.Types.Boolean,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        daysPresent: {
            type: Number,
            required: true
        }
    }]
});

export const Bills = mongoose.model('bills', roomBills);