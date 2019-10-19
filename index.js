'use strict'

const express = require('express');
const request = require('request').defaults({
    baseUrl: 'https://developer.api.autodesk.com'
});

const app = express();

// put these in environment config
let port = process.env.PORT || 3000;

let expireTime = Date.now();
let token = '';

let options = {
    method: 'POST',
    url: '/authentication/v1/authenticate',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        client_id: '7CMZFMmL22BaEhZSp0Uel052iL5aussd',
        client_secret: 'RnRA7ThEt0DGPAsK',
        grant_type: 'client_credentials',
        scope: 'data:read'
    }
};

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/course', (req, res) => {
    res.sendFile(__dirname + '/public/ietm.html');
})


app.get('/auth', (req, res) => {
    if (!token || Date.now() > expireTime) {
        request(options, (e, r, body) => {
            token = body; // use the entire body as token
            expireTime = Date.now() + JSON.parse(body).expires_in;
            console.log(token);
            res.send(token);
        });
    } else {
        res.send(token);
    }
});

app.listen(port, () => {
    console.log('Server is running! Go to http://localhost:3000')
});