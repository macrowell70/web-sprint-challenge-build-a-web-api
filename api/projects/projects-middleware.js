// add middlewares here related to projects
const Projects = require('./projects-model');

const validateId = (req, res, next) => {
    Projects.get(req.params.id)
    .then(project => {
        if (!project) {res.status(404).json({ message: `there are no projects with id: ${req.params.id}` })}
        if (project) { req.project = project }
        next();
    })
    .catch(err => res.status(500).json(err.message))
}

const validateUpdate = (req, res, next) => {
    const { name, description, completed } = req.body
    Projects.update(req.params.id, req.body)
    .then(projectPost => {
        if (!name || !description || completed == null) {
            res.status(400).json({ message: "please provide name, description, and completed" })
            return;
        }
        req.projectPost = projectPost
        next()
    })
    .catch(err => {
        if (!name || !description || completed == null) {
                res.status(400).json({ message: "problems" })
                return;
        }
        res.status(500).json(err.message)
    })   
}

module.exports = {
    validateId,
    validateUpdate,
}