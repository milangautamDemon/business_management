import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    createdOn: {
        type: Date,
        required: true
    },
    location: {
        lat: Number,
        lng: Number
    }
})
 export const UserModel = mongoose.model("businessdatas", userSchema)