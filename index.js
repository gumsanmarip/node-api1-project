const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
server.use(express.json());

server.get('/json', (req, res) => {
    res.json({ a: 1, b: 2, c: 3})
});