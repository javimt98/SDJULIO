'use strict'


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VehicleSchema = Schema({
    type: { type: String, enum: ['furgoneta', 'moto', 'coche', 'camion']},
    brand: String,
    model: String,
    seats: Number,
    year: Number,
    price: {type: Number, default: 0},
    picture: String,
    description: String,
    rented: Boolean,
    initdate: Date,
    enddate: Date
})

module.exports = mongoose.model('Vehicle', VehicleSchema)