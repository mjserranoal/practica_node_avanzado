# NodeApp

Install dependencies with:

```sh
npm install
```

Install mongoose:

```sh
npm install mongoose
```

Initialize the database with:

```sh
npm run initDB
```

Start in development mode:

```sh
npm run dev
```
Copiar .env.example to .env y personalizar tus variables de entorno:

```sh
cp .env.example .env
```

## General info

Application created with:

```sh
npx express-generator nodeapp --ejs
```

## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

## API Methods

### GET api/authenticate/


Este servicio devuelve un permite loguearse con las credenciales de un usuario existente en la base de datos. Devolviendo en caso de que las credenciales sean correctas un JWT

Este es un ejemplo de la salida de este servicio 
```sh
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZmZjVlODRmNmZiOTU5M2EzMDNjNzQiLCJpYXQiOjE2ODUwOTc5NDgsImV4cCI6MTY4NTA5Nzk1MH0.JZl65IExPtlQ45Mvuoq5UULbDCNaBo9rEsfrx_JxwH0"
}
```

### GET api/anuncios/


Este servicio devuelve un listado de los anuncios existentes en la base de datos. Para ello se debe indicar un JWT, ya sea mediante la cabecera Authorization o mediante Query Param.

- En caso de no indicar un JWT el servicio devolverá un código de respuesta 401 y el mensaje: '"error": "no token provided"'

- En caso indicar un JWT manipulado o no valido el servicio devolverá un código de respuesta 401 y el mensaje: '"error": "invalid signature"'

- Si el servicio recibe un JWT caducado el servicio devolverá un código de respuesta 401 y el mensaje: '"error": "jwt expired"'


Admite los siguientes parámetros por query para filtrar:

- artículo
- venta
- tags
- precio


Este es un ejemplo de la salida de este servicio 
```sh
{
    "result": [
        {
            "_id": "63fbcede824f6abcfd514a85",
            "articulo": "Norvina",
            "venta": true,
            "precio": 90,
            "foto": "public/images/norvina.jpg",
            "tags": [
                "lifestyle",
                "work"
            ],
            "__v": 0
        },
        {
            "_id": "63fbcede824f6abcfd514a86",
            "articulo": "Sultry",
            "venta": true,
            "precio": 100,
            "foto": "public/images/sultry.jpg",
            "tags": [
                "lifestyle",
                "work"
            ],
            "__v": 0
        }
    ]
}
```

### GET api/anuncio/listado-tags


Este servicio devuelve un listado de los tags de los anuncios existentes en base de datos.



Este es un ejemplo de la salida de este servicio 
```sh
{
    "result": [
        "lifestyle",
        "work"
    ]
}
```

### POST api/anuncio/crear


Este servicio permite crear un nuevo anuncio en base de datos.

Este es un ejemplo de la entrada necesaria para que funcione el servicio


tipo de body: x-www-form-urlencoded
- articulo: "prueba2"
- venta: true
- precio: 200
- tags: work
- tags: lifestyle


Este es un ejemplo de la salida de este servicio 
```sh
{
    "result": {
        "articulo": "prueba 2",
        "venta": true,
        "precio": 200,
        "tags": [
            "work",
            "lifestyle"
        ],
        "_id": "63fbdad3810c998e18b59127",
        "__v": 0
    }
}
```


