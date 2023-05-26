const mongoose = require("mongoose");

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
    articulo: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.lista_tags = function() {
    const query = Anuncio.find();
    query.distinct('tags');
    return query.exec();
}

anuncioSchema.statics.lista_anuncios = function(filtro, skip, limit, sort, fields) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec();
}


// crear el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;
