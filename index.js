const express = require('express');
const os = require('os');
const cluster = require('cluster');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use((req, res, next) => {
    next();
});

const port = process.env.PORT || 3000;
const host = '127.0.0.1';

const accesses = {
    "tin": "000000000000",
    "actor": "test",
    "token": "#K!-k(D7x[Ro_y40[|-X",
    "cashGroup": "1",
    "dateAdd": "2022-07-26 10:43:11",
    "dateModify": "2022-07-26 10:43:11",
    "id": 1
};

const origins = {
    "items": [
        {
            "cashierAccessId": 1,
            "saas": "tilda",
            "saasAccount": "5848507",
            "secret": "7e68e6c07194a366f24ce972b0567972",
            "url": "https://example.com/",
            "dateAdd": "2022-07-26 12:00:00",
            "dateModify": "2022-07-26 12:00:00",
            "id": 1,
            "gate": {
                "login": "c918a944f37c@mail.ru",
                "password": "123456sS",
                "apikey": "",
                "accessToken": "",
                "refreshToken": "",
                "expired": 0,
                "type": ""
            },
            "fiscalSettings": {
                "taxation": 1,
                "billingPlace": "https://example.com/",
                "defaultItemType": 1,
                "defaultItemUnit": 255,
                "defaultItemVat": 6,
                "deliveryItemVat": 6
            }
        }
    ],
    "total": 1
};

app.post('/fiscalize', (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        res.status(200).json('');
    } catch (e) {
        console.error(e.messgae);
    }
});

app.get('/origins', (req, res) => {
    res.status(200).json(origins);
});

app.get('/cashier-accesses', (req, res) => {
    res.status(200).json(accesses);
});

app.post('/check', (req, res) => {
    res.status(200).send('OK');
});

if (cluster.isMaster) {
    let cpus = os.cpus().length;

    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.id} finished. Exit code: ${code}`);

        app.listen(port, host, () => {
            console.log(`server listening on port ${port}`);
        });
    });
} else {
    app.listen(port, host, () => {
        console.log(`Worker ${cluster.worker.id} launched`);
    });
}
