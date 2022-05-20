const { Schema, model } = require("mongoose");

const TowingSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        buildings: [
            {
                type: Schema.Types.ObjectId,
                ref: "Building"
            }
        ]
            
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const TowingCompany = model("TowingCompany", TowingSchema);
module.exports = TowingCompany;