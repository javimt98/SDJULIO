'use strict'

const express = require('express')
const hotelCtrl = require('../controllers/hotelcontroller') //controlador
const api = express.Router()

//CREATE
api.post('/hotel', hotelCtrl.createHotel)

//READ COMPLETO
api.get('/hotel', hotelCtrl.readHotels)

//READ UNICO
api.get('/hotel/:hotelId', hotelCtrl.readHotel)

//UPDATE
api.put('/hotel/:hotelId', hotelCtrl.updateHotel)

//DELETE
api.delete('/hotel/:hotelId', hotelCtrl.deleteHotel)

//HACER RESERVA
api.put('/hotel/initrent/:hotelId/:initdate/:enddate', hotelCtrl.initRent)

//CANCELAR RESERVA
api.put('/hotel/cancelrent/:hotelId', hotelCtrl.cancelRent)

//DEVUELVE EN UN ARRAY DE JSON LAS OFERTAS FILTRADAS
api.get('/hotel/filtrarofertas/:initdate/:enddate', hotelCtrl.filterOffers)

//PRECIO DEL VEHICULO EN LAS FECHAS PASADAS COMO PARAMETRO
api.get('/hotel/precio/:hotelId/:initdate/:enddate', hotelCtrl.rentPrice)


module.exports = api
