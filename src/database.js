const mysql = require('mysql2'); // Usar mysql2
const { promisify } = require('util');
const { database } = require('./keys');

// Crear el pool de conexiones
const pool = mysql.createPool(database);

// Manejar errores de conexión y asegurarse de que la conexión esté bien establecida
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexión con la base de datos cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene demasiadas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión con la base de datos fue rechazada');
        }
    }

    if (connection) connection.release();
    console.log('Base de Datos Conectada');
    return;
});

// Convertir las consultas a promesas para facilitar el uso con async/await
pool.query = promisify(pool.query);

module.exports = pool;
