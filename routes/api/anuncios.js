const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

router.get('/', async(req, res, next) => {
    try {
        //filtros
        const tags = req.query.tags;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const articulo = req.query.articulo;
        //paginacion
        const skip = req.query.skip;
        const limit = req.query.limit;
        //ordenar
        const sort = req.query.sort;
        //seleccion de campos
        const fields = req.query.fields;

        const filtro = {};
        if (articulo) {
            filtro.articulo = { $regex: articulo, $options:'i' };
        }

        if (venta) {
            filtro.venta = venta;
        }

        if (precio) {
            if (precio.includes('-')) {
                let partes = precio.split('-');
                console.log('partes', partes);

                if (partes[0] && partes[1]) {
                    filtro.precio = {'$gte': partes[0], '$lte': partes[1]};
                } else if (partes[0] && !partes[1]) {
                    filtro.precio = {'$gte': partes[0]};
                } else if (!partes[0] && partes[1]) {
                    filtro.precio = {'$lte': partes[1]};
                }
            } else {
                filtro.precio = precio;
            }
        }

        if (tags) {
            filtro.tags = tags;
        }

        console.log('tags', tags);
        const anuncios = await Anuncio.lista_anuncios(filtro, skip, limit, sort, fields);

        res.json({ result: anuncios });
    } catch (error) {
        next(error);
    }
});


router.post('/anuncio/crear', async(req, res, next) => {
    try {
        const body = req.body;

        //creamos una instancia de Anuncio
        const anuncio = new Anuncio(body);

        //persistimos en la BD
        const anuncioPersistido = await anuncio.save();

        res.json({ result: anuncioPersistido });
    } catch (error) {
        next(error);
    }
});

router.get('/anuncio/listado-tags', async(req, res, next) => {
    try {
        const tags = await Anuncio.lista_tags();
        res.json({ result: tags });
    } catch (error) {
        next(error);
    }
});



module.exports = router;