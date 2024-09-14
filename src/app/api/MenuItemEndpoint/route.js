import menuItem from "@/app/models/menuItem";
import dbConnect from "@/app/middleWare/mongoose";

export  const  POST = async(req)=>{

try{
    const body = await req.json()
    const { itemName, description, category, price, sizes, extraIngredients} =
      body;
await dbConnect()
  if (category) {
    const newMenuItem = await menuItem.create({
      ItemName: itemName,
      description: description,
      category: category,
      basePrice: price,
      sizes: sizes,
      extraIngregdientPrices: extraIngredients,
      img: body.img,
    });
    return Response.json({ success: true });
  }

}catch(error){

return Response.json({ success: false, error });


}


}

export  const GET = async(req)=>{

 try {
 await dbConnect();
const menuitems = await menuItem.find({}) 

 return Response.json({success:true ,menuitems})


 } catch (error) {

return Response.json({ success: false, error });

 }   
}


export const PUT = async (req) => {
  try {
    await dbConnect();
  const body = await req.json();
  const { _id,itemName, description, category, price, sizes, extraIngredients } = body;
  if (category){
 const editmenuItem = await menuItem.findByIdAndUpdate(
   { _id:_id },{
   ItemName: itemName,
  description:description,
  category: category,
  basePrice: price,
  sizes: sizes,
  extraIngregdientPrices:extraIngredients,
  img:body.img
}
 );
    return Response.json({ success: true,editmenuItem});
}
  } catch (error) {
    return Response.json({ success: false, error });
  }
};



export const DELETE = async (req)=>{

try{
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    await dbConnect()
    console.log(id)
const deleteMenuItem  = await menuItem.findByIdAndDelete({_id:id})
return Response.json({success:true, Message:"MenuItem deleted"});

}catch(error){

return Response.json(error)


}
}

