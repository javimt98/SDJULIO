'use strict'





const express = require('express')
const bodyParser = require('body-parser')

const app = express()


var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'https://localhost:4200'}));





const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)
//app.use(bodyParser.text());

app.use(express.json())
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

module.exports = app



var cors = require ('cors');
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));
