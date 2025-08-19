const express= require('express')
require('dotenv').config()
const PORT= process.env.PORT
const app = express()

const {connectdb}= require('./config/connection')


const authRouter= require('./routes/auth')
const vendorRouter= require('./routes/vendor')
//connection
connectdb(process.env.MONGO_URI) 
 
//global middleware
app.use(express.json())

//routes
app.use('/api/auth', authRouter)
app.use('/api/vendor', vendorRouter)
app.get("/", (req, res) => {
  res.send("Hello, Express is running!");
})




app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
})