import express from "express"
import { MongoClient, ServerApiVersion } from "mongodb"
import 'dotenv/config'

const app = express()

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})