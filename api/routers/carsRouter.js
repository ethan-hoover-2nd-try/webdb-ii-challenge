const express = require('express');
const validateCarId = require('../middleware/validateCarId');
const db = require('../../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .select('*')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(err => {
        res.status(500).json({ error: "Something went wrong while attempting to fetch data from the database" })
    });
});

router.get('/:id', validateCarId, (req, res) => {
    db('cars')
    .select('*')
    .where({id: req.params.id})
    .first()
    .then(car => {
        res.status(200).json(car);
    })
    .catch(err => {
        res.status(500).json({ error: "Something went wrong while attempting to fetch the car by requested ID" })
    });
});

router.post('/', (req, res) => {
    const post = req.body;
    const {make, model, vin, mileage, status} = post;
    if(!make || !model || !vin || !mileage || !status) {
        res.status(400).json({ message: "Remember to include all required fields (make, model, vin, mileage)" })
    }else{
        db('cars')
        .insert(post, 'id')
        .then(ids => {
            db('cars').where({ id: ids[0] })
            .then(newCarEntry => {
                res.status(201).json(newCarEntry);
            })
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong while attempting to add the entry to the database" })
        });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    db('cars')
    .where({ id })
    .update(carData)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: `${count} record updated` });
        } else {
            res.status(404).json({ message: 'car not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error updating the car data' });
    })
})

router.delete('/:id', (req, res) => {
    let deletedCarObject = {};
    db('cars')
    .where({ id: req.params.id })
    .then(car => {
        deletedCarObject = car;
        deletedCarObject[0].deleted = 'Record Deleted'
    })
    db('cars')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if (count > 0) {
            res.status(200).json(deletedCarObject[0]);
        } else {
            res.status(404).json({ message: 'Car with requested id does not exist' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error deleting the car data' });
    })
})

module.exports = router;