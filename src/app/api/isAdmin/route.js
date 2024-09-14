import mongoose from "mongoose"
import user from "@/app/models/user"


export const GET = async(req)=>{

try{
    mongoose.connect(process.env.MONGO_URI)
 let url = new URL(req.url)
 let Email  =  url.searchParams.get('mail')
 let isAdmin = await  user.findOne({email:Email})
return Response.json(isAdmin.admin)


}catch(e){

return Response.json(e)

}





}