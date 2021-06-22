'use strict'

const Vehicle = require('../models/vehicle')


function createVehicle()
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
    vehicle.picture = req.body.picture
    vehicle.description = req.body.description
    vehicle.rented = req.body.rented
    vehicle.initdate = req.body.initdate
    vehicle.enddate = req.body.enddate

    vehicle.save((err, vehicleStored) =>
    {
        if (err) res.status(500).send( {message: `Error al almacenar el vehiculo en la bbdd : ${err}`})
    
        res.status(200).send({product: vehicleStored})
    })
}

function readVehicles(req, res)
{
    Vehicle.find({},(err, vehicles) =>
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!vehicles) return res.status(404).send({message: `No hay vehiculos en la bbdd`})
        res.send(200, {vehicles})
    })
}

//       /:vehicleId
function readVehicle(req, res)
{
    let vehicleId = req.params.vehicleId

    Vehicle.findById(vehicleId, (err, vehicle) => 
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!vehicle) return res.status(404).send({message: `El producto no exite`})

        res.status(200).send({vehicle})
    })
}

//      /:vehicleId
function updateVehicle(req, res)
{
    let vehicleId = req.params.vehicleId
    let update = req.body

    Vehicle.findByIdAndUpdate(vehicleId, update, (err, vehicleUpdated) =>
    {
        if (err) res.status((500).send({message: `Error al actualizar el vehiculo de la bbdd: ${err}`}))
        res.status(200).send({vehicle: vehicleUpdated})
    })
}

//    /:vehicleId
function deleteVehicle(req, res)
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


//    /:vehicleId/:initdate/:enddate
function initRent(req, res)
{
    
}


//    /:vehicleId
function cancelRent(req, res)
{
    
}

//   /:initdate/:enddate
function filterOffers(req, res)
{
    
}

//  /:vehicleId/:initdate/:enddate
function rentPrice(req, res)
{

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