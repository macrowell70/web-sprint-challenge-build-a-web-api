
const express = require('express');
const router = express.Router();
const { validateId, validateUpdate } = require('./projects-middleware');

const Projects = require('./projects-model');

router.get('/', validateId, (req, res) => {
    res.status(200).json(req.project)
});

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project)
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {res.status(201).json(project)})
    .catch(err => {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({ message: "please provide name and description" })
            return;
        }
        res.status(500).json(err.message)
    })
});

router.put('/:id', validateId, validateUpdate, (req, res) => {
    res.status(200).json(req.projectPost)
});

router.get('/:id/actions', validateId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json(err.message))
});

router.delete('/:id', validateId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {res.end()})
    .catch(err => res.status(500).json(err.message))
});

module.exports = router;