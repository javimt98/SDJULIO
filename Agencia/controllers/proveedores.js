'use strict'

const { query } = require('express')
const request = require('request')
const util = require('util')
var dateFormat = require('dateformat')



const ipvehiculos = "172.20.42.7"
const iphoteles = "172.20.42.6"
const ipvuelos = "172.20.42.6"


//PROVEEDOR DE VEHICULOS
////////////////////////////////////////////////////////////////////////////////////////////

function getAllVehicles(req, res)
{
    request.get(`https://${ipvehiculos}:3005/api/vehicle`, (err, response, body) =>
    {
        if (err) return res.status(500).send({message: `Error al contactar con el proveedor de vehiculos: ${err}`})
        var datos = JSON.parse(body)
        res.status(200).send(datos)
    })
}


function getVehicle(req, res)
{
    let vehicleId = req.params.vehicleId

    request.get
    ({
        "headers": { "content-type": "application/json" },
        "url": `https://${ipvehiculos}:3005/api/vehicle/${vehicleId}`,
    }, 
    
    (err, response, body) => 
    {

        if (err) return res.status(500).send({message: `Error al contactar con el proveedor de vehiculos: ${err}`})

        var datos = JSON.parse(body)
        res.status(200).send(datos)

        console.dir(JSON.parse(body));
    });
}


async function offersVehicles(req, res)
{
    let initdate = req.params.initdateId
    let enddate = req.params.enddateId


    const url = `https://${ipvehiculos}:3005/api/vehicle/filtrarofertas/${initdate}/${enddate}`

    
    const requestPromise = util.promisify(request);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


async function priceoftheVehicle(req, res)
{
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    let vehicleId = req.params.vehicleId

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${ipvehiculos}:3005/api/vehicle/precio/${vehicleId}/${date1}/${date2}`
    const requestPromise = util.promisify(request);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


async function hacerReservaVehiculo(req, res)
{
    let vehicleId = req.params.vehicleId
    let initdate = req.params.initdate
    let enddate = req.params.enddate

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${ipvehiculos}:3005/api/vehicle/initrent/${vehicleId}/${date1}/${date2}`

    const requestPromise = util.promisify(request.put);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)

    const estatus = response.statusCode

    res.status(estatus).send(respu)
}


async function cancelarReservaVehiculo(req, res)
{
    let vehicleId = req.params.vehicleId
    let initdate = req.params.initdate
    let enddate = req.params.enddate

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${ipvehiculos}:3005/api/vehicle/cancelrent/${vehicleId}`

    const requestPromise = util.promisify(request.put);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)

    const estatus = response.statusCode
    res.status(estatus).send(respu)
}







//PROVEEDOR HOTELES
////////////////////////////////////////////////////////////////////////////////////////////
function getAllHotels(req, res)
{
    request.get(`https://${iphoteles}:3006/api/hotel`, (err, response, body) =>
    {
        if (err) return res.status(500).send({message: `Error al contactar con el proveedor de hoteles: ${err}`})
        var datos = JSON.parse(body)
        res.status(200).send(datos)
    })
}


function getHotel(req, res)
{
    let hotelId = req.params.hotelId

    request.get(
    {
        "headers": { "content-type": "application/json" },
        "url": `https://${iphoteles}:3006/api/hotel/${hotelId}`,
    }, 
    
    (err, response, body) => 
    {

        if (err) return res.status(500).send({message: `Error al contactar con el proveedor de hoteles: ${err}`})

        var datos = JSON.parse(body)
        res.status(200).send(datos)

        console.dir(JSON.parse(body));
    });
}


async function offersHotels(req, res)
{
    let initdate = req.params.initdateId
    let enddate = req.params.enddateId

    const url = `https://${iphoteles}:3006/api/hotel/filtrarofertas/${initdate}/${enddate}`
    const requestPromise = util.promisify(request);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


async function priceoftheHotel(req, res)
{
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    let hotelId = req.params.hotelId

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${iphoteles}:3006/api/hotel/precio/${hotelId}/${date1}/${date2}`
    const requestPromise = util.promisify(request);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


async function hacerReservaHotel(req, res)
{
    let hotelId = req.params.hotelId
    let initdate = req.params.initdate
    let enddate = req.params.enddate

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${iphoteles}:3006/api/hotel/initrent/${hotelId}/${date1}/${date2}`

    const requestPromise = util.promisify(request.put);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


async function cancelarReservaHotel(req, res)
{
    let hotelId = req.params.hotelId
    let initdate = req.params.initdate
    let enddate = req.params.enddate

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${iphoteles}:3006/api/hotel/cancelrent/${hotelId}`

    const requestPromise = util.promisify(request.put);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}



//PROVEEDOR DE AVIONES
////////////////////////////////////////////////////////////////////////////////////////////
function getAllFlights(req, res)
{
    request.get(`https://${ipvuelos}:3007/api/flight`, (err, response, body) =>
    {
        if (err) return res.status(500).send({message: `Error al contactar con el proveedor de vuelos: ${err}`})
        var datos = JSON.parse(body)
        res.status(200).send(datos)
    })
}


function getFlight(req, res)
{
    let flightId = req.params.flightId

    request.get(
    {
        "headers": { "content-type": "application/json" },
        "url": `https://${ipvuelos}:3007/api/flight/${flightId}`,
    }, 
    
    (err, response, body) => 
    {

        if (err) return res.status(500).send({message: `Error al contactar con el proveedor de vehiculos: ${err}`})

        var datos = JSON.parse(body)
        res.status(200).send(datos)

        console.dir(JSON.parse(body));
    });
}


async function offersFlights(req, res)
{
    let initdate = req.params.initdateId
    let enddate = req.params.enddateId

    const url = `https://${ipvuelos}:3007/api/flight/filtrarofertas/${initdate}/${enddate}`
    const requestPromise = util.promisify(request);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


function priceoftheFlight(req, res)
{
    let flightId = req.params.flightId

    request.get(
    {
        "headers": { "content-type": "application/json" },
        "url": `https://${ipvuelos}:3007/api/flight/price/${flightId}`,
    }, 
    
    (err, response, body) => 
    {
        if (err) return res.status(500).send({message: `Error al contactar con el proveedor de vehiculos: ${err}`})
        res.status(200).send(JSON.parse(body))
    });
}


async function hacerReservaVuelo(req, res)
{
    let flightId = req.params.flightId
    let initdate = req.params.initdate
    let enddate = req.params.enddate

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${ipvuelos}:3007/api/flight/initrent/${flightId}/${date1}/${date2}`

    const requestPromise = util.promisify(request.put);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


async function cancelarReservaVuelo(req, res)
{
    let flightId = req.params.flightId
    let initdate = req.params.initdate
    let enddate = req.params.enddate

    var date1 = dateFormat(initdate, "yyyy-mm-dd")
    var date2 = dateFormat(enddate, "yyyy-mm-dd")
    date1.toString()
    date2.toString()

    const url = `https://${ipvuelos}:3007/api/flight/cancelrent/${flightId}`

    const requestPromise = util.promisify(request.put);
    const response = await requestPromise(url);
    const respu = JSON.parse(response.body)
    const estatus = response.statusCode
    res.status(estatus).send(respu)
}


module.exports =
{
    getAllVehicles,
    getAllHotels,
    getAllFlights,
    getVehicle,
    getHotel,
    getFlight,
    offersVehicles,
    offersHotels,
    offersFlights,
    priceoftheVehicle,
    priceoftheHotel,
    priceoftheFlight,
    hacerReservaVehiculo,
    hacerReservaHotel,
    hacerReservaVuelo,
    cancelarReservaVehiculo,
    cancelarReservaHotel,
    cancelarReservaVuelo
}