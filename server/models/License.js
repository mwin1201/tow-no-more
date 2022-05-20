const { Schema, model } = require("mongoose");

const LicenseSchema = new Schema (
    {
        state: {
            type: String,
            enum: [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 
            'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 
            'WA', 'WV', 'WI', 'WY' ],
            required: true
        },
        number: {
            type: String,
            required: true
        },
        building: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const License = model("License", LicenseSchema);
module.exports = License;