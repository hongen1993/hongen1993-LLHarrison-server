const router = require('express').Router();
const { getAllProperties, getProperty, newProperty, editProperty, deleteProperty } = require('../controller/property.controller')

router.get('/all', getAllProperties)
router.get('/:id', getProperty)
router.post('/new', newProperty)
router.put('/edit', editProperty)
router.delete('/delete', deleteProperty)

module.exports = router