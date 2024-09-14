const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name:{type: String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img:{type:String},
    phone:{type:Number},
    address:{type:String},
    city:{type:String},
    postalcode:{type:Number},
    country:{type:String},
    admin:{type:Boolean ,default:false}
  },
  { timestamps: true }
);

// OR mongoose.models =
// export default mongoose.model("Order",OrderSchema);
export default mongoose.models.User || mongoose.model("User", UserSchema);
