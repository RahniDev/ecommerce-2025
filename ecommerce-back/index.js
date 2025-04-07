import express from "express"
import 'dotenv/config'
import mongoose from 'mongoose'

const app = express()

const port = process.env.PORT || 8000
  
mongoose.set("strictQuery", false)

mongoose.connect(process.env.DATABASE)
.then(() => console.log('DB connected'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

