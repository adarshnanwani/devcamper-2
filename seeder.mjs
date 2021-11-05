import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import path from 'path'

const __dirname = path.resolve()

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models
import Bootcamp from './models/Bootcamp.mjs'

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit()
  }
}

if (process.argv[2] === '-i') importData()
else if (process.argv[2] === '-d') deleteData()
else {
  console.log('Please add valid options for the seeder -i or -d')
  process.exit()
}
