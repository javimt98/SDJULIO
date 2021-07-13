'use strict'

const net = require('net')
const readline = require('readline-sync')


// COMUNICACION CON EL BANCO A TRAVES DE SOCKET TCP CON LA AYUDA DE LA LIBRERIA NET
function hayDineroTarjeta(req, res)
{
    const options = 
    {
        port: 3001,
        host:'localhost'
    }

    const client = net.createConnection(options)
    client.setEncoding('utf-8');

    client.on('data', (data) =>
    {
        
        console.log('//////////////////////////////////////////////////////////////////////////////////')

        if(data == "0")
            console.log('La tarjeta no tiene saldo suficiente para realizar la reserva. Cancelar Operación.')
        else
            console.log('La tarjeta tiene saldo suficiente para realizar la reserva. Realizar Operación.')

        console.log('//////////////////////////////////////////////////////////////////////////////////')

        client.destroy()
                
        res.status(200).send(data.toString('ascii'))
    })


    client.on('connect', () =>
    {
        console.log('Conexion establecida')
        client.write('Aqui la agencia te envio una tarjeta para comprobar el saldo!')
    })

    client.on('error', (err) =>
    {
        console.log('Error no se ha podido entablar la conexion con el banco...')
        console.log(err.message)
        res.status(500).send(err.message)
    })
}


module.exports = 
{
    hayDineroTarjeta
}