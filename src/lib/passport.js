const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const flash = require('connect-flash');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

   const rows = await  pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0){
        const user = rows[0];
       const validPassword = await helpers.matchPassword(password, user.password);
       if(validPassword){
        done(null, user, req.flash('success' + 'Bienvenido' + user.username));
       }else {
        done(null, false, req.flash('message'+'Contraseña Incorrecta'))
       }
    }else{
        return done(null, false, req.flash('message'+'El nombre de Usuario no Existe'))
    }
}));

    
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const { fullname } = req.body;
        const newUser = {
            username,
            password,
            fullname
        };

        // Encriptar la contraseña
        newUser.password = await helpers.encryptPassword(password);

        // Insertar el nuevo usuario en la base de datos
        const result = await pool.query('INSERT INTO users SET ?', [newUser]);

        // Asignar el ID retornado al objeto usuario
        newUser.id = result.insertId;

        // Llamar a done pasando el nuevo usuario
        return done(null, newUser);
    } catch (err) {
        return done(err);
    }
}));

// Serializar usuario en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
    try {
        const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        done(null, rows[0]); // Retorna el usuario completo
    } catch (err) {
        done(err, null);
    }
});
