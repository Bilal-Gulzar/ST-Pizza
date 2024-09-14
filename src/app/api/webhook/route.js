import Orders from '@/app/models/Orders';
import { sign } from 'jsonwebtoken';


const stripe  = require('stripe')(process.env.STRIPE_SK)
export async function POST(req){

const  sig = req.headers.get('stripe-signature')    

let event;
try{
const reqBuffer = await req.text()
const signSecret = process.env.STRIPE_SIGN_SECRET;
event = stripe.webhooks.constructEvent(reqBuffer,sig,signSecret)

}catch(error){
    console.error('stripe error')
    console.log(error)
    return Response.json(error ,{status:400})
    
}

if(event.type === 'checkout.session.completed'){
    
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if(isPaid){
        await Orders.updateOne({_id:orderId},{paid:isPaid})
        
    }
}



return Response.json(event, { status: 200 });

}