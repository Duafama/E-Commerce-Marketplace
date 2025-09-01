const express= require('express')
require('dotenv').config()
const PORT= process.env.PORT
const app = express()

const {connectdb}= require('./config/connection')

//middlewares
const {authenticateUser, authorizeAccess} =require('./middlewares/auth')
const {checkApiKey} = require('./middlewares/apiKey')

//portal Api's routers
const authRouter= require('./routes/portal/auth')
const vendorRouter= require('./routes/portal/vendor')
const storeRouter= require('./routes/portal/store')
const vendorUsersRouter= require('./routes/portal/vendorUsers')
const categoryRouter= require('./routes/portal/category')
const productRouter= require('./routes/portal/product')
const variantRouter= require('./routes/portal/variant')
const stockRouter= require('./routes/portal/stock')
const orderRouter= require('./routes/portal/order')

//storefront Api's routers
const orderRouterPublic= require('./routes/public/order')
const productRouterPublic= require('./routes/public/product')
//connection
connectdb(process.env.MONGO_URI) 
 
//global middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//portal Api's 
app.use('/api/portal/auth', authRouter)
app.use('/api/portal', authenticateUser, [vendorRouter, storeRouter, productRouter,  variantRouter])
app.use('/api/portal', authenticateUser, authorizeAccess(['vendor-admin']), vendorUsersRouter)
app.use('/api/portal', authenticateUser, authorizeAccess(['vendor-admin', 'inventory-manager']), stockRouter)
app.use('/api/portal', authenticateUser, authorizeAccess(['vendor-admin', 'store-manager']), categoryRouter, orderRouter)

//storefront Api's
app.use('/api', authRouter)
app.use('/api',checkApiKey, authenticateUser, authorizeAccess(['customer']) ,orderRouterPublic)
app.use('/api', checkApiKey, productRouterPublic)


app.get("/", (req, res) => {
  res.send("Hello, Express is running!");
})


app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
}) 