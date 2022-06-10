// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');

router.get('/', (req, res) => {
    Projects.get()
    .then(projectsList => res.status(200).json(projectsList))
    .catch(err => res.status(500).json({ message: "There was a problem retrieving the data" }))
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (!project) {res.status(404).json({ message: `there are no projects with id: ${req.params.id}` })}
        if (project) {res.status(200).json(project)}
    })
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