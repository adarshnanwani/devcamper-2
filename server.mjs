import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.mjs'

// Load env vars
dotenv.config({ path: './config/config.env' })

// Route files
import bootcamps from './routes/bootcamps.mjs'

// Connect to database
connectDB()

const app = express()

// Mount middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(
    `App listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}!`
      .yellow.bold
  )
})

// Handle unhandled promise rejections
process.on('unhandledRejections', (err) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})
