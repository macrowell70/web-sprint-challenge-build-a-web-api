
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');

const { validateId, validatePost, validateUpdate } = require('./actions-middlware');

router.get('/', validateId, (req, res) => {
    res.status(200).json(req.action)
});

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.action)
});

router.post('/', validatePost, (req, res) => {
    res.status(201).json(req.actionPost)
});

router.put('/:id', validateId, validateUpdate, (req, res) => {
    res.status(200).json(req.actionPost)
});


router.delete('/:id', validateId, (req, res) => {
    Actions.remove(req.params.id)
    .then(project => {res.end()})
    .catch(err => res.status(500).json(err.message))
});

module.exports = router;
