const express = require('express');
const Category = require('./schemas/category');

const router = express.Router()

router.post('/', async (req, res) => {
    let category = new Category({ name : req.body.name});
    await category.save();
    res.send(category);
})

router.get('/', async (req, res) => {
    res.send(await Category.find());
})

module.exports = router;