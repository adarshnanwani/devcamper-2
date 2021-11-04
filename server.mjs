import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
// Route files
import bootcamps from './routes/bootcamps.mjs'

// Load env vars
dotenv.config({ path: './config/config.env' })

const app = express()

// Mount middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `App listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}!`
  )
})
