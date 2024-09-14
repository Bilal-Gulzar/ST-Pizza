import mongoose, { Mongoose } from "mongoose";


const ExtraPriceSchema  = new mongoose.Schema({

    name:{type: String},
    extraPrice:{type: Number}
})

const MenuItemSchema = new mongoose.Schema(
  {
    ItemName: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId,required:true},
    img:{type:String,required:true},
    basePrice: { type: Number},
    sizes: { type:[ExtraPriceSchema]},
    extraIngregdientPrices: { type:[ExtraPriceSchema] }
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
