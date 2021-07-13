'use strict'


const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)

module.exports = app
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
