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
const vendorUsersRouter= require('./routes/vendorUsers')
const categoryRouter= require('./routes/category')
const productRouter= require('./routes/product')
//connection
connectdb(process.env.MONGO_URI) 
 
//global middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));

//routes
app.use('/api/auth', authRouter)
app.use('/api/vendors', authenticateUser, vendorRouter)
app.use('/api/stores', authenticateUser, storeRouter)
app.use('/api/vendors/users', vendorUsersRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)

app.get("/", (req, res) => {
  res.send("Hello, Express is running!");
})


app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
}) 