import mongoose from "mongoose"
export const connectdb = async ()=>{
    try{
        await mongoose .connect(process.env.MONGO_URI!)
    }
    catch(error){
        console.log("connection failed");
        console.log(error);
    }
} 
