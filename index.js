const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 3000;

app.get('/test', (req, res) => {
    console.log('get test');
    res.sendStatus(200);
});

app.post('/test', (req, res) => {
    console.log('post test');
    try {
        const body = req.body;
        console.log(body);
        console.log('-----------------------------------');
        res.status(401).send('Anaothorized');
    } catch (e) {
        console.error(e.messgae);
    }
});

app.put('/test', (req, res) => {
    console.log('put test');
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
