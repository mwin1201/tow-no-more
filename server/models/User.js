const { Schema, model } = require("mongoose");

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        building: {
            type: Schema.Types.ObjectId,
            ref: "Building"
        },
        towCompany: {
            type: Schema.Types.ObjectId,
            ref: "TowingCompany"
        }
    }
);

const User = model("User", UserSchema);
module.exports = User;