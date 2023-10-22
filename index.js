const express = require('express')
require('dotenv').config()
const databaseConnection = require('./config/database')
const logger = require('morgan')
const authRouter = require('./routes/authRoutes')
const productRouter = require('./routes/productRoute')
const blogRouter = require('./routes/blogRoutes')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT || 4000

//* Middlewares
app.use(express.json());
app.use(logger('dev'))
app.use(cookieParser())

app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
// app.get('/', (req, res) => {
//     res.send({msg: 'Welcome!!!'})
// })

app.use(notFound)
app.use(errorHandler)

//* connect to the database
databaseConnection()

app.listen(PORT, function() {
    console.log(`Express app running on port ${PORT}`)
});