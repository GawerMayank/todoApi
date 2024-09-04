import express from "express"
import connectDB from "./src/config/db.js"
import userRouter from "./src/routes/user.routes.js"
import todoRouter from "./src/routes/todos.routes.js"
import 'dotenv/config'

const app = express()

//Database connection
connectDB()

//Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes
app.get("/", (req, res) => {
    res.send(`Hello from server!!`)
})
app.use("/api/users", userRouter)
app.use("/api/todos", todoRouter)

//Server start
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port: ${process.env.PORT}`);
    
})