module.exports = 
{
    port: process.env.PORT || 3008,
    db: process.env.MONGODB || 'mongodb://localhost:27017/agencia',
    SECRET_TOKEN: 'miltonb2117af6667bf3w'.toString('base64') 
}