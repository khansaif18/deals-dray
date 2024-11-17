import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDatabase from './config/database.config.js'
import cloudinaryConfig from './config/cloudinary.config.js'
import validateToken from './middleware/validateToken.js'
import adminRoute from './route/admin.route.js'
import employeeRoute from './route/employee.route.js'


dotenv.config()
const app = express()


connectDatabase()
cloudinaryConfig()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use('/api/admin', adminRoute)
app.use('/api/employee', validateToken, employeeRoute)


app.get('/', (req, res) => {
    res.json({ message: 'all gud' })
})


app.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`))