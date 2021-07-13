'use strict'

var seeder = require('mongoose-seed');
const config = require('./config')


seeder.connect(config.db, function()
{
    seeder.loadModels(["./models/flight.js"]);

    seeder.clearModels(['Flight'], function()
    {
        seeder.populateModels(data, function (err, done)
        {
            if(err)
            {
                return console.log("Error al seedear bd", err)
            }

            if(done)
            {
                return console.log("Seeder correctos...", done)
            }

            seeder.disconnect()
        })
    });
});


var data = [
    
    {
        'model': 'Flight',
        'documents':[
            {
                "type":"low cost",
                "company":"Ryanair",
                "plane":"e-2341",
                "duration":"60m",
                "price":"25",
                "origin":"Alicante",
                "destiny":"Paris",
                "description":"Vuelo en oferta España-Francia",
                "rented":"false",
                "initdate":"2020-05-05",
                "enddate":"2020-05-05"
            },
            {
                "type":"low cost",
                "company":"Iberia",
                "plane":"a-172k",
                "duration":"120m",
                "price":"80",
                "origin":"Barcelona",
                "destiny":"Berlin",
                "description":"Vuelo en oferta España-Alemania",
                "rented":"false",
                "initdate":"2021-02-02",
                "enddate":"2021-02-02"
            },
            {
                "type":"directo",
                "company":"Vueling",
                "plane":"Boeing 747",
                "duration":"70m",
                "price":"25",
                "origin":"Madrid",
                "destiny":"Roma",
                "description":"Vuelo regular España-Italia",
                "rented":"true",
                "initdate":"2021-04-04",
                "enddate":"2021-04-04"
            },
            {
                "type":"intercontinental",
                "company":"Iberia",
                "plane":"Boeing 737",
                "duration":"12h",
                "price":"750",
                "origin":"Bilbao",
                "destiny":"Mexico DC",
                "description":"Vuelo al otro lado del charco",
                "rented":"true",
                "initdate":"2019-08-08",
                "enddate":"2019-08-09"
            },
            {
                "type":"intercontinental",
                "company":"Qatar Airways",
                "plane":"Boeing 757",
                "duration":"9h",
                "price":"500",
                "origin":"Paris",
                "destiny":"Bogotá",
                "description":"Vuelo entre Francia-Colombia",
                "rented":"true",
                "initdate":"2019-01-01",
                "enddate":"2019-01-02"
            },
            {
                "type":"directo",
                "company":"Vueling",
                "plane":"aek234",
                "duration":"2h",
                "price":"60",
                "origin":"Valencia",
                "destiny":"Porto",
                "description":"Vuelo directo España-Portugal",
                "rented":"false",
                "initdate":"2015-02-02",
                "enddate":"2015-02-02"
            },
        ]
    }
];