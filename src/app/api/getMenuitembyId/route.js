import menuItem from "@/app/models/menuItem";
import dbConnect from "@/app/middleWare/mongoose";

export const GET = async(req)=>{

try{
      const url = new URL(req.url) 
      const id  = url.searchParams.get('id')
      const menuitem = await menuItem.findById({_id:id}) 
    return Response.json({ success: true,Item:menuitem });

}catch(error){

return Response.json({ success: false, error });



}


}