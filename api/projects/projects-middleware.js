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

const validatePost = (req, res, next) => {
    const { name, description } = req.body
    Projects.insert(req.body)
    .then(projectPost => {
        req.projectPost = projectPost
        next()
    })
    .catch(err => {
        if (!name || !description) {
            res.status(400).json({ message: "please provide name and description" })
            return;
        }
        res.status(500).json(err.message)
    })
}

const validateUpdate = (req, res, next) => {
    const { completed } = req.body
    Projects.update(req.params.id, req.body)
    .then(projectPost => {
        if (completed == null) {
            res.status(400).json({ message: "please provide completed status" })
            return;
        }
        req.projectPost = projectPost
        next()
    })
    .catch(err => {
        if (completed == null) {
                res.status(400).json({ message: "please provide completed status" })
                return;
        }
        res.status(500).json(err.message)
    })   
}

module.exports = {
    validateId,
    validateUpdate,
    validatePost,
}