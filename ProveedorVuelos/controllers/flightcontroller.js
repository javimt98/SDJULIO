'use strict'

const Flight = require('../models/flight')
const moment = require('moment')
const { query } = require('express')

//Crea un vuelo en la BBDD
function createFlight(req, res)
{
    console.log('POST /flight')
    console.log(req.body)

    let flight = new Flight()
    flight.type = req.body.type
    flight.company = req.body.company
    flight.plane = req.body.plane
    flight.origin = req.body.origin
    flight.destiny = req.body.destiny
    flight.duration = req.body.duration
    flight.price = req.body.price
    flight.description = req.body.description
    flight.rented = req.body.rented
    
    flight.initdate = req.body.initdate
    flight.enddate = req.body.enddate

    flight.save((err, flightStored) =>
    {
        if (err) res.status(500).send( {message: `Error al crear el vuelo en la bbdd : ${err}`})
    
        res.status(200).send(flightStored)
    })
}

//Devuelve un JSON con todos los vuelo
function readFlights(req, res)
{
    Flight.find({},(err, flights) =>
    {
        if (err) return res.status(500).send({message: `Error al realizar la lectura en la bbdd, petición incorrecta: ${err}`})
        if (!flights) return res.status(404).send({message: `No hay vuelos en la bbdd`})
        res.status(200).send(flights)
    })
}

// Devuelve un JSON con el vuelo dado
function readFlight(req, res) //       /:flightId
{
    let flightId = req.params.flightId

    Flight.findById(flightId, (err, flight) => 
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición de lectura en la bbdd: ${err}`})
        if (!flight) return res.status(404).send({message: `El producto no exite`})

        res.status(200).send(flight)
    })
}

// Actualiza un vuelo
function updateFlight(req, res) //  /:flightId
{
    let flightId = req.params.flightId
    let update = req.body

    Flight.findOneAndUpdate(flightId, update, (err, flightUpdated) =>
    {
        if (err) return res.status(500).send({message: `Error al actualizar el vuelo de la bbdd: ${err}`})
        res.status(201).send(flightUpdated)
    })
}

// Borra un vuelo
function deleteFlight(req, res) //    /:flightId
{
    let flightId = req.params.flightId

    Flight.findById(flightId, (err, flight) =>
    {
        if (err) res.status((500).send({message: `Error al borrar el vuelo de la bbdd: ${err}`}))
        
        flight.remove(err =>
        {
            if (err) res.status((500).send({message: `Error al borrar el vuelo de la bbdd: ${err}`}))
            res.status(200).send({message: 'El vuelo ha sido borrado correctamente de la bbdd'})
        })
    })
}

//Actualiza el objeto a reservar poniendo rented a true y las fechas dadas
async function initRent(req, res) //    /:flightId/:initdate/:enddate
{
    let flightId = req.params.flightId
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    const flightFilter = {_id: flightId }

    Flight.findById(flightId, (err, flight) => 
    {
        if (err) return res.status(500).send({message: `Error, no se ha introducido un id valido: ${err}`})
        if (!flight) return res.status(404).send({message: `El vuelo no exite`})
        if (flight.rented == true) res.status(500).send({message: `Error, el vuelo ya esta reservado`})
    })

    const data =  await Flight.findOneAndUpdate(flightFilter, {rented: true, "initdate": initdate, "enddate": enddate})
    res.status(201).send({message: 'El vuelo ha sido reservado correctamente en la bbdd'})
}

//Cancela la reserva cambiando el campo rented a false y las fechas
async function cancelRent(req, res) //    /:flightId
{
    let flightId = req.params.flightId
    const flightFilter = {_id: flightId }


    Flight.findById(flightId, (err, flight) => 
    {
        if (err) return res.status(500).send({message: `Error, no se ha introducido un id valido: ${err}`})
        if (!flight) return res.status(404).send({message: `El vuelo no exite`})
        if(flight.rented == false) return res.status(500).send({message: `Error, no se puede cancelar la reserva ya que el vuelo no se encuentra reservado`})
    })

    const data =  await Flight.findOneAndUpdate(flightFilter, {rented: false}, {"$set": {"initdate": null, "enddate": null}})
    res.status(201).send({message: 'La reserva ha sido cancelada correctamente en la bbdd'})
    
}

//Muestra las ofertas disponibles de vuelos
async function filterOffers(req, res) // /:initdate/:enddate
{
    const data = await Flight.find({rented: false}).exec();
    res.status(200).send(data)
}


// Devuelve un JSON con el vuelo dado
function priceFlight(req, res) //       /:flightId
{
    let flightId = req.params.flightId

    Flight.findById(flightId, (err, flight) => 
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición de lectura en la bbdd: ${err}`})
        if (!flight) return res.status(404).send({message: `El producto no exite`})

        var precio = flight.price
        res.status(200).send({precio})
    })
}

module.exports = 
{
    createFlight,
    readFlights,
    readFlight,
    updateFlight,
    deleteFlight,
    initRent,
    cancelRent,
    filterOffers,
    priceFlight
}