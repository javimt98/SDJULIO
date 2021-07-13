'use strict'

var seeder = require('mongoose-seed');
const config = require('./config')


seeder.connect(config.db, function()
{
    seeder.loadModels(["./models/vehicle.js"]);

    seeder.clearModels(['Vehicle'], function()
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
        'model': 'Vehicle',
        'documents':[
            {
                "price":"50",
                "brand":"Ford",
                "model":"Focus",
                "seats":"5",
                "type":"coche",
                "year":"2008",
                "description":"Gasolina 120cv",
                "rented":"false",
                "initdate":"2018-01-01",
                "enddate":"2018-04-04"
            },
            {
                "price":"200",
                "brand":"Ferrari",
                "model":"LaFerrari",
                "seats":"2",
                "type":"coche",
                "year":"2016",
                "description":"Gasolina 800cv",
                "rented":"false",
                "initdate":"2020-01-01",
                "enddate":"2020-02-02"
            },
            {
                "price":"50",
                "brand":"Fiat",
                "model":"Punto",
                "seats":"4",
                "type":"coche",
                "year":"2003",
                "description":"Diesel 75cv",
                "rented":"false",
                "initdate":"2021-01-01",
                "enddate":"2021-04-04"
            },
            {
                "price":"80",
                "brand":"Mercedes",
                "model":"Vito",
                "seats":"7",
                "type":"furgoneta",
                "year":"2015",
                "description":"Diesel 110cv",
                "rented":"false",
                "initdate":"2017-01-01",
                "enddate":"2017-04-04"
            },
            {
                "price":"150",
                "brand":"Volvo",
                "model":"Gama FH",
                "seats":"3",
                "type":"camion",
                "year":"2020",
                "description":"Diesel 200cv",
                "rented":"true",
                "initdate":"2019-03-04",
                "enddate":"2019-06-05"
            },
            {
                "price":"90",
                "brand":"Suzuki",
                "model":"GSX",
                "seats":"2",
                "type":"moto",
                "year":"2015",
                "description":"Gasolina 100cv",
                "rented":"true",
                "initdate":"2015-01-01",
                "enddate":"2015-04-04"
            },
            {
                "price":"100",
                "brand":"Harley Davidson",
                "model":"Street Bob",
                "seats":"1",
                "type":"moto",
                "year":"2013",
                "description":"Gasolina 140cv",
                "rented":"true",
                "initdate":"2021-01-01",
                "enddate":"2021-04-04"
            },
            {
                "price":"200",
                "brand":"Audi",
                "model":"R8",
                "seats":"2",
                "type":"coche",
                "year":"2020",
                "description":"Gasolina 360cv",
                "rented":"true",
                "initdate":"2019-01-01",
                "enddate":"2019-04-04"
            },
            {
                "price":"35",
                "brand":"Beta",
                "model":"ARK",
                "seats":"2",
                "type":"moto",
                "year":"2001",
                "description":"Scooter Gasolina 4cv",
                "rented":"true",
                "initdate":"2019-01-01",
                "enddate":"2019-04-04"
            },
            {
                "price":"95",
                "brand":"Peugeot",
                "model":"3008",
                "seats":"5",
                "type":"coche",
                "year":"2021",
                "description":"Diesel 140cv",
                "rented":"false",
                "initdate":"2018-01-01",
                "enddate":"2018-04-04"
            }
        ]
    }
];