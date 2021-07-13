'use strict'

const express = require('express')
const api = express.Router()
const auth = require('../middlewares/auth')
const userCtrl = require('../controllers/user')
const proveedorCtrl = require('../controllers/proveedores')
const bancoCtrl = require('../controllers/banco')
const transacCtrl = require('../controllers/transaction')

//RUTAS USUARIOS
//////////////////////////////////////////////////////////////////////////////////// primero llama al middleware para comprobar la autorizacion y tiene el token correcto va a la funcion, si no corta la ejecucion
api.get('/private', auth.isAuth, function(req,res)
{
    res.status(200).send({message:'Tienes Acceso'})
})

api.post('/signup', userCtrl.signUp)

api.post('/signin/:email/:password', userCtrl.signIn)

//////////////////////////////////////////////////////////////////////////////////////////////////

//Rutas proveedor vehiculos
api.get('/allvehicles', proveedorCtrl.getAllVehicles)
api.get('/getvehicle/:vehicleId', proveedorCtrl.getVehicle)
api.get('/ofertasvehiculos/:initdate/:enddate', auth.isAuth, proveedorCtrl.offersVehicles)
api.get('/preciovehiculo/:vehicleId/:initdate/:enddate', proveedorCtrl.priceoftheVehicle)
api.get('/reservavehiculo/:vehicleId/:initdate/:enddate', proveedorCtrl.hacerReservaVehiculo)
api.get('/cancelarreservavehiculo/:vehicleId', proveedorCtrl.cancelarReservaVehiculo)


//Rutas proveedor hoteles
api.get('/allhotels', proveedorCtrl.getAllHotels)
api.get('/gethotel/:hotelId', proveedorCtrl.getHotel)
api.get('/ofertashoteles/:initdate/:enddate', auth.isAuth, proveedorCtrl.offersHotels)
api.get('/preciohotel/:hotelId/:initdate/:enddate', proveedorCtrl.priceoftheHotel)
api.get('/reservahotel/:hotelId/:initdate/:enddate', proveedorCtrl.hacerReservaHotel)
api.get('/cancelarreservahotel/:hotelId', proveedorCtrl.cancelarReservaHotel)


//Rutas proveedor aviones
api.get('/allflights', proveedorCtrl.getAllFlights)
api.get('/getflight/:flightId', proveedorCtrl.getFlight)
api.get('/ofertasvuelos/:initdate/:enddate', auth.isAuth, proveedorCtrl.offersFlights)
api.get('/preciovuelo/:flightId', proveedorCtrl.priceoftheFlight)
api.get('/reservavuelo/:flightId/:initdate/:enddate', proveedorCtrl.hacerReservaVuelo)
api.get('/cancelarreservavuelo/:flightId', proveedorCtrl.cancelarReservaVuelo)


//Ruta banco
api.get('/banco', bancoCtrl.hayDineroTarjeta)


//Ruta transacciones


    //todas las transacciones
api.get('/alltrans', transacCtrl.getAllTrans)
api.get('/transinfo/:transId', auth.isAuth, transacCtrl.getTrans)

    //reservas individuales
api.get('/transindvehiculo/:vehicleId/:initdate/:enddate', transacCtrl.transindvehiculos)
api.get('/transindhotel/:hotelId/:initdate/:enddate', transacCtrl.transindhoteles)
api.get('/transindvuelo/:flightId/:initdate/:enddate', transacCtrl.transindvuelos)
    //reservar pack
api.get('/transmult/:vehicleId/:hotelId/:flightId/:initdate/:enddate', transacCtrl.transaccionreservamult)
    //cancelar reserva
api.get('/canceltrans/:transId', auth.isAuth,transacCtrl.cancelartransaccion)

module.exports = api
