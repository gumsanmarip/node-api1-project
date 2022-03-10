// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()
server.use(express.json())

//Post
server.post('/api/users', (req, res) => {
    User.insert(req.body)
        .then(user => {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                res.status(201).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        });
});
//Get
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
});
//Get id
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        });
});
//Delete
server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if(user == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed"})
        });
});
//Put
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    User.update(id, body)
    .then(updatedUser => {
        if(!updatedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else if(!body.name || !body.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user"})
        } else {
            res.status(200).json(updatedUser);
        }
    })
    .catch(err => {
            res.status(500).json({ message: "The user information could not be modified"})
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}