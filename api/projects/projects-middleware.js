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

module.exports = {
    validateId,
}