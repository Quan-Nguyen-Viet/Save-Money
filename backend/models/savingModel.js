import mongoose from "mongoose";

const schema = new mongoose.Schema({
    balanced: {
        type: Number,
        required: true
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
        type: Number,
        required: true
    },
}, { timestamps: true })

export const SavingModel = mongoose.model('Saving', schema);