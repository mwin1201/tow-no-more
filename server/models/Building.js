const { Schema, model } = require("mongoose");

const BuildingSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        towingCompany: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Building = model("Building", BuildingSchema);
module.exports = Building;