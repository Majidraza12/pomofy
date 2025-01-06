import express from "express";
import router from "./routes/auth.route.js";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.connect.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express();
connectDB()

//when ever the request comes and the path is /api/auth just go to router
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials : true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", router);
app.get("/", (req, res) => {
  res.send("this is Home Page")
});
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Sever is Running ${process.env.SERVER_PORT}`);
});
