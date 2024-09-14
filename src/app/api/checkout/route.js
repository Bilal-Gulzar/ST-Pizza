import { metadata } from "@/app/layout";
import mongoose, { connect } from "mongoose";
import Orders from "@/app/models/Orders";
import user from "@/app/models/user";
import menuItem from "@/app/models/menuItem";

const stripe = require("stripe")(process.env.STRIPE_SK);

export const POST = async(req)=>{
try{
mongoose.connect(process.env.MONGO_URI);
const {cartProducts,email,address,postal,city,phone,country}  = await req.json() 
const orderDoc  = await Orders.create({
    UserEmail:email,
    phone:phone,
    streetAddress:address,
    postalCode:postal,
    city:city,
    cartProducts:cartProducts,
    paid:false,
    country:country,
}) 

let stripLineItems  = []

for (const cartProduct of cartProducts){
    let productName = cartProduct.ItemName
    let productPrice = 0
 let productInfo  = await menuItem.findById(cartProduct._id)
    productPrice  = productInfo.basePrice
  if(cartProduct.size){
 const size = productInfo.sizes.find((size)=> size._id.toString() === cartProduct.size._id.toString())
   productPrice  += size.extraPrice
 }
 if(cartProduct.extras?.length >0 ){

for (const cartProductExtraThing of cartProduct.extras){

const extrathingInfo = productInfo.extraIngregdientPrices.find(extra => extra._id.toString() === cartProductExtraThing._id.toString())
  productPrice += extrathingInfo.extraPrice
}

 }
  
 stripLineItems.push({
   quantity: 1,
   price_data: {
     currency: "USD",
     product_data: {
       name: productName,
     },
     unit_amount: productPrice * 100,
   },
 });
    
}

const stripeSession = await stripe.checkout.sessions.create({
  line_items: stripLineItems,
  mode: "payment",
  customer_email: email,
  success_url: process.env.NEXT_PUBLIC_HOST + "/order/"+orderDoc._id+"?clear-cart=1",
  cancel_url: process.env.NEXT_PUBLIC_HOST + "/cart?canceled=1",
  metadata: { orderId: orderDoc._id.toString()},
  shipping_options: [
    {
      shipping_rate_data: {
        display_name: "Delivery fee",
        type: "fixed_amount",
        fixed_amount: { amount: 500, currency: "USD" },
      },
    } 
  ],
});

  return Response.json(stripeSession.url)
 

}
catch(e){

return Response.json(e)

}


}