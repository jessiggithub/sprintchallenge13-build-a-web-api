const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const router = require('express').Router();

// [Get] /api/actions
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(next);
});

// [Get] /api/actions/:id
router.get('/:id', (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                res.json(action);
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(next);
});

// [Post] /api/actions
router.post('/', (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    Projects.get(project_id)
        .then(project => {
            if (!project) {
                return res.status(400).json({ message: 'Invalid project_id' });
            }
            Actions.insert(req.body)
                .then(newAction => {
                    res.status(201).json(newAction);
                })
                .catch(next);
        })
        .catch(next); 
});

// [Put] /api/actions/:id
router.put('/:id', (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            if (updatedAction) {
                res.json(updatedAction);
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(next);
});

// [Delete] /api/actions/:id
router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(next);
});

module.exports = router;

