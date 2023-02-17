const { Schema, model } = require("mongoose");
const { ENUM_ROLES, USER } = require('../const/user.const');

const propertySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            unique: true,
            trim: true,
        },
        image: {
            type: String,
        },
        bedrooms: {
            type: Number,
            required: [true, "Number of bedrooms is required."],
        },
        bathrooms: {
            type: Number,
            required: [true, "Number of bathrooms is required."],
        },
        location: {
            type: String,
            trim: true,
            required: [true, "Location is required."],
        },
        area: {
            type: Number,
            required: [true, "Area is required."],
        },
        price: {
            type: Number,
            required: [true, "Price is required."],
        },
        category: {
            type: String,
            required: [true, "Select a category"],
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const PropertyModel = model("Property", propertySchema);

module.exports = PropertyModel;
