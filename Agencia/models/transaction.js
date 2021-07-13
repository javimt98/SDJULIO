'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = Schema(
{
    fecha: {type: Date, default: Date.now()},
    cancelada: {type:Boolean, default: false},
    vehicle: {type: String, default: null},
    hotel:{type: String, default: null},
    flight:{type:String, default: null},
    initdate:{type: Date},
    enddate:{type:Date},
    precio:{type:Number, default: 0}
})


module.exports = mongoose.model('Transaction', TransactionSchema)

