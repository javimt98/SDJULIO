'use strict'

//MIDDLEWARE PARA COMPROBAR LA AUTENTICACION DE LOS TOKEN DE LOS USUARIOS

const jwt = require('jwt-simple')
const config = require('../config')
const moment = require('moment')


function isAuth (req, res, next) 
{
  if (!req.headers.authorization) 
  {
   return res.status(403).res({ message: `Acceso Denegado` })
  }
 
  const token = req.headers.authorization.split(' ')[1]
  
  
  try
  {
    const payload = jwt.decode(token, config.SECRET_TOKEN)
  
    if (payload.exp < moment().unix()) 
    {
      return res.status(401).send({ message: `El token ha expirado, no tienes acceso` })
    }
    
    req.user = payload.sub
    next()
    
  }
  catch(err)
  {
    return res.status(500).send({message:`Token invalido`})
  }
}



function createToken(user)
{
    const payload = 
    {
        sub: user._id,//id usuario, es el de mongodb aunque no es lo mas recomendable se puede poner en peligro la integridad de la bbdd pero por simplicidad lo hago asi
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix() // añade a la etiqueta 14 dias al tiempo de unix que es el de ahora, es el tiempo de validez del token
    }

    //ahora codificamos el payload
    return jwt.encode(payload, config.SECRET_TOKEN) // el secret esta en el fichero config.js
}




module.exports = 
{
  isAuth,
  createToken
}