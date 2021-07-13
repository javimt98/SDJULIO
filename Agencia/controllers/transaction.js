'use strict'

const { query } = require('express')
const request = require('request')
const util = require('util')
const Transaction = require('../models/transaction')



function getAllTrans(req, res)
{
    Transaction.find({},(err, trans) =>
    {
        if (err) return res.status(500).send({message: `Error al realizar la lectura en la bbdd, petición incorrecta: ${err}`})
        if (!trans) return res.status(404).send({message: `No hay transacciones en la bbdd`})
        res.status(200).send([trans])
    })
}



function getTrans(req, res)
{
    let transId = req.params.transId

    Transaction.findById(transId, (err, trans) => 
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición de lectura en la bbdd: ${err}`})
        if (!trans) return res.status(404).send({message: `No existe esa transaccion`})

        res.status(200).send([trans])
    })
}



async function transindvehiculos(req, res)
{
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    let vehicleId = req.params.vehicleId


    const url = `https://localhost:3008/api/banco`
    
    const requestPromise = util.promisify(request);
    var response = await requestPromise(url);
    
    var saldo = response.body

    const estatus = response.statusCode


    if(estatus == 500)
    {
        res.status(500).send({message:"Error al conectar con el banco"})
    }
    else
    {
        if(saldo == "0")
        {  
            res.status(500).send({message:"Se cancela por falta de saldo"})
            console.log({message:"Se cancela la transaccion"});   
        }
        else
        {
            console.log("Continuo con la transaccion");
            const url2 = `https://localhost:3008/api/reservavehiculo/${vehicleId}/${initdate}/${enddate}`
            response = await requestPromise(url2);
            var estadorespuesta = response.statusCode;
            console.log(estadorespuesta)


            if(estadorespuesta == 201) //se ha podido reservar correctamente
            {      


                //CALCULO EL PRECIO
                const url3 = `https://localhost:3008/api/preciovehiculo/${vehicleId}/${initdate}/${enddate}`
                var responseprecio = await requestPromise(url3);
                var preciovehi = JSON.parse(responseprecio.body)
                var p = preciovehi.preciototal 


                //CREO LA TRANSACCION
                let transaccion = new Transaction()
                transaccion.vehicle = vehicleId
                transaccion.initdate = initdate
                transaccion.enddate = enddate
                transaccion.precio = p

                transaccion.save((err, transactionStored) =>
                {
                    if(err) res.status(500).send({message: `Error al crear la transaccion en la bbdd: ${err}`})
                    res.status(200).send([transactionStored])
                })
            }
            else
            {
                res.status(500).send({message:"Se cancela la transaccion. Error al reservar, el vehículo ya se encuentra reservado en la bbdd"})
            }
        }
    }
}

async function transindhoteles(req, res)
{
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    let hotelId = req.params.hotelId


    const url = `https://localhost:3008/api/banco`
    
    const requestPromise = util.promisify(request);
    var response = await requestPromise(url);   
    var saldo = response.body



    const estatus = response.statusCode


    if(estatus == 500)
    {
        res.status(500).send({message:"Error al conectar con el banco"})
    }
    else
    {
        if(saldo == "0")
        {      
            res.status(500).send({message:"Se cancela por falta de saldo"})
            console.log("Se cancela la transaccion");   
        }
        else
        {
            console.log("Continuo con la transaccion");
            const url2 = `https://localhost:3008/api/reservahotel/${hotelId}/${initdate}/${enddate}`

            response = await requestPromise(url2);

            var estadorespuesta = response.statusCode;

            console.log(estadorespuesta)


            if(estadorespuesta == 201) //se ha podido reservar correctamente
            {      


                //CALCULO EL PRECIO
                const url3 = `https://localhost:3008/api/preciohotel/${hotelId}/${initdate}/${enddate}`
                var responseprecio = await requestPromise(url3);
                var preciohot = JSON.parse(responseprecio.body)
                var p = preciohot.preciototal 
                

                let transaccion = new Transaction();
                transaccion.hotel = hotelId;
                transaccion.initdate = initdate
                transaccion.enddate = enddate
                transaccion.precio = p

                transaccion.save((err, transactionStored) =>
                {
                    if(err) res.status(500).send({message: `Error al crear la transaccion en la bbdd: ${err}`})
                    res.status(200).send([transactionStored])
                })
            }
            else
            {
                res.status(500).send({message:"Se cancela la transaccion. Error al reservar, el hotel ya se encuentra reservado en la bbdd"})
            }
        }
    }
}

async function transindvuelos(req, res)
{
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    let flightId = req.params.flightId

    const url = `https://localhost:3008/api/banco`  
    const requestPromise = util.promisify(request);
    var response = await requestPromise(url);
    var saldo = response.body


    const estatus = response.statusCode


    if(estatus == 500)
    {
        res.status(500).send({message:"Error al conectar con el banco"})
    }
    else
    {
        if(saldo == "0")
        {
            res.status(500).send({message:"Se cancela por falta de saldo"})
            console.log("Se cancela la transaccion");      
        }
        else
        {
            console.log("Continuo con la transaccion");
            const url2 = `https://localhost:3008/api/reservavuelo/${flightId}/${initdate}/${enddate}`
            response = await requestPromise(url2);
            var estadorespuesta = response.statusCode;
            console.log(estadorespuesta)


            if(estadorespuesta == 201) //se ha podido reservar correctamente
            {          
        
                //CALCULO EL PRECIO
                const url3 = `https://localhost:3008/api/preciovuelo/${flightId}`
                var responseprecio = await requestPromise(url3);
                var preciofly = JSON.parse(responseprecio.body)
                var p = preciofly.precio 

                let transaccion = new Transaction();
                transaccion.flight = flightId;
                transaccion.initdate = initdate
                transaccion.enddate = enddate
                transaccion.precio = p

                transaccion.save((err, transactionStored) =>
                {
                    if(err) res.status(500).send({message: `Error al crear la transaccion en la bbdd: ${err}`})
                    res.status(200).send([transactionStored])
                })
            }
            else
            {
                res.status(500).send({message:"Se cancela la transaccion. Error al reservar, el vuelo ya se encuentra reservado en la bbdd"})
            }
        }
    }
}

async function transaccionreservamult(req,res)
{
    let initdate = req.params.initdate
    let enddate = req.params.enddate
    let vehicleId = req.params.vehicleId
    let hotelId = req.params.hotelId
    let flightId = req.params.flightId

    
    //COMPRUEBO BANCO
    var url = `https://localhost:3008/api/banco`
    var requestPromise = util.promisify(request);
    var response = await requestPromise(url);   
    var saldo = response.body
    var estatusbanco = response.statusCode


    if(estatusbanco == 500)
    {
        res.status(500).send({message:"Error al conectar con el banco"})
    }
    else
    {
        if(saldo == "0")
        {
            res.status(500).send({message:"Se cancela por falta de saldo"})
            console.log("Se cancela la transaccion");      
        }
        else
        {

            console.log("AQUI PRINCIPIO PETO")

            //COMPRUEBO VEHICULOS
            var urlvehiculo = `https://localhost:3008/api/reservavehiculo/${vehicleId}/${initdate}/${enddate}`
            var responsev = await requestPromise(urlvehiculo);
            var estadovehiculo = responsev.statusCode;
            console.log(estadovehiculo + " estado del vehiculo")


            //COMPRUEBO HOTELES
            var urlhotel = `https://localhost:3008/api/reservahotel/${hotelId}/${initdate}/${enddate}`
            var responseh = await requestPromise(urlhotel);
            var estadohotel = responseh.statusCode;
            console.log(estadohotel + " estado del hotel")


            //COMPRUEBO VUELOS
            var urlvuelo = `https://localhost:3008/api/reservavuelo/${flightId}/${initdate}/${enddate}`
            var responsef = await requestPromise(urlvuelo);
            var estadovuelo = responsef.statusCode;
            console.log(estadovuelo + " estado del vuelo")



            //si todos han podido se almacena la transaccion 
            if(estadovehiculo == 201 && estadohotel == 201 && estadovuelo == 201)
            {


                //CALCULO LOS PRECIOS DE CADA COSA Y LUEGO LOS SUMO
                
                //PRECIO VEHICULO
                const url3 = `https://localhost:3008/api/preciovehiculo/${vehicleId}/${initdate}/${enddate}`
                var responseprecio = await requestPromise(url3);
                var preciovehi = JSON.parse(responseprecio.body)
                var pve = preciovehi.preciototal 

                //PRECIO HOTEL
                const url4 = `https://localhost:3008/api/preciohotel/${hotelId}/${initdate}/${enddate}`
                responseprecio = await requestPromise(url4);
                var preciohot = JSON.parse(responseprecio.body)
                var pho = preciohot.preciototal 

                //PRECIO VUELO
                const url5 = `https://localhost:3008/api/preciovuelo/${flightId}`
                responseprecio = await requestPromise(url5);
                var preciofly = JSON.parse(responseprecio.body)
                var pvu = preciofly.precio 


                //PRECIO FINAL DEL PACK
                var preciototal = pve + pho + pvu

                console.log("Continuo con la transaccion");
                //GENERO LA TRANSACCION
                let transaccion = new Transaction();
                transaccion.vehicle = vehicleId;
                transaccion.hotel = hotelId;
                transaccion.flight = flightId;
                transaccion.initdate = initdate
                transaccion.enddate = enddate
                transaccion.precio = preciototal

                transaccion.save((err, transactionStored) =>
                {
                    if(err) res.status(500).send({message: `Error al crear la transaccion en la bbdd: ${err}`})
                    res.status(200).send([transactionStored])
                })
            }

            else
            {
                //BUSCO CUAL/CUALES HAN CONSEGUIDO RESERVAR Y ANULO

                console.log("AL ENTRAR A ABORTAR")

                var abortvehicle = false
                var aborthotel = false
                var abortflight = false

                if(estadovehiculo == 201)
                {

                    console.log("PREABORT VEHICULO")

                    //ABORTO VEHICULO        
                    var urlabortvehiculo = `https://localhost:3008/api/cancelarreservavehiculo/${vehicleId}`
                    var responsevehiculo = await requestPromise(urlabortvehiculo);
                    var estadoabortvehiculo = responsevehiculo.statusCode;
                    console.log(estadoabortvehiculo)

                    console.log("POSTABORTVEHICULO")

                    if(estadoabortvehiculo == 201)
                    {
                        abortvehicle = true
                    }
                    else
                    {
                        res.status(500).send({message: `Error al abortar la transaccion en el proveedor de vehiculos: ${err}`})
                    }
                }
                else
                {
                    abortvehicle = true
                }


                if(estadohotel == 201)
                {
                    //ABORTO HOTEL

                    console.log("PREABORT HOTEL")
                    var urlaborthotel = `https://localhost:3008/api/cancelarreservahotel/${hotelId}`
                    var responsehotel = await requestPromise(urlaborthotel);
                    var estadoaborthotel = responsehotel.statusCode;
                    console.log(estadoaborthotel)
                    console.log("POSTABORT HOTEL")

                    if(estadoaborthotel == 201)
                    {
                        aborthotel = true
                    }
                    else
                    {
                        res.status(500).send({message: `Error al abortar la transaccion en el proveedor de hoteles: ${err}`})
                    }
                }
                else
                {
                    aborthotel = true
                }

                if(estadovuelo == 201)
                {
                    //ABORTO VUELO
                    console.log("PREABORT VUELO")
                    var urlabortflight = `https://localhost:3008/api/cancelarreservavuelo/${flightId}`
                    var responsevuelo = await requestPromise(urlabortflight);
                    var estadoabortvuelo = responsevuelo.statusCode;
                    console.log(estadoabortvuelo)

                    console.log("POSTABORTVUELO")

                    if(estadoabortvuelo == 201)
                    {
                        abortflight = true
                    }
                    else
                    {
                        res.status(500).send({message: `Error al abortar la transaccion en el proveedor de vuelos: ${err}`})
                    }
                }
                else
                {
                    abortflight = true
                }


                if(abortvehicle == true && aborthotel == true && abortflight == true)
                {
                    //se ha abortado la transaccion correctamente
                    res.status(200).send({message: `Se ha abortado la transaccion correctamente`})
                }
                else
                {
                    res.status(500).send({message: `Error al abortar la transaccion`})
                }
            }
        }
    }
}



async function cancelartransaccion(req, res)
{

    let transId = req.params.transId



    console.log("ARRANCAMOS")

    Transaction.findById(transId, async (err, trans) => 
    {
        if (err) return res.status(500).send({message: `Error al realizar la petición de lectura en la bbdd: ${err}`})
        if (!trans) return res.status(404).send({message: `No existe el id de transaccion en la bbdd`})
        
        console.log("PRIMERA VUELTA")

        var correctovehicle = false
        var correctovuelo = false
        var correctohotel = false

        if(trans.vehicle != null) // si existe un vehiculo reservado mando cancelarlo
        {

            console.log("ENTRO A CANCELAR VEHICULO")
            console.log(trans.vehicle)

             //ABORTO VEHICULO        
             var urlabortvehiculo = `https://localhost:3008/api/cancelarreservavehiculo/${trans.vehicle}`
             var requestPromise = util.promisify(request);
             var responsevehiculo = await requestPromise(urlabortvehiculo);
             var estadoabortvehiculo = responsevehiculo.statusCode;
             console.log(estadoabortvehiculo)

             
             console.log("ACABO DE CANCELAR VEHICULO")
            console.log(estadoabortvehiculo)
            if(estadoabortvehiculo == 201)
            {
                console.log("CAMBIO EL ESTADO DE ABORTVEHICULO")
                correctovehicle = true
            }
        }
        else
        {
            correctovehicle = true
        }


        if(trans.hotel != null) // si existe un hotel reservado mando cancelarlo
        {
            //ABORTO HOTEL

            console.log("PREABORT HOTEL")
            var urlaborthotel = `https://localhost:3008/api/cancelarreservahotel/${trans.hotel}`
            var responsehotel = await requestPromise(urlaborthotel);
            var estadoaborthotel = responsehotel.statusCode;
            console.log(estadoaborthotel)
            console.log("POSTABORT HOTEL")


            if(estadoaborthotel == 201)
            {
                correctohotel = true
            }
        }
        else
        {
            correctohotel = true
        }


        if(trans.flight != null) // si existe un vuelo reservado mando cancelarlo
        {

            //ABORTO VUELO
            console.log("PREABORT VUELO")
            var urlabortflight = `https://localhost:3008/api/cancelarreservavuelo/${trans.flight}`
            var responsevuelo = await requestPromise(urlabortflight);
            var estadoabortvuelo = responsevuelo.statusCode;
            console.log(estadoabortvuelo)

            if(estadoabortvuelo == 201)
            {
                correctovuelo = true
            }
        }
        else
        {
            correctovuelo = true
        }



        if(correctovehicle == true && correctohotel == true && correctovuelo == true) // se comprueba que habia reserva del elemento / que se ha cancelado correctamente, por lo que se puede cancelar la transaccion
        {
            //la transaccion se cancela cambiando el estado del campo cancelada

            const transFilter = {_id: transId}
            const data =  await Transaction.findOneAndUpdate(transFilter, {cancelada: true, vehicle: null, hotel: null, flight: null})
            

            Transaction.findById(transId, async (err, trans) => 
            {
                res.status(200).send([trans])
            })

            //cancelado = true
            
        }

        else // si no se ha podido cancelar la reserva correctamente se vuelven a reservar los elementos que sean necesarios
        {

            if(correctovehicle == false)
            {
                //vuelvo a reservar el vehiculo
                //COMPRUEBO VEHICULOS
                var urlvehiculo = `https://localhost:3008/api/reservavehiculo/${trans.vehicle}/${trans.initdate}/${trans.enddate}`
                var responsev = await requestPromise(urlvehiculo);
                var estadovehiculo = responsev.statusCode;
                console.log(estadovehiculo + " estado del vehiculo")

            }

            if(correctohotel == false)
            {
                //vuelvo a reservar el hotel
                //COMPRUEBO HOTELES
                var urlhotel = `https://localhost:3008/api/reservahotel/${trans.hotel}/${trans.initdate}/${trans.enddate}`
                var responseh = await requestPromise(urlhotel);
                var estadohotel = responseh.statusCode;
                console.log(estadohotel + " estado del hotel")
            }

            if(correctovuelo == false)
            {
                //vuelvo a reservar el vuelo
                //COMPRUEBO VUELOS
                var urlvuelo = `https://localhost:3008/api/reservavuelo/${trans.flight}/${trans.initdate}/${trans.enddate}`
                var responsef = await requestPromise(urlvuelo);
                var estadovuelo = responsef.statusCode;
                console.log(estadovuelo + " estado del vuelo")
            }

            if(estadovehiculo == 201 && estadohotel == 201 && estadovuelo == 201)
            {
                res.status(200).send({message: "Ha habido un error inesperado al cancelar la reserva pero se ha abortado correctamente el intento"})
            }
            else
            {
                res.status(500).send({message: "Error al cancelar la transaccion..."})
            }
        }
    })
}






module.exports = 
{
    transindvehiculos,
    transindhoteles,
    transindvuelos,
    transaccionreservamult,
    cancelartransaccion,
    getAllTrans,
    getTrans
}