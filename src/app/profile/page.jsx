"use client"
import React from 'react'
import Link from 'next/link';
import { useEffect,useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Tabs from '../component/tabs';
import TabsForNotAdmin from '../component/tabsForNotAdmin';
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from 'next/navigation';
import { format } from 'crypto-js';

export default function Profile(){
 const Pathname = usePathname()
 const router = useRouter(); 
 const [email, setEmail] = useState("");
 const [name, setName] = useState("");
 const [phone, setPhone] = useState("");
 const [address, setAddress] = useState("");
 const [postal, setPostal] = useState("");
 const [city, setCity] = useState("");
 const [token, setToken] = useState("");
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
   return toast.error("Your Postalcode must contain 5 numbers ");
  let data = { token,phone,name,address,postal,city,country,img};

const savingPromis = new Promise(async(resolve, reject) => {
  

     let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateProfile`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });
     if(res.ok){
       let response = await res.json();
       resolve()
      }else{
        reject()
      }
    })

    await toast.promise(savingPromis,{

 loading: "saving profile...",
 success:"profile saved!",
 error:"Error,Sorry..."

  })
      // //  fetcingData()
      //  if (response.success) {
      //    console.log("profile saved!")
        
      //  } else {
      //   console.log("somthing went wrong.")
      //  }
      };
    
    useEffect(() => {
      const jwtToken = localStorage.getItem("token")
      if(!jwtToken){
        router.push("/");
      }else{
     setToken(jwtToken)
     fetcingData(jwtToken)
     }
    },[]);

    const handleImg = async(evt)=>{
    const image = evt.target.files?.[0]
    // if(image.length == 1){
  const data =  new FormData();
  data.append('file',image)
  data.append("upload_preset", "k3jblwbh");
  data.append("cloud_name", "dzfmloyrl");

  const uploadingImg = new Promise(async(resolve, reject) => {
    
  let res = await fetch("https://api.cloudinary.com/v1_1/dzfmloyrl/image/upload", {
    method:"POST",
    body:data
  });
if(res.ok){
  let response = await res.json()
  setImg(response?.url);
  resolve()
}else{

  reject()
}
  })


  //  setImg(response.img)\
   await toast.promise(uploadingImg, {
     loading: "Uploading...",
     success: "Uploaded image",
     error: "Error,Sorry...",
   });


    }

    const fetcingData = async(jwt)=>{
     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateProfile?token=${jwt}`)
     const response = await res.json()
     setIsLoading(false);
     if(response.success){
     setEmail(response.Userdata?.email || '')
     setPhone(response.Userdata?.phone || '')
     setAddress(response.Userdata?.address || '')
     setPostal(response.Userdata?.postalcode || '')
     setCity(response.Userdata?.city || '')
     setName(response.Userdata?.name || '')
     setCountry(response.Userdata?.country || '')
     setAdmin(response.Userdata?.admin);
     setImg(response.Userdata?.img || '')
     setFirstLetter(response.Userdata?.name.charAt(0) || '')
    }    
  else{
    console.log(response.error)
  }
}
  return (
    <>
    {isLoading ? 
    <div className="w-full flex justify-center items-center h-96">
      <h3 className="text-6xl font-sans   text-center  font-medium text-[#f8341e] ">
         Loading...
          </h3>
        </div>
        :
      <section className="overflow-x-hidden max-w-[900px] mx-auto mt-14 pb-28">
        {admin ? <Tabs path={Pathname} /> : <TabsForNotAdmin path={Pathname} />}
        <div className="mt-10 flex flex-col items-center">
          <form onSubmit={handleSub} className="space-y-6">
            <div className="relative  sm:w-[20rem] mx-5 sm:mx-0  md:w-[22rem]  lg:w-[28rem]">
              <div className="sm:absolute flex flex-col gap-2 items-center sm:items-start top-1 -left-28">
                <div className="relative w-[5rem] h-20 sm:w-[6rem] sm:h-24 rounded-lg">
                  {img && (
                    <Image
                      src={img}
                      height={250}
                      width={250}
                      quality={90}
                      className="w-full h-full rounded-lg "
                      alt="profile"
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
              {admin && (
                <div className="flex gap-2 mt-3 items-center">
                  <input
                    id="checkbox"
                    type="checkbox"
                    readOnly
                    checked={admin}
                    className="accent-blue-600"
                  />
                  <label
                    htmlFor="checkbox"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Admin
                  </label>
                </div>
              )}
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
