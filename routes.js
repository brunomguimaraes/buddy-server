const express = require('express');
const GroceryController = require('./src/controllers/GroceryController');

const router = new express.Router();

router.get('/api/grocery', GroceryController.index);

router.post('/api/grocery', GroceryController.create);

router.put('/api/grocery/:id', GroceryController.update);

router.delete('/api/grocery/:id', GroceryController.destroy);

module.exports = router;