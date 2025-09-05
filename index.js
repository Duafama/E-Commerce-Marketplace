const express= require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const helmet= require('helmet')
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
const salesRouter= require('./routes/portal/sales')

//storefront Api's routers
const authRouterPublic= require('./routes/public/auth')
const customerRouter= require('./routes/public/customer')
const orderRouterPublic= require('./routes/public/order')
const productRouterPublic= require('./routes/public/product')
const categoryRouterPublic= require('./routes/public/category')
//connection

const stripeRouter= require('./routes/stripe/webhook')

connectdb(process.env.MONGO_URI) 

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	message: "Too many requests from this IP. Please try again after some time"
})

app.use(limiter)
app.use(cors())
app.use(helmet())

app.use('/stripe', stripeRouter )
//global middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// function requireHTTPS(req, res, next) {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     return res.redirect('https://' + req.headers.host + req.url);
//   }
//   next();
// }
// app.use(requireHTTPS);

//portal Api's 
app.use('/api/portal/auth', authRouter)
app.use('/api/portal', authenticateUser, [vendorRouter, vendorUsersRouter, storeRouter, productRouter,  variantRouter, salesRouter])
app.use('/api/portal', authenticateUser, authorizeAccess(['vendor-admin', 'inventory-manager']), stockRouter)
app.use('/api/portal', authenticateUser, authorizeAccess(['vendor-admin', 'store-manager']), categoryRouter, orderRouter)

//storefront Api's
app.use('/api', authRouterPublic)
app.use('/api',checkApiKey, authenticateUser, authorizeAccess(['customer']) ,[customerRouter, orderRouterPublic])
app.use('/api', checkApiKey, [categoryRouterPublic, productRouterPublic])

 
app.get("/", (req, res) => {
  res.send("Hello, Express is running!");
})
app.get('/vendors/onboarding/success', (req, res)=>{
  res.send("Onboarded Successfully")
})


app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
}) 