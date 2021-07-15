module.exports = 
{
    port: process.env.PORT || 3008,
    db: process.env.MONGODB || 'mongodb+srv://jmm229:421298_Dediciembre@cluster0.gmqmo.mongodb.net/agencia?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miltonb2117af6667bf3w'.toString('base64') 
}