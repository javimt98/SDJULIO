'use strict'

const mongoose = require('mongoose')
const app = require('./app')
var net = require('net');


// Crea un net.Socket, objeto que representa una conexión TCP 
const server = net.createServer()


function between(min, max) 
{  
    return Math.floor
    (
      Math.random() * (max - min) + min
    )
}


server.on('connection', (socket) =>
{

    socket.on('data', (data) =>
    {
        console.log('Se acaba de conectar un cliente');

        var respuesta = between(0, 500);
        console.log(respuesta)

        //genero un random de 0 a 500 para ver si hay saldo o no de forma aleatoria
        if(respuesta <= 250)
        {   
            socket.write("0")
            console.log('La tarjeta no tiene saldo.');
        }   
        else
        {
            socket.write("1")
            console.log('La tarjeta tiene saldo suficiente.');
        }            
    })


    socket.on('close', () =>
    {
        console.log("Cerrando comunicacion")
        console.log("///////////////////////////////////")
    })


    socket.on('error', (err) =>
    {
        console.log(err.message)
    })
})


server.listen(3001, () =>
{
    console.log('Servidor corriendo en el puerto 3001 localhost')
})

