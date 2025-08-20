const express= require('express')
require('dotenv').config()
const PORT= process.env.PORT
const app = express()

const {connectdb}= require('./config/connection')
//middlewares
const {authenticateUser, authorizeAccess} =require('./middlewares/auth')

const authRouter= require('./routes/auth')
const vendorRouter= require('./routes/vendor')
const storeRouter= require('./routes/store')

//connection
connectdb(process.env.MONGO_URI) 
 
//global middleware
app.use(express.json())

//routes
app.use('/api/auth', authRouter)
app.use('/api/vendors', authenticateUser, vendorRouter)
app.use('/api/stores', authenticateUser, authorizeAccess(['admin']), storeRouter)

app.get("/", (req, res) => {
  // res.send("Hello, Express is running!");
})


app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
}) 