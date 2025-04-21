const connection = require("../models/db");



module.exports.login = (req, res) => {
    const { user, password } = req.body;
    const consult = "SELECT * FROM login WHERE user = ? AND password = ?";

    try{
        connection.query(consult, [user, password], (error, results) => {
            if (error){
                res.status(500).send(error);
            }
            if (results.length > 0){
                console.log(results);
                res.status(200).send(results);
            } else {
                res.status(404).send("User not found")
            }
        })
    }
    catch (error){
        console.log(error);
    }


}
const express = require("express");
const router = express.Router();