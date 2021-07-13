'use strict'

const express = require('express')
const flightCtrl = require('../controllers/flightcontroller') //controlador
const api = express.Router()

//CREATE
api.post('/flight', flightCtrl.createFlight)

//READ COMPLETO
api.get('/flight', flightCtrl.readFlights)

//READ UNICO
api.get('/flight/:flightId', flightCtrl.readFlight)

//UPDATE
api.put('/flight/:flightId', flightCtrl.updateFlight)

//DELETE
api.delete('/flight/:flightId', flightCtrl.deleteFlight)

//HACER RESERVA
api.put('/flight/initrent/:flightId/:initdate/:enddate', flightCtrl.initRent)

//CANCELAR RESERVA
api.put('/flight/cancelrent/:flightId', flightCtrl.cancelRent)

//DEVUELVE EN UN ARRAY DE JSON LAS OFERTAS FILTRADAS
api.get('/flight/filtrarofertas/:initdate/:enddate', flightCtrl.filterOffers)


//DEVUELVE EL PRECIO DEL AVION PASADO COMO PARAMETRO
api.get('/flight/price/:flightId', flightCtrl.priceFlight)

module.exports = api
