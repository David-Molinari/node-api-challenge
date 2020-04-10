/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
const express = require('express');
const actionHelpers = require("./data/helpers/actionModel");
const projectHelpers = require("./data/helpers/projectModel");

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
  });

  server.get('/projects/:id', (req, res) => {
    let id = req.params.id;
    res.send(projectHelpers.get(id));
});

server.post('/projects', (req, res) => {
    let object = {
            name: req.body.name,
            description: req.body.description
        }
    res.send(projectHelpers.insert(object));
})

server.put('/projects/:id', (req, res) => {
    let object = {
        name: req.body.name,
        description: req.body.description
    } 
    res.send(projectHelpers.update(req.params.id, object))
})

server.delete('/projects/:id', (req, res) => {
    res.send(projectHelpers.remove(req.params.id))
})

server.get('/actions/:id', (req, res) => {
    let id = req.params.id;
    res.send(actionHelpers.get(id));
});

server.post('/actions', (req, res) => {
    let object = {
            name: req.body.name,
            description: req.body.description
        }
    res.send(actionHelpers.insert(object));
})

server.put('/action/:id', (req, res) => {
    let object = {
        name: req.body.name,
        description: req.body.description
    } 
    res.send(actionHelpers.update(req.params.id, object))
})

server.delete('/actions/:id', (req, res) => {
    res.send(actionHelpers.remove(req.params.id))
})

server.get('/projects/:id/actions', (req, res) => {
    res.send(projectHelpers.getProjectActions(req.params.id))
})

server.listen(8000, () => console.log('API running on port 8000'));