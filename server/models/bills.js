import mongoose from "mongoose";

// will represent as stack of bills (paid or unpaid)
// for individuals
const bills = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    currentKWH: {
        type: Number,
        required: true
    },
    paid: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    numOfDaysPresent: {
        type: Number,
        required: true
    }
});

export const Bills = mongoose.model('bills', bills);