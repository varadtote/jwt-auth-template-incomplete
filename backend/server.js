import express from 'express'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const port = process.env.PORT || 3000

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// route
import userRoute from './routes/userRoutes.js'


app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    return res.send("Route Working")
})


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server running on ${port}`))



// **POST /api/users ** - Register a user
// **POST /api/users/auth ** - Authenticate a user and get token
// **POST /api/users/logout ** - Logout user and clear cookies
// **GET /api/users/profile ** - Get User Profile
// **PUT /api/users/profile ** - Update User Profile


