// imports

// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require('morgan')
const connectToDB = require('./db.js')
const petsRoutes = require('./routes/pets.routes.js')
const cors = require('cors')


// Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({origin:'http://localhost:5173'}))



// Routes
app.use('/pets',petsRoutes)

app.get('/test',(req,res)=>{
  res.json({message: 'App Works'})
})





// connect to database and listen on Port 3000
async function startServer() {
    const PORT = process.env.PORT || 3000;
    await connectToDB();

    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
}

startServer();