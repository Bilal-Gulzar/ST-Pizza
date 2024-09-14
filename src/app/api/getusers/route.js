import dbConnect from "../../middleWare/mongoose";
import user from "../../models/user";

export async function GET(req) {

    try{
        await dbConnect()
const usersEmail = await user.find() 
let userdata = []
for(let item of usersEmail){
    let  emails ={}
    emails['_id'] = item._id
   emails['name'] = item.name
    emails['email'] = item["email"] 
    userdata.push(emails)
}
   return Response.json(userdata)


    }
    catch(error){
   return Response.json({succes:false,error})
    }


}