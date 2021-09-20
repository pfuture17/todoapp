const express = require('express');
const router = express.Router();
const db = require('../models');
//GET ALL
router.get('/', (req, res) => {
    db.Task.findAll().then((data) => {
        res.send(data);
    });
});
//GET BY ID
router.get('/:id', (req, res) => {
    db.Task.findAll({
        where: {
            id: req.params.id,
        },
    }).then((data) => {
        res.send(data);
    });
});

//POST
router.post('/', (req, res) => {
    db.Task.create({
        name: req.body.name,
        status: req.body.status,
    }).then((data) => {
        res.send(data);
    });
});

//UPDATE
router.put('/:id', async (req, res) => {
    db.Task.update(
        {
            status: req.body.status,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    ).then((data) => {
        res.send(data);
    });
});
//DELETE
router.delete('/:id', (req, res) => {
    db.Task.destroy({
        where: {
            id: req.params.id,
        },
    }).then(() => {
        res.json({ message: 'succesfully deleted' });
    });
});
module.exports = router;
