'use strict'

var seeder = require('mongoose-seed');
const config = require('./config')


seeder.connect(config.db, function()
{
    seeder.loadModels(["./models/hotel.js"]);

    seeder.clearModels(['Hotel'], function()
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
        'model': 'Hotel',
        'documents':[
            {
                "nombre":"Apartamentos la Mar",
                "type":"individual",
                "telefono":"123456789",
                "direccion":"Calle Jaime I",
                "pais":"España",
                "ciudad":"Altea",
                "codpostal":"03655",
                "price":"60",
                "rented":"false",
                "initdate":"2020-01-01",
                "enddate":"2020-02-02"
            },         
            {
                "nombre":"Hotel Melia Alc",
                "type":"doble",
                "telefono":"455555556",
                "direccion":"Av la Paz",
                "pais":"España",
                "ciudad":"Alicante",
                "codpostal":"03910",
                "price":"110",
                "rented":"true",
                "initdate":"2021-01-04",
                "enddate":"2021-04-05"
            },
            {
                "nombre":"NH Collection León Plaza Mayor",
                "type":"individual",
                "telefono":"849856789",
                "direccion":"Plaza Mayor 15",
                "pais":"España",
                "ciudad":"Leon",
                "codpostal":"24000",
                "price":"83",
                "rented":"false",
                "initdate":"2019-01-01",
                "enddate":"2019-01-01"
            },
            {
                "nombre":"Hotel Exe Leon",
                "type":"triple",
                "telefono":"665865892",
                "direccion":"Calle Velazquez",
                "pais":"España",
                "ciudad":"Leon",
                "codpostal":"24000",
                "price":"180",
                "rented":"true",
                "initdate":"2017-01-01",
                "enddate":"2017-01-01"
            },
            {
                "nombre":"Palacio de Valderrábanos",
                "type":"doble",
                "telefono":"44879216",
                "direccion":"Plaza de la Catedral 9",
                "pais":"España",
                "ciudad":"Avila",
                "codpostal":"149823",
                "price":"125",
                "rented":"false",
                "initdate":"2021-04-08",
                "enddate":"2021-08-05"
            },
            {
                "nombre":"Grand Miramar All Luxury Suites & Residences",
                "type":"doble",
                "telefono":"469841318494",
                "direccion":"Puerto vallarta 14",
                "pais":"Mexico",
                "ciudad":"Jalisco",
                "codpostal":"87954983",
                "price":"250",
                "rented":"true",
                "initdate":"2021-06-28",
                "enddate":"2021-07-01"
            },
            {
                "nombre":"Kakslauttanen Artic Resort",
                "type":"triple",
                "telefono":"1498541365149",
                "direccion":"Kajpsonk 513",
                "pais":"Finlandia",
                "ciudad":"Kakslauttanen",
                "codpostal":"894913191",
                "price":"500",
                "rented":"false",
                "initdate":"2019-12-01",
                "enddate":"2019-12-10"
            },
            
        ]
    }
];