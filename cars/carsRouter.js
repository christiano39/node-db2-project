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

router.post('/', validateCar, (req, res) => {
    Cars.insert(req.body)
        .then(id => {
            res.status(201).json({ id });
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        })
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

function validateCar(req, res, next) {
    const car = req.body;
    if (!car.vin || !car.make || !car.model || !car.mileage) {
        res.status(400).json({ message: "Missing required field (vin, make, model, mileage)" });
    } else {
        next();
    }
}

module.exports = router;