const express= require('express')
require('dotenv').config()
const PORT= process.env.PORT
const app = express()

const {connectdb}= require('./config/connection')

//middlewares
const {authenticateUser, authorizeAccess} =require('./middlewares/auth')
const {checkApiKey} = require('./middlewares/apiKey')

const authRouter= require('./routes/dashboard/auth')
const vendorRouter= require('./routes/dashboard/vendor')
const storeRouter= require('./routes/dashboard/store')
const vendorUsersRouter= require('./routes/dashboard/vendorUsers')
const categoryRouter= require('./routes/dashboard/category')
const productRouter= require('./routes/dashboard/product')
const variantRouter= require('./routes/dashboard/variant')
const stockRouter= require('./routes/dashboard/stock')
const orderRouter= require('./routes/dashboard/order')


const orderRouterPublic= require('./routes/public/order')
const productRouterPublic= require('./routes/public/product')
//connection
connectdb(process.env.MONGO_URI) 
 
//global middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/api/dashboard/auth', authRouter)
app.use('/api/dashboard', authenticateUser, [vendorRouter, storeRouter, productRouter,  variantRouter])
app.use('/api/dashboard', authenticateUser, authorizeAccess(['vendor-admin']), vendorUsersRouter)
app.use('/api/dashboard', authenticateUser, authorizeAccess(['vendor-admin', 'inventory-manager']), stockRouter)
app.use('/api/dashboard', authenticateUser, authorizeAccess(['vendor-admin', 'store-manager']), categoryRouter, orderRouter)

//storefront routes
app.use('/api', authRouter)
app.use('/api',checkApiKey, authenticateUser, authorizeAccess(['customer']) ,orderRouterPublic)
app.use('/api', checkApiKey, productRouterPublic)



app.get("/", (req, res) => {
  res.send("Hello, Express is running!");
})


app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
}) 