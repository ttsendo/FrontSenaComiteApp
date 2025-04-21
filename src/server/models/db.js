const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "anne",
    password: "kath123", //contraseña de la base datos
    database: "sebastianproyect" //nombre de la base de datos
});

module.exports = connection;
