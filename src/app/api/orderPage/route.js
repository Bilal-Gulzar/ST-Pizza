import Orders from "@/app/models/Orders";
import user from "@/app/models/user";
import mongoose from "mongoose";

export async function GET(req){

 try{
mongoose.connect(process.env.MONGO_URI)
const url = new URL(req.url)
const _id =  url.searchParams.get('id')
console.log(_id)
if(_id){
return Response.json(await Orders.findById(_id));
}

return Response.json({success:true})

}catch(error){

return Response.json({success:false ,Error:error})

   } 

}