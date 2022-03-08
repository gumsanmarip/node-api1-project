// BUILD YOUR SERVER HERE
const express = required('express');
const Users = ('./api/users/model.js');
const server = express();

module.exports = server; // EXPORT YOUR SERVER instead of {}

server.use(express.json());

//Post
server.post('/api/users', (req, res) => {
    const body = req.body;

    if(!req.body.name) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    } else if(!req.body.weight) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    }

    Users.create(body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" });
        });
});
//Get
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" });
        })
});

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(user == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.status(200).json(dog);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" });
        });
});
//Delete
server.delete('/api/users/:id', (req, res) => {
    Users.delete(req.params.id)
        .then(user => {
            if(user == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" });
        });
});
//Put
server.put('/api/users/:id', (req, res) => {
    const user = req.body;

    Users.update(req.params.id, user)
        .then(user => {
            if(user == null) {
                res.status(404).json({ message: "Please provide name and bio for the user" });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be modified" });
        });
});

