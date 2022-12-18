import mongoose from "mongoose";

const connection=async ()=>{
    return mongoose.connect("mongodb://localhost:27017/exam1")
    .then(()=>{
        console.log("db connected");
    }).catch(()=>{
        console.log("db error");
    })
}
export default connection;
