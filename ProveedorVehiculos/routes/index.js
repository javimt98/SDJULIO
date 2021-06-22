'use strict'

const express = require('express')
const vehicleCtrl = require('../controllers/vehiclecontroller') //controlador
const api = express.Router()

//CREATE
api.post('/vehicle', vehicleCtrl.createVehicle)

//READ COMPLETO
api.get('/vehicle', vehicleCtrl.readVehicles)

//READ UNICO
api.get('/vehicle/:vehicleId', vehicleCtrl.readVehicle)

//UPDATE
api.put('/vehicle/:vehicleId', vehicleCtrl.updateVehicle)

//DELETE
api.delete('/vehicle/:vehicleId', vehicleCtrl.deleteVehicle)

//HACER RESERVA
api.put('/vehicle/hacerreserva/:vehicleId/:initdate/:enddate', vehicleCtrl.initRent)

//CANCELAR RESERVA
api.put('/vehicle/cancelarreserva/:vehicleId', vehicleCtrl.cancelRent)

//DEVUELVE EN UN ARRAY DE JSON LAS OFERTAS FILTRADAS
api.get('/vehicles/filtrarofertas/:initdate/:enddate', vehicleCtrl.filterOffers)

//PRECIO DEL VEHICULO EN LAS FECHAS PASADAS COMO PARAMETRO
api.get('/vehicles/preciovehiculo/:vehicleId:/:initdate/:enddate', vehicleCtrl.rentPrice)


module.exports = api
