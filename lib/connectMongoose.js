const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
});

mongoose.connection.once('open', () => {
    console.log('Conectado a mongodb en', mongoose.connection.name)
});

mongoose.connect(process.env.MONGODB_CONNECTION_STR);
//mongoose.connect('mongodb://127.0.0.1:27017/practicanode');

module.exports = mongoose.connection;