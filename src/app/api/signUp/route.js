import dbConnect from "@/app/middleWare/mongoose";
import user from "@/app/models/user";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(req) {
  try {
    let body = await req.json();
    await dbConnect();
    const {name,email,password} = body;
    // var ciphertext =
    let User = new user({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString()
    });
    await User.save();

    var token = jwt.sign(
      {
        name:User.name,
        email: User.email
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return Response.json({ success: true, token });
  } catch (error) {
    return Response.json({ success: false, error: "Email Already Exist!" });
  }
}
