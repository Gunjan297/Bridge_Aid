import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
dotenv.config({})

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const corsOptions ={
        origin:'http://localhost:5173',
        credentials:true,
    }
app.use(cors(corsOptions))


const PORT = process.env.PORT ||3000

//API's
import userRoute from "./routes/user.route.js";
import orgRoute from "./routes/organization.route.js";
import schemeRoute from "./routes/scheme.route.js";
import applicationRoute from "./routes/application.route.js";

app.use("/api/v1/user",userRoute)
app.use("/api/v1/org", orgRoute);
app.use("/api/v1/scheme", schemeRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is runnning at port ${PORT}`);
})