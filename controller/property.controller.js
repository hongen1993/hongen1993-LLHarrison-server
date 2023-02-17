const PropertyModel = require("../models/Property.model");

const getAllProperties = (req, res, next) => {
    const { offset = 0, limit = 50 } = req.query
    let properties
    PropertyModel
        .find()
        .limit(limit)
        .skip(limit * offset)
        .sort({ createdAt: -1 })
        .lean()
        .then((allProperties) => {
            properties = allProperties
            return PropertyModel.countDocuments()
        })
        .then((countedProperties) => {
            res.status(200).json({
                results: properties,
                page: +offset,
                maxPage: Math.floor(countedProperties / +limit)
            }
            )
        })
        .catch(next)
}

const getProperty = (req, res, next) => {
    const { id } = req.params

    PropertyModel
        .findById(id)
        .then((property) => {
            res.status(200).json({
                success: true,
                property
            })
        })
        .catch(next)
}

const newProperty = (req, res, next) => {
    const { name, image, bedrooms, bathrooms, location, area, price, category } = req.body

    PropertyModel
        .create({ name, image, bedrooms, bathrooms, location, area, price, category })
        .then(() => {
            res.status(201).json({
                success: true,
                message: 'Property created'
            })
        })
        .catch(next)
}

const editProperty = (req, res, next) => {
    const { id } = req.params;
    const { name, image, bedrooms, bathrooms, location, area, price, category } = req.body

    PropertyModel
        .findByIdAndUpdate(id, { name, image, bedrooms, bathrooms, location, area, price, category }, { new: true })
        .then(() => {
            res.status(204).json({
                success: true,
                message: 'Property edited succesfully'
            })
        })
        .catch(next)
}

const deleteProperty = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId) {
        throw new Error('Error:Invalid mongo ID')
    }
    PropertyModel
        .findByIdAndDelete(id)
        .then(() => {
            res.status(204).json({
                success: true,
                message: 'Property deleted succesfully'
            })
        })
        .catch(next)
}

module.exports = { getAllProperties, getProperty, newProperty, editProperty, deleteProperty }
