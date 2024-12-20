const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PartiesRoute = require("./controller/PartiesRoute");
const VoterListRoute = require("./controller/VoterListRoute");
const IsVotedRoute = require("./controller/ISVotedRoute");
const AdminsRoute = require("./controller/AdminsRoute");

const app = express();
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://Shareeba:sharufirdz@cluster0.jl7kc.mongodb.net/vote");
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error Occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/healthcheck", (req, res) => {
    res.send("status ok");
});
app.use("/PartiesRoute", PartiesRoute);
app.use("/VoterListRoute", VoterListRoute);
app.use("/ISVotedRoute", IsVotedRoute);
app.use("/AdminsRoute", AdminsRoute);

app.listen(5000, () => {
    console.log("Server Started at 5000");
});
