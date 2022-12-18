import * as dotenv from 'dotenv'; 
dotenv.config();
import express from "express";
const app = express();
import * as allRoutes  from './modules/index.route.js';
import connection from './DB/connection.js';


app.use(express.json())
app.use("/api/v1/user",allRoutes.userRoute)
app.use("/api/v1/post",allRoutes.postRoute)
app.use("/api/v1/comment",allRoutes.commentRoute)
connection();


app.listen(3000,()=>{
    console.log("server running")
})