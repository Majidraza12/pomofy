import express from "express";
import router from "./routes/auth.route.js";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.connect.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express();
connectDB()

app.listen(5001, () => {
  console.log(`Sever is Running ${process.env.SERVER_PORT}`);
});

//when ever the request comes and the path is /api/auth just go to router
app.use(express.json())
app.use("/api/auth", router);
app.get("/", (req, res) => {
  res.send("this is Home Page")
});
