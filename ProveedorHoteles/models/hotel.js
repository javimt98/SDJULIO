'use strict'


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HotelSchema = Schema
({
    type: {type: String, enum: ['individual', 'doble', 'triple']},
    nombre: String,
    telefono: String,
    direccion: String,
    pais: String,
    ciudad: String,
    codpostal : String,    
    price: {type: Number, default: 0},
    description: String,
    rented: Boolean,
    initdate: Date,
    enddate: Date
})

module.exports = mongoose.model('Hotel', HotelSchema)