const express = require('express');
const app = express();
const bookRouter = require('./src/routes/book.routes');
const port = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(bookRouter);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        result: 'End-point not found'
    });
    res.end();
});

app.use((err, req, res, next) => {
    res.status(err.status).json(err);
});

app.listen(port, () => {
    console.log('App listening on localhost:' + port)
})

module.exports = app;