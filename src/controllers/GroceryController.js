const { Grocery } = require('../models');

module.exports = {

    index(req, res) {
        Grocery.findAll({})
            .then(groceries => res.json({
                error: false,
                data: groceries
            }))
            .catch(error => res.json({
                error:true,
                data: [],
                error: error
            }));
    },

    create(req, res) {
        const { name } = req.body;
        Grocery.create({
            name, checked: false
        })
        .then(grocery => res.status(201).json({
            error: false,
            data: grocery,
            message: "new grocery has been created"
        }))
        .catch(error => res.json({
            error:true,
            data: [],
            error: error
        }));
    },

    update(req, res) {
        const grocery_id = req.params.id;

        const { name, isChecked } = req.body;

        User.update({
            name, isChecked
        }, {
            where: {
                id: grocery_id
            }
        })
        .then(grocery => res.status(201).json({
            error: false,
            data: grocery,
            message: 'grocery has been updated'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    },

    destroy(req, res) {
        const grocery_id = req.params.id;

        Grocery.destroy({ where: {
            id: grocery_id
        }})
        .then(status => res.status(201).json({
            error: false,
            message: 'grocery has been deleted'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    }
}