const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeDets = require('./routes/route')
const cors = require('cors')
const Database = "mongodb://127.0.0.1:27017/Ticket";


dotenv.config()

//Connect to Mongo localhost
mongoose.connect(Database, {

    useNewUrlParser:true,
    useUnifiedtopology:true,
    
}).then(() => {console.log("You are now Connected!!!"); }).catch((e) => {console.log(e); });

//Read Port


/* Middleware */

app.use(express.json())
app.use(cors())

/* routes */
app.use('/api/server', routeDets)
app.listen(4000, () => console.log("server is now runing"))