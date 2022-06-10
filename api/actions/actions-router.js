
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');

router.get('/', (req, res) => {
    Actions.get()
    .then(actionsList => res.json(actionsList))
    .catch(err => res.json(err.message))
});

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (!action) {res.status(404).json({ message: `there are no Actions with id: ${req.params.id}` })}
        if (action) {res.status(200).json(action)}
    })
    .catch(err => res.status(500).json(err.message))
});

router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then(action => {res.status(201).json(action)})
    .catch(err => {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({ message: "please provide name and description" })
            return;
        }
        res.status(500).json(err.message)
    })
});

router.put('/:id', (req, res) => {
    const { name, description, completed } = req.body
    Actions.update(req.params.id, req.body)
    .then(action => {res.status(201).json(action)})
    .catch(err => {
        if (!name || !description || completed == null) {
                res.status(400).json({ message: "please provide name, description, and completed" })
                return;
        }
        res.status(500).json(err.message)
    })
});


router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        if (!action) {res.status(404).json({ message: `there are no Actions with id: ${req.params.id}` })}
        if (action) {res.end()}
    })
    .catch(err => res.status(500).json(err.message))
});

module.exports = router;
