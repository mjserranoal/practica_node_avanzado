var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/connectMongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const i18n = require('./lib/i18nConfigure');
const LoginController = require('./controllers/loginController');
const PrivadoController = require('./controllers/PrivadoController');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuthMiddleware');
const MongoStore = require('connect-mongo');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');

require('./lib/connectMongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();
const privadoController = new PrivadoController();

/**
 * Rutas del api
 */
app.use('/api/anuncios', jwtAuthMiddleware, require('./routes/api/anuncios'));
app.post('/api/authenticate', loginController.postAPI)

app.use(i18n.init);
app.use(session({
    name: 'nodeapp-session',
    secret: 'as78dbas8d7bva6sd6vas',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2 // expira a los 2 días de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STR
    })
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/privado', sessionAuth, privadoController.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    //comprobar si es un error de validacion
    if (err.array) {
        //const errorInfo = err.array({ onlyFirstError: true })[0];
        err.message = 'Se han producido los siguientes errores:\n';
        err.errors.forEach(errorInfo => {
            err.message += `- Error en ${errorInfo.location}, parametro ${errorInfo.param} ${errorInfo.msg}\n`

        });
        err.status = 422
    }

    res.status(err.status || 500);

    // si lo que ha fallado es una peticion al api
    // devuelvo el error en formato json
    if (req.originalUrl.startsWith('/api/')) {
        res.json({ error: err.message });
        return;
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.render('error');
});

module.exports = app;
