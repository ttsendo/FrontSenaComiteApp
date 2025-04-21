const express = require("express");
const router = express.Router();
const { login } = require("../controllers/loginController");
const { prueba } = require("../controllers/pruebaController");



router.get('/prueba', prueba);

router.post('/prueba', prueba);

module.exports = router;