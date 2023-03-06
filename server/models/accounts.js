import mongoose from "mongoose";

const adminAccountSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        middle: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    }
});

const studentAccountSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true
    },
    verified: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    details: {
        name: {
            first: {
                type: String,
                required: true
            },
            middle: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            }
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }
});

export const Admin = mongoose.model('admin_accounts', adminAccountSchema);
export const Student = mongoose.model('student_accounts', studentAccountSchema);