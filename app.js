import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dbConnect from './config/dbConfig.js'
import cors from 'cors'
import errorHandlers from './middlewares/errorHandler.js'

// routes
import ProductRouter from './routes/products.js'
import CategoryRouter from './routes/categories.js'
import UserRouter from './routes/users.js'
import { authJWT } from './middlewares/isAuthenticated.js'

dbConnect()

dbConnect()
const app = express()
const PORT = process.env.PORT
const API_URL = '/api/v1'

// middlewares
app.use(authJWT())
app.use(errorHandlers)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors())

// routes
app.use(`${API_URL}/products`, ProductRouter)
app.use(`${API_URL}/categories`, CategoryRouter)
app.use(`${API_URL}/users`, UserRouter)

app.listen(PORT, () => {
    console.log('server running on port', PORT)
})
