// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');

router.get('/', (req, res) => {
    Projects.get()
    .then(projectsList => res.status(200).json(projectsList))
    .catch(err => res.status(500).json(err.message))
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (!project) {res.status(404).json({ message: `there are no projects with id: ${req.params.id}` })}
        if (project) {res.status(200).json(project)}
    })
    .catch(err => res.status(500).json(err.message))
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

router.put('/:id', (req, res) => {
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

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json(err.message))
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        if (!project) {res.status(404).json({ message: `there are no projects with id: ${req.params.id}` })}
        if (project) {res.end()}
    })
    .catch(err => res.status(500).json(err.message))
});

module.exports = router;