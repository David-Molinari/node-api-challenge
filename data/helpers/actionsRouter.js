const express = require("express");

const actionHelpers = require("./actionModel")

const router = express.Router();

router.post('/', (req, res) => {
    let object = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes
        }
    actionHelpers.insert(object)
        .then(actions => {
            console.log(actions)
            res.status(200).json(actions);
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
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes
    } 
    actionHelpers.update(req.params.id, object)
        .then(actions => {
            console.log(actions)
            res.status(200).json(actions);
        })
        .catch(error => {
        // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error putting the resource',
        });
    });
})

router.delete('/:id', (req, res) => {
    actionHelpers.remove(req.params.id)
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

module.exports = router;