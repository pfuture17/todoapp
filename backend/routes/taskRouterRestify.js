const errors = require('restify-errors');
const db = require('../models');

module.exports = (app) => {
    app.get('/', (req, res, next) => {
        db.Task.findAll().then((data) => {
            res.send(data);
            next();
        });
    });
    //GET BY ID
    app.get('/:id', (req, res, next) => {
        db.Task.findByPk(req.params.id)
            .then((data) => {
                res.send(data);
                next();
            })
            .catch((err) => {
                return next('eroror');
            });
    });

    //POST
    app.post('/', (req, res, next) => {
        db.Task.create({
            name: req.body.name,
            status: req.body.status,
        }).then((data) => {
            res.send(data);
            next();
        });
    });

    //UPDATE
    app.put('/:id', async (req, res, next) => {
        db.Task.update(
            {
                status: req.body.status,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        ).then(() => {
            db.Task.findByPk(req.params.id).then((data) => res.send(data));
            next();
        });
    });
    //delete
    app.del('/:id', (req, res) => {
        db.Task.destroy({
            where: {
                id: req.params.id,
            },
        }).then(() => {
            res.json({ message: 'succesfully deleted' });
        });
    });
};
