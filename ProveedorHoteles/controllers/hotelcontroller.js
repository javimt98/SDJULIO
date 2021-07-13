'use strict'

const Hotel = require('../models/hotel')
const moment = require('moment')
const { query } = require('express')

//Crea un hotel en la BBDD
function createHotel(req, res)
{
    console.log('POST /hotel')
    console.log(req.body)

    let hotel = new Hotel()
    hotel.nombre = req.body.nombre
    hotel.type = req.body.type
    hotel.telefono = req.body.telefono
    hotel.direccion = req.body.direccion
    hotel.pais = req.body.pais
    hotel.ciudad = req.body.ciudad
    hotel.codpostal = req.body.codpostal
    hotel.price = req.body.price
    hotel.description = req.body.description
    hotel.rented = req.body.rented
    hotel.initdate = req.body.initdate
    hotel.enddate = req.body.enddate


    hotel.save((err, hotelStored) =>
    {
        if (err) res.status(500).send( {message: `Error al crear el hotel en la bbdd : ${err}`})
    
        res.status(200).send(hotelStored)
    })
}

//Devuelve un JSON con todos los hoteles
function readHotels(req, res)
{
    Hotel.find({},(err, hotels) =>
    {
        if (err) return res.status(500).send({message: `Error al realizar la lectura en la bbdd, petición incorrecta: ${err}`})
        if (!hotels) return res.status(404).send({message: `No hay hoteles en la bbdd`})
        res.status(200).send(hotels)
    })
}

// Devuelve un JSON con el hotel dado
function readHotel(req, res) //       /:hotelId
{
    let hotelId = req.params.hotelId

    Hotel.findById(hotelId, (err, hotel) => 
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición de lectura en la bbdd: ${err}`})
        if (!hotel) return res.status(404).send({message: `El producto no exite`})

        res.status(200).send(hotel)
    })
}

// Actualiza un hotel
function updateHotel(req, res) //  /:hotelId
{
    let hotelId = req.params.hotelId
    let update = req.body

    Hotel.findOneAndUpdate(hotelId, update, (err, hotelUpdated) =>
    {
        if (err) return res.status(500).send({message: `Error al actualizar el hotel de la bbdd: ${err}`})
        res.status(201).send(hotelUpdated)
    })
}

// Borra una oferta de hotel
function deleteHotel(req, res) //    /:hotelId
{
    let hotelId = req.params.hotelId

    Hotel.findById(hotelId, (err, hotel) =>
    {
        if (err) res.status((500).send({message: `Error al borrar el hotel de la bbdd: ${err}`}))
        
        hotel.remove(err =>
        {
            if (err) res.status((500).send({message: `Error al borrar el hotel de la bbdd: ${err}`}))
            res.status(200).send({message: 'El hotel ha sido borrado correctamente de la bbdd'})
        })
    })
}

//Actualiza el objeto a reservar poniendo rented a true y las fechas dadas
async function initRent(req, res) //    /:hotelId/:initdate/:enddate
{
    let hotelId = req.params.hotelId
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    const hotelFilter = {_id: hotelId }

    Hotel.findById(hotelId, (err, hotel) => 
    {
        if (err) return res.status(500).send({message: `Error, no se ha introducido un id valido: ${err}`})
        if (!hotel) return res.status(404).send({message: `El hotel no exite`})
        if (hotel.rented == true) res.status(500).send({message: `Error, el hotel ya esta reservado`})
    })

    const data =  await Hotel.findOneAndUpdate(hotelFilter, {rented: true, "initdate": initdate, "enddate": enddate})
    res.status(201).send({message: 'El hotel ha sido reservado correctamente en la bbdd'})

}

//Cancela la reserva cambiando el campo rented a false y las fechas
async function cancelRent(req, res) //    /:hotelId
{
    let hotelId = req.params.hotelId
    const hotelFilter = {_id: hotelId }


    Hotel.findById(hotelId, (err, hotel) => 
    {
        if (err) return res.status(500).send({message: `Error, no se ha introducido un id valido: ${err}`})
        if (!hotel) return res.status(404).send({message: `El hotel no exite`})
        if(hotel.rented == false) return res.status(500).send({message: `Error, no se puede cancelar la reserva ya que el hotel no se encuentra reservado`})
    })

    const data =  await Hotel.findOneAndUpdate(hotelFilter, {rented: false}, {"$set": {"initdate": null, "enddate": null}})
    res.status(201).send({message: 'La reserva ha sido cancelada correctamente en la bbdd'})
}

//Muestra las ofertas disponibles de hoteles
async function filterOffers(req, res) // /:initdate/:enddate
{
    const data = await Hotel.find({rented: false}).exec();
    res.status(200).send(data)
}


//Devuelve el precio total de alquilar ese hotel en las fechas dadas
async function rentPrice(req, res) //  /:hotelId/:initdate/:enddate
{ 
    let hotelId = req.params.hotelId    
    var initdate = moment(req.params.initdate)
    var enddate = moment(req.params.enddate)

    var tiempo = enddate.diff(initdate, 'days')
    
    if(tiempo == 0)
        tiempo = 1

    console.log('El tiempo a alquilar el vehiculo es ', tiempo, 'dias')

    var elvehiculo = await Hotel.find({_id:hotelId}).select({"price": 1, "_id": 0})
    var preciodia = elvehiculo[0].price

    var preciototal = preciodia * tiempo

    res.status(200).send({preciototal})
}


module.exports = 
{
    createHotel,
    readHotels,
    readHotel,
    updateHotel,
    deleteHotel,
    initRent,
    cancelRent,
    filterOffers,
    rentPrice
}