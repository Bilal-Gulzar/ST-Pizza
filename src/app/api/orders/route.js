import Orders from "@/app/models/Orders";
import user from "@/app/models/user";
import mongoose from "mongoose";
var jwt = require("jsonwebtoken");

export async function GET(req) {
  try {
    mongoose.connect(process.env.MONGO_URI);
    let isAdmin = false
    const url = new URL(req.url);
    const mail = url.searchParams.get("mail");
    const jwtverify = jwt.verify(mail, process.env.JWT_SECRET_KEY);
    const findUser = await user.findOne({email:jwtverify.email})
    if(findUser){
       isAdmin  = findUser.admin

    } 

    if(isAdmin){

     return Response.json(await Orders.find({}));
    }
 
if(findUser){

 return Response.json(await Orders.find({UserEmail:findUser.email}));

}

 } catch (error) {
    return Response.json({ success: false, Error: error });
  }
}
