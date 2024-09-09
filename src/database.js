const mysql = require('mysql');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, coneccion)=>{
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('CONECCION CON LA BASE DE DATOS CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }


    if (coneccion) coneccion.release();
    console.log('Base de Datos Conectada');
    return;
});

module.exports = pool;