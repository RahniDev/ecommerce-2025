import express from "express"
import 'dotenv/config'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import expressValidator from 'express-validator'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import braintreeRoutes from './routes/braintree.js'
import orderRoutes from './routes/order.js'

const app = express()
  
mongoose.set("strictQuery", false)

mongoose.connect(process.env.DATABASE)
.then(() => console.log('DB connected'))

app.use(morgan('dev'))
app.use(bodyParser.json())
// used to save users credentials
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

