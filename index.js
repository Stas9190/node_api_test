const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('it works~');
});

app.post('/test', (req, res) => {
    console.log('test');
    try {
        const body = req.body;
        console.log(body);
        res.sendStatus(200);
    } catch (e) {
        console.error(e.messgae);
    }
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
