import dbConnect from "../../middleWare/mongoose";
import user from "../../models/user";


export async function GET(req) {

    try{
         await dbConnect();
         const url = new URL(req.url);
         const id = url.searchParams.get("id");
        const userdata = await user.findById({_id:id})
   return Response.json({success:true,userdata});

} catch(error){
   return Response.json({ success: false, error });


    }
    }