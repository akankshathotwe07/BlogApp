import mongoose, { connect }  from "mongoose";


const  connectDB = async ()=>{
    try{
        mongoose.connection.on('connected', ()=> console.log("Database conneted"))
       await mongoose.connect(`${process.env.MONGODB_URI}/blog_app`)

    }catch (error){
console.log(error.message)
    }
    
}
export default connectDB;