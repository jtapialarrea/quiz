var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');


var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
//Timeout de sesión configurada en variable de entorno
var timeout = process.env.SESSION_TIMEOUT || 120000;
console.log('>>>>>>>> Control de sesion: Timeout:' + timeout);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('Quiz-jtl 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Helpers dinámicos:
app.use(function(req, res, next){

  //Hacer visible req.session en las vistas
  res.locals.session = req.session;
  //guardar path en session.redir para después de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }
  //Se comprueba si el usuario está conectado y si la sesión ha caducado
  if (req.session.user) { // Usuario logado
    //Tiempo de inactividad (timeout): 2 minutos
    var duracion = Date.now() - req.session.user.timestamp;
    console.log('>>>>>>>> Control de sesion: Duracion sesion: ' + duracion + 'ms');
    if ( duracion > timeout ) {
      console.log('>>>>>>>> Control de sesion: Sesion caducada: ' + parseInt(duracion/1000) + ' sg');
      delete req.session.user;
      req.session.errors = [{"message": 'La sesión ha caducado por inactividad (2 minutos)'}];
      res.redirect("/login");
      return;
      //var err = new Error('Sesión caducada: 2 minutos sin actividad');
      //err.status = 408;
      //next(err);
    } else {
      req.session.user.timestamp =  Date.now();
      console.log('>>>>>>>> Control de sesion: Timeout inicializado: ' + new Date(req.session.user.timestamp).toLocaleTimeString());
    }
  }
  next();
});

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktrace leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});

module.exports = app;
