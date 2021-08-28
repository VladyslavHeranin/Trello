const express = require(`express`)
const config = require("config")
const mongoose = require(`mongoose`)
const app = express()
const cors = require("./middleware/cors.js")
const authRouter = require("./routes/auth.routes")
require('dotenv').config()

const PORT = process.env.PORT || 5000



app.use(cors)
app.use(express.json())
app.use("/api/auth", authRouter)


const start = async () => {
    try {

   await  mongoose.connect(config.get("url"))

        app.listen(PORT, () => console.log(`app is  port ${PORT}`))

    } catch (error) {

        console.log("error", error)

    }
}

start()














