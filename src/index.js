const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const path = require('path');

// Inicializaciones
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
//metodo viejo handlebars
// app.engine('.hbs', exphbs({
//     defaultLayout: 'main',
//     layoutsDir: path.join(app.get('views'), 'layouts'),
//     partialsDir: path.join(app.get('views'), 'partials'),
//     extname: '.hbs',
//     helpers: require('./lib/handlebars')
// }));
// app.set('view engine', '.hbs');
//metodo actualizado
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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Variables Globales
app.use((req, res, next)=>{


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
