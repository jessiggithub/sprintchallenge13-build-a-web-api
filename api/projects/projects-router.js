const Projects = require('./projects-model');
const router = require('express').Router();

// [Get] /api/projects
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
});

// [Get] /api/projects/:id
router.get('/:id', (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.json(project);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(next);
})

// [Post] /api/projects
router.post('/', (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    Projects.insert(req.body)
        .then(newProject => {
        res.status(201).json(newProject);
        })
        .catch(next);      
});

// [Put] /api/projects/:id
router.put('/:id', (req, res, next) => {
    const { name, description, completed } = req.body;
    if (!name || !description || completed === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            if (updatedProject) {
                res.json(updatedProject);
            }else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(next);
});

// [Delete] /api/projects/:id
router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(next);
});

// [Get] /api/projects/:id/actions
router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (actions) {
                res.json(actions);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(next);
});

module.exports = router;


// Write your "projects" router here!
