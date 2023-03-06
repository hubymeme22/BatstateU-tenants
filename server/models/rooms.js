import mongoose from "mongoose";

// slot: unit code (label)
// user: registered user
const room = new mongoose.Schema({
    slot: {
        type: String,
        unique: true,
        required: true
    },
    users: {
        type: [mongoose.Types.ObjectId],
        default: ''
    },
    max_slot: {
        type: Number,
        required: true
    },
    available_slot: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['occupied', 'not occupied']
    },
    bills: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
});

export const Room = mongoose.model('room', room);