const express = require('express');
const Cars = require('./carsDb');

const router = express.Router();

router.get('/', (req, res) => {
    Cars.get()
        .then(cars => {
            res.status(200).json({ cars });
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        })
});

router.get('/:id', validateCarId, (req, res) => {
    res.status(200).json({ car: req.car });
});

// validation middleware

function validateCarId(req, res, next) {
    const id = req.params.id;

    Cars.getById(id)
        .then(car => {
            if (car) {
                req.car = car;
                next();
            } else {
                res.status(404).json({ message: `car with id ${id} does not exist` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        })
}

module.exports = router;