import mongoose from "mongoose";

const canteenSchema = new mongoose.Schema({
    slot: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['occupied', 'not occupied']
    }
});

const dormSchema = new mongoose.Schema({
    tennantsUser: {
        type: Array[String],
        required: true
    },
    max_slot: {
        type: Int,
        required: true
    }
});

export const CanteenRoom = mongoose.model('canteen', canteenSchema);
export const DormRoom = mongoose.model('dorm', dormSchema);