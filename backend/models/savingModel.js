import mongoose from "mongoose";

const schema = new mongoose.Schema({
    balanced: {
        type: Number,
        required: true
    },
    balancedWithdrawed: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1 //1 la dang gui, 0 la da rut, 2 la da xoa (user xoa)
    },
    cycles: {
        type: Number,
        default: 0
    },
    duration: { //days
        type: Number,
        required: true
    },
    stopDate: {
        type: Date,
    },
    userID: {
        type: String,
        required: true
    },
    inContract: {
        type: Number,
        default: (new Date()).getTime()
    }
}, { timestamps: true })

export const SavingModel = mongoose.model('Saving', schema);