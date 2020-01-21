const db = require('../../data/dbConfig');

const validateCarId = (req, res, next) => {
    const {id} = req.params;

    if(id){
        db('cars')
        .select('*')
        .where({id: req.params.id})
        .then(count => {
            if(count.length > 0){
                next();
            }else{
                res.status(404).json({ message: "Entry with request ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Something went wrong while attempting to verify ID.' })
        });
    }else{
        res.status(400).json({ error: "It seems we cannot find an ID" })
    }
};

module.exports = validateCarId;