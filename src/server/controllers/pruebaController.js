const connection = require("../models/db");



module.exports.prueba = (req, res) => {
    const sql = "SELECT * FROM users WHERE user = ? AND password = ?";

    try {
        connection.query(sql, [req.body.user, req.body.password], (error, results) => {
            if (error) throw error;
            res.send(results);
            res.json(results);
        });
    } catch (error) {
        console.log(error);
    }
}
