'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const https = require('https')
const fs = require('fs')

mongoose.connect(config.db ,{useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => 
{
    if (err) 
    {
        return console.log(`Error al conectar a la bbdd: ${err}`)
    }
    
    console.log('Conexión a la bbdd establecida...')

    https.createServer({
        key: fs.readFileSync('./certificados/server.key'),
        cert: fs.readFileSync('./certificados/server.cert')
    }, app).listen(config.port, () => 
    {
        console.log(`API PROVEEDOR HOTELES CORRIENDO EN http://localhost:${config.port}`)
    })    
})




