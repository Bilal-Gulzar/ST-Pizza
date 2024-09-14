import Categories from "@/app/categories/page";
import dbConnect from "@/app/middleWare/mongoose";
import categories from "@/app/models/categories";
import { BiCategory } from "react-icons/bi";

export async function POST(req) {

    try{
        const body = await req.json()
        // console.log(body.newCategory)
        await dbConnect()
        const newCategory = await categories.create({name:body.newCategory}) 
        
        return Response.json({success:true ,Message:"category added."})

}catch(error){

    return Response.json({ success: false ,error});


}

}

export async function  GET(req){

try{
    await dbConnect()
  const getcategory =  await categories.find({})
        return Response.json({ success: true, getcategory});
}catch(error){
    return Response.json({ success: false, error });

}
}


export const DELETE = async (req)=>{

try{
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    await dbConnect()
    console.log(id)
const deleteCategory  = await categories.findByIdAndDelete({_id:id})
return Response.json({success:true, Message:"Category deleted"});

}catch(error){

return Response.json(error)


}


}

export const PUT = async(req)=>{
try{
await dbConnect()
const body =  await req.json();
console.log(body.id)
const {newCategory,id} =  body
const updateCategory =  await categories.updateOne({_id:id},{name:newCategory})
return Response.json({success:true,Message:"Category Updated"})

}
catch(error){    
return Response.json(error);

}


}
