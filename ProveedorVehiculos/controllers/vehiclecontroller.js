'use strict'

const Vehicle = require('../models/vehicle')
const moment = require('moment')
const { query } = require('express')

//Crea un vehiculo en la BBDD
function createVehicle(req, res)
{
    console.log('POST /vehicle')
    console.log(req.body)

    let vehicle = new Vehicle()
    vehicle.type = req.body.type
    vehicle.brand = req.body.brand
    vehicle.model = req.body.model
    vehicle.seats = req.body.seats
    vehicle.year = req.body.year
    vehicle.price = req.body.price
    vehicle.description = req.body.description
    vehicle.rented = req.body.rented
    vehicle.initdate = req.body.initdate
    vehicle.enddate = req.body.enddate

    vehicle.save((err, vehicleStored) =>
    {
        if (err) res.status(500).send( {message: `Error al crear el vehiculo en la bbdd : ${err}`})
    
        res.status(200).send(vehicleStored)
    })
}

//Devuelve un JSON con todos los vehiculos
function readVehicles(req, res)
{
    Vehicle.find({},(err, vehicles) =>
    {
        if (err) return res.status(500).send({message: `Error al realizar la lectura en la bbdd, petición incorrecta: ${err}`})
        if (!vehicles) return res.status(404).send({message: `No hay vehiculos en la bbdd`})
        res.status(200).send(vehicles)
    })
}

// Devuelve un JSON con el vehiculo dado
function readVehicle(req, res) //       /:vehicleId
{
    let vehicleId = req.params.vehicleId

    Vehicle.findById(vehicleId, (err, vehicle) => 
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición de lectura en la bbdd: ${err}`})
        if (!vehicle) return res.status(404).send({message: `El producto no exite`})

        res.status(200).send(vehicle)
    })
}

// Actualiza un vehiculo
function updateVehicle(req, res) //  /:vehicleId
{
    let vehicleId = req.params.vehicleId
    let update = req.body

    Vehicle.findOneAndUpdate(vehicleId, update, (err, vehicleUpdated) =>
    {
        if (err) return res.status(500).send({message: `Error al actualizar el vehiculo de la bbdd: ${err}`})
        res.status(201).send(vehicleUpdated)
    })
}

// Borra un vehiculo
function deleteVehicle(req, res) //    /:vehicleId
{
    let vehicleId = req.params.vehicleId

    Vehicle.findById(vehicleId, (err, vehicle) =>
    {
        if (err) res.status((500).send({message: `Error al borrar el vehiculo de la bbdd: ${err}`}))
        
        vehicle.remove(err =>
        {
            if (err) res.status((500).send({message: `Error al borrar el vehiculo de la bbdd: ${err}`}))
            res.status(200).send({message: 'El vehiculo ha sido borrado correctamente de la bbdd'})
        })
    })
}

//Actualiza el objeto a reservar poniendo rented a true y las fechas dadas
async function initRent(req, res) //    /:vehicleId/:initdate/:enddate
{
    let vehicleId = req.params.vehicleId
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    const vehicleFilter = {_id: vehicleId }

    Vehicle.findById(vehicleId, (err, vehicle) => 
    {
        if (err) return res.status(500).send({message: `Error, no se ha introducido un id valido: ${err}`})
        if (!vehicle) return res.status(404).send({message: `El vehiculo no exite`})
        
        if (vehicle.rented == true) res.status(500).send({message: `Error, el vehiculo ya esta reservado`})
    
    })

    const data =  await Vehicle.findOneAndUpdate(vehicleFilter, {rented: true, "initdate": initdate, "enddate": enddate})
    res.status(201).send({message: 'El vehiculo ha sido reservado correctamente en la bbdd'})

}

//Cancela la reserva cambiando el campo rented a false y las fechas
async function cancelRent(req, res) //    /:vehicleId
{
    let vehicleId = req.params.vehicleId
    const vehicleFilter = {_id: vehicleId }


    Vehicle.findById(vehicleId, (err, vehicle) => 
    {
        if (err) return res.status(500).send({message: `Error, no se ha introducido un id valido: ${err}`})
        if (!vehicle) return res.status(404).send({message: `El vehiculo no exite`})
        if(vehicle.rented == false) return res.status(500).send({message: `Error, no se puede cancelar la reserva ya que el vehiculo no se encuentra reservado`})
    })

    const data =  await Vehicle.findOneAndUpdate(vehicleFilter, {rented: false}, {"$set": {"initdate": null, "enddate": null}})
    res.status(201).send({message: 'La reserva ha sido cancelada correctamente en la bbdd'})
}

//Muestra las ofertas disponibles de vehiculos
async function filterOffers(req, res) // /:initdate/:enddate
{
    const data = await Vehicle.find({rented: false}).exec();
    res.status(200).send(data)
}


//Devuelve el precio total de alquilar ese vehiculo en las fechas dadas
async function rentPrice(req, res) //  /:vehicleId/:initdate/:enddate
{
    
    let vehicleId = req.params.vehicleId    
    var initdate = moment(req.params.initdate)
    var enddate = moment(req.params.enddate)

    var tiempo = enddate.diff(initdate, 'days')
    
    if(tiempo == 0)
        tiempo = 1

    console.log('El tiempo a alquilar el vehiculo es ', tiempo, 'dias')

    var elvehiculo = await Vehicle.find({_id:vehicleId}).select({"price": 1, "_id": 0})
    var preciodia = elvehiculo[0].price

    var preciototal = preciodia * tiempo

    res.status(200).send({preciototal})
}


module.exports = 
{
    createVehicle,
    readVehicles,
    readVehicle,
    updateVehicle,
    deleteVehicle,
    initRent,
    cancelRent,
    filterOffers,
    rentPrice
}