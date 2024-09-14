import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema(
  {
    UserEmail:String,
    phone:String,
    streetAddress:String,
    postalCode:String,
    city:String,
    cartProducts:Object,
    paid:{type:Boolean, default:false},
    country:String
  },
  { timestamps: true }
);

export default mongoose.models?.Order || mongoose.model("Order", OrderSchema);
