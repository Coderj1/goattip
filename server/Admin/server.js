const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeDets = require('./routes/route')
const routeroute = require('./Middleware/auth')
const cors = require('cors')
const Database = "mongodb://127.0.0.1:27017/Ticket";
const Port = 6500


dotenv.config()

//Connect to Mongo localhost
mongoose.connect(Database, {

    useNewUrlParser:true,
    useUnifiedtopology:true,
    
}).then(() => {console.log("You are now Connected!!!"); }).catch((e) => {console.log(e); });

/* Middleware */

app.use(express.json())
app.use(cors())

/* routes */
app.use('/api/server', routeDets)
app.use('/api/server', routeroute)
app.listen(Port, () => console.log("server is now runing"))