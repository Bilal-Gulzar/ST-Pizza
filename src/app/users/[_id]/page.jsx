"use client"
import React from 'react';
import Tabs from '../../component/tabs';
import { usePathname,useRouter,redirect} from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState} from 'react';
import Image from 'next/image';
import { decode } from "jsonwebtoken";
var jwt = require("jsonwebtoken");

export default function Users({params}){
const {_id} = params
const Pathname = usePathname();
 const router = useRouter();
const slug =  Pathname?.split('/')[1]
const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [postal, setPostal] = useState("");
const [city, setCity] = useState("");
const [country, setCountry] = useState("");
const [admin, setAdmin] = useState(false);
const [img, setImg] = useState("");
const [firstLetter, setFirstLetter] = useState("");
 const [isLoading, setIsLoading] = useState(true);


   const handleSub = async (evt) => {
     evt.preventDefault();
     if (phone.toString().length != 11)
       return toast.error("Please Enter correct number");
     if (!(postal?.toString().length == 5))
       return toast.error("Your Postalcode must contain 5 numbers");

     const savingUserProfile =  new Promise(async(resolve, reject) => {
      
  
     let data = {_id , phone, name, address, postal, city, country,admin,img };
     let res = await fetch(
       `${process.env.NEXT_PUBLIC_HOST}/api/updateProfile`,
       {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       }
     );

     let response = await res.json();
     //  fetcingData()
     if (response.success) resolve()
      
      else reject()
  })

  await toast.promise(savingUserProfile, {
    loading: "saving profile...",
    success: "profile saved!",
    error: "error",
  });
   };

 const fetchingData = async (id) => {
   const res = await fetch(
     `${process.env.NEXT_PUBLIC_HOST}/api/userdata?id=${id}`
   );
   const response = await res.json();
   setIsLoading(false)
   if(response.success){
     setEmail(response.userdata?.email || "");
     setPhone(response.userdata?.phone || "");
     setAddress(response.userdata?.address || "");
     setPostal(response.userdata?.postalcode || "");
     setCity(response.userdata?.city || "");
     setName(response.userdata?.name || "");
     setCountry(response.userdata?.country || "");
     setAdmin(response.userdata?.admin);
     setImg(response.userdata?.img || "");
     setFirstLetter(response.userdata?.name.charAt(0) || "");
    }
 };    

 const handleImg = async (evt) => {
   const image = evt.target.files?.[0];
   // if(image.length == 1){
   const data = new FormData();
   data.append("file", image);
   data.append("upload_preset", "k3jblwbh");
   data.append("cloud_name", "dzfmloyrl");

   const uploadingImg = new Promise(async (resolve, reject) => {
     let res = await fetch(
       "https://api.cloudinary.com/v1_1/dzfmloyrl/image/upload",
       {
         method: "POST",
         body: data,
       }
     );
     if (res.ok) {
       let response = await res.json();
       setImg(response?.url);
       resolve();
     } else {
       reject();
     }
   });

   //  setImg(response.img)\
   await toast.promise(uploadingImg, {
     loading: "Updating image...",
     success: "Updated image",
     error: "Error,Sorry...",
   });
 };



 useEffect(() => {
   const jwtToken = localStorage.getItem("token");
   if (!jwtToken) {
      return redirect('/')
   } else {
     fetchingData(_id);
   }

   if (typeof window !== "undefined") {
     if (jwtToken) {
       let jwttoken = localStorage.getItem("token");
       let decode = jwt.decode(jwttoken);
       let email = decode.email;

       fetch("/api/isAdmin?mail=" + email)
         .then((res) => res.json())
         .then((admin) => {
           if (!admin) {
             router.push("/");
           }
         });
     }
   }
   
  }, []);
  
  return (
  <>
  {
  isLoading ? 
    <div className="w-full flex justify-center items-center h-96">
      <h3 className="text-6xl font-sans   text-center  font-medium text-[#f8341e] ">
        Loading...
      </h3>
    </div>
   : 
    <section className="overflow-x-hidden max-w-[900px] mx-auto mt-14 pb-28">
      <Tabs path={slug} />
      <div className="mt-10 flex flex-col items-center">
        <form onSubmit={handleSub} className="space-y-6">
          <div className="relative sm:w-[20rem] mx-5 sm:mx-0  md:w-[22rem]  lg:w-[28rem]">
            <div className="sm:absolute flex flex-col gap-2 items-center sm:items-start top-1 -left-28">
              <div className="relative w-[5rem] h-20 sm:w-[6rem] sm:h-24 rounded-lg">
                {img && (
                  <Image
                    src={img}
                    height={250}
                    width={250}
                    quality={90}
                    className="w-full h-full rounded-lg "
                    alt=" user profile image"
                    priority
                  />
                )}
                {!img && (
                  <div className="absolute inset-0 bg-indigo-500 rounded-lg text-white font-bold text-3xl flex justify-center items-center ">
                    {firstLetter}
                  </div>
                )}
              </div>
              <div className=" font-sans text-gray-600 font-semibold text-sm rounded-lg border border-gray-300">
                <label className=" flex flex-col justify-center cursor-pointer items-center h-12 sm:w-[6rem] w-[5rem] ">
                  <input
                    type="file"
                    onChange={(evt) => handleImg(evt)}
                    className="hidden"
                  />
                  <p>Change</p>
                  <p>image</p>
                </label>
              </div>
            </div>
            <label
              htmlFor="name"
              className="block text-sm sm:mt-0 mt-3 font-medium leading-6 text-gray-600"
            >
              Name
            </label>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
            <label
              htmlFor="email"
              className="block mt-3 text-sm font-medium leading-6 text-gray-600"
            >
              Email address
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="xyz@gmail.com"
                value={email}
                readOnly
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-lg border-0 p-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
              <p className="text-gray-700  text-xs font-sans">
                Email can't Change{" "}
              </p>
            </div>
            <label
              htmlFor="phone"
              className="block mt-3 text-sm font-medium leading-6 text-gray-600"
            >
              Phone
            </label>
            <div className="">
              <input
                id="phone"
                name="phone"
                type="number"
                required
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="phone"
                className="block w-full  rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
            <label
              htmlFor="address"
              className="block mt-3 text-sm font-medium leading-6 text-gray-600"
            >
              Address
            </label>
            <div className="">
              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="address"
                className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="postal code"
                  className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                >
                  Postal code
                </label>
                <div className="">
                  <input
                    id="postal code"
                    name="postalcode"
                    type="number"
                    required
                    placeholder="Postal code"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    autoComplete="postal code"
                    className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                >
                  City
                </label>
                <div className="">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="city"
                    className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
            </div>
            <label
              htmlFor="country"
              className="block mt-3 text-sm font-medium leading-6 text-gray-600"
            >
              Country
            </label>
            <div className="">
              <input
                id="country"
                name="country"
                type="text"
                placeholder="Country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                autoComplete="country"
                className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={admin}
                  className="accent-blue-600"
                  onChange={() => setAdmin(!admin)}
                />
                <p className="block text-sm font-medium leading-6 text-gray-600">
                  Admin
                </p>
              </label>
            </div>
          </div>
          <button className=" mx-5 sm:mx-0 w-[90vw] sm:w-full h-9 rounded-lg  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none">
            Save
          </button>
        </form>
      </div>
    </section>
}
</>
  );
    }
