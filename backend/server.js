import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes  from "./routes/auth.route.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", authRoutes);


app.listen(PORT, ()=> {
    console .log(`server is running on the port ${PORT}`);
    connectMongoDB();
})