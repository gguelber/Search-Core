const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

//Import routes
const authRoute = require('./routes/auth')
const searchRoute = require('./routes/search')

// Initialize dotenv instance to get access to the variables
dotenv.config()



//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true , useFindAndModify: false}, () => console.log('Connected to MongoDB'))

// Middlewares

app.use(cors({credentials: true, origin: true}))  
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/search', searchRoute)


app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))