
const express = require('express');
const router = express.Router();
const { validateId } = require('./projects-middleware');

const Projects = require('./projects-model');

router.get('/', (req, res) => {
    Projects.get()
    .then(projectsList => res.status(200).json(projectsList))
    .catch(err => res.status(500).json(err.message))
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

router.put('/:id',validateId, (req, res) => {
    const { name, description, completed } = req.body
    Projects.update(req.params.id, req.body)
    .then(project => {
        if (!name || !description || completed == null) {
                res.status(400).json({ message: "please provide name, description, and completed" })
                return;
        }
        res.status(201).json(project)
    })
    .catch(err => {
        if (!name || !description || completed == null) {
                res.status(400).json({ message: "problems" })
                return;
        }
        res.status(500).json(err.message)
    })
});

router.get('/:id/actions',validateId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json(err.message))
});

router.delete('/:id',validateId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        res.end();
    })
    .catch(err => res.status(500).json(err.message))
});

module.exports = router;