'use strict'


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FlightSchema = Schema
({
    type: { type: String, enum: ['low cost', 'directo', 'intercontinental']},
    company: String,
    plane: String,
    origin: String,
    destiny: String,
    duration: String,
    price: {type: Number, default: 0},
    description: String,
    rented: Boolean,
    initdate: Date,
    enddate: Date
})

module.exports = mongoose.model('Flight', FlightSchema)