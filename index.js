const express = require ("express");
const mongoose = require("mongoose")
const fileUplode = require("express-fileupload")
const engine = require('ejs-mate')
const path = require('path')
const dotenv = require("dotenv").config()

//ROUTES PATHS
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const countriesRoutes = require("./routes/country.routes")
const provincesRoutes = require("./routes/province.routes")
const citiesRoutes = require ("./routes/cities.routes")
const categoriesRoutes = require("./routes/categories.routes")
const industrialProperty = require("./routes/industialProperties.routes")
const clientRoutes = require("./routes/client.routes")



//Configurations
const app = express();
app.use(express.json());
app.use(fileUplode());
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views') )
app.engine('ejs', engine);
app.set('view engine', 'ejs')

//ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/countries", countriesRoutes )
app.use("/api/provinces", provincesRoutes)
app.use("/api/cities", citiesRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/industrialProperties", industrialProperty)
app.use("/", clientRoutes)

//CONECTION TO THE DATABASE USING MONGO
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("DB CONNECTED SUCCESFULLY"))
    .catch((err)=>{
        console.log(err);
    })

//SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log("Server is running on port: " + PORT)
})