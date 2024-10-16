const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const { database } = require('./keys');

// Inicializaciones
const app = express();
require('./lib/passport')


// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
// Configuración de Handlebars
const hbs = create({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
});
app.engine('.hbs', hbs.engine); 
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
    secret: 'faztmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)

  }));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Variables Globales
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});



// Rutas
app.use(require('./routes/index'));
app.use(require('./routes/autenticaciones'));
app.use('/links', require('./routes/links'));

// Archivos Públicos
app.use(express.static(path.join(__dirname, 'public')));

// Empezar Servidor
app.listen(app.get('port'), () => {
    console.log('Server en Puerto: ', app.get('port'));
});
