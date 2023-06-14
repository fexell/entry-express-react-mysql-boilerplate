import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import formData from 'express-form-data'
import Sequelize from 'sequelize'
import cookieParser from 'cookie-parser'

import http, { createServer } from 'http'
import { Server } from 'socket.io'

import AuthRoute from './src/Routes/Auth.route.js'
import UserRoute from './src/Routes/User.route.js'

import 'dotenv/config'

const Api             = express()
const Port            = 5000
const HttpServer      = createServer(Api)
const SQL             = new Sequelize(
  'entry',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)

export const Socket   = new Server(HttpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

Api.set('ACCESS_TOKEN_SECRET', process.env.ACCESS_TOKEN_SECRET)
Api.set('REFRESH_TOKEN_SECRET', process.env.REFRESH_TOKEN_SECRET)

Api.use(cors({
  credentials: true,
  origin: true,
  exposedHeaders: [ 'SET-COOKIE' ]
}))
Api.use(bodyParser.json())
Api.use(bodyParser.urlencoded({ extended: true }))
Api.use(formData.parse())

Api.use('/api/Auth', AuthRoute)
Api.use('/api/User', UserRoute)

SQL.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error(`Unable to connect to the database: ${ error }`))

Socket.on('connection', (socket) => {
  console.log('User has connected.')
})

HttpServer.listen(Port, () => console.log(`API is listening on port ${ Port }`))

export default Api