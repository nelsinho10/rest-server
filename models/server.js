import express from 'express'
import cors from 'cors'
import { dbConnection } from '../database/config.js'
import userRouter from '../routes/user.js';

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/users'

        // Connect to database
        this.connectDB()

        // Middleware
        this.middlewares()
        // Routes
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, userRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`LISTEN ON PORT ${this.port}`)
        })
    }
}

export default Server
