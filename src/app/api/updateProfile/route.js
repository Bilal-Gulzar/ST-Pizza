import dbConnect from "@/app/middleWare/mongoose";
import user from "@/app/models/user";
import { imageOptimizer } from "next/dist/server/image-optimizer";
var jwt = require("jsonwebtoken");



export const PUT = async (req)=>{
    try{
        await dbConnect()
   const  body  = await req.json()
   if(body._id){
    if(body.img){
    const {_id , phone , name, address, postal, city, country , admin,img} = body
    const userProfileUpdated = await user.findByIdAndUpdate({_id:_id},{name:name,phone:phone,address:address,postalcode:postal,city:city,country:country,admin:admin,img:img})
    return Response.json({ success: true, Message: "profile saved!" });
    }

    else{
  const {_id , phone , name, address, postal, city, country , admin} = body
    const userProfileUpdated = await user.findByIdAndUpdate({_id:_id},{name:name,phone:phone,address:address,postalcode:postal,city:city,country:country,admin:admin})
    return Response.json({ success: true, Message: "profile saved!" });
    }
   
}


   else{
    if(body.img){
    const { token, phone, name, address, postal, city, country,img} = body;
    const jwtverfiy = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const updateProfile = await user.findOneAndUpdate({email:jwtverfiy.email},{name:name,phone:phone,address:address,postalcode:postal,city:city,country:country,img:img}) 
    return Response.json({ success: true, Message: "profile saved!" });

    }
    else{
    const { token,phone,name,address,postal,city,country} = body
    const jwtverfiy = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const updateProfile = await user.findOneAndUpdate({email:jwtverfiy.email},{name:name,phone:phone,address:address,postalcode:postal,city:city,country:country}) 
    return Response.json({success:true,Message:"profile saved!"})
   }
   }
} catch(error){
        return Response.json({success:false,error:error})

    }

}

export const GET = async(req)=>{

try{
    await dbConnect();
    const url =  new URL(req.url)
    const token =  url.searchParams.get('token')
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const User = await user.findOne({email:decode.email})  
    const {email,name,address,city,postalcode,country,phone,admin,img} = User
    const data = { email, name, address, city, postalcode, country, phone ,admin,img};
return Response.json({ success: true, Userdata:data});
} catch(error){
return Response.json(error)


}
}  