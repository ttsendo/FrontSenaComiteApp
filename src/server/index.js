const express = require("express");
const app = express();
const port = 5000;
const routes = require("server/api/endPoints");
const cors = require("cors");

app.use(cors({
    origin: ["http://localhost:5175"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use("/", routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});