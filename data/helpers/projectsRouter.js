const express = require("express");

const projectHelpers = require("./projectModel")

const actionsRouter = require('./actionsRouter')

const router = express.Router();

router.get('/', (req, res) => {
    projectHelpers.get()
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects);
        })
        .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the resource',
        });
    });
  });

router.get('/:id', (req, res) => {
    projectHelpers.get(req.params.id)
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects);
        })
        .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the resource',
        });
})})

router.post('/', (req, res) => {
    let object = {
            name: req.body.name,
            description: req.body.description
        }
    projectHelpers.insert(object)
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects);
        })
        .catch(error => {
        // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error posting the resource',
        });
    });
})

router.put('/:id', (req, res) => {
    let object = {
        name: req.body.name,
        description: req.body.description
    } 
    projectHelpers.update(req.params.id, object)
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects);
        })
        .catch(error => {
        // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error posting the resource',
        });
    });
})

router.delete('/:id', (req, res) => {
    projectHelpers.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The resource has been nuked' });
            } else {
                res.status(404).json({ message: 'The resource could not be found' });
            }
        })
        .catch(error => {
        // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error removing the resource',
            });
        });
});

router.get('/:id/actions', (req, res) => {
    projectHelpers.getProjectActions(req.params.id)
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects);
        })
        .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the resource',
        });
    });
});

router.use('/:id/actions', actionsRouter); //how to pass id param to actionsRouter - then check that router - then I think done

module.exports = router;