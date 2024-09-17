"use client"
import React, { useEffect, useState } from 'react'
import Tabs from '@/app/component/tabs'
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaChevronUp, FaChevronDown, FaS } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Link from 'next/link';
var jwt = require("jsonwebtoken");

export default function MenuItems({params}) {
  const {_id}  = params
  const Pathname = usePathname();
  const router = useRouter();
  const [itemName,setItemName] = useState('')
  const [description,setDescription] = useState('')
  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [sizes,setSizes] = useState([])
  const[sizeUp,setSizeUp] = useState(false)
  const[ingredUp,setIngredUp] = useState(false)
  const [extraIngredients,setExtraIngredients] = useState([])
  const [img, setImg] = useState("");
const [isLoading, setIsLoading] = useState(true);

const handleSub = async (evt)=>{
evt.preventDefault()

 if (!img) {
   return toast.error("Add Menuitem image");
 }
const savingMenuitem = new Promise(async (resolve, reject) => {
      let data = {
        _id,
        itemName,
        description,
        category,
        price,
        sizes,
        extraIngredients,
        img
      }

        let res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/MenuItemEndpoint`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (res.ok) {
          resolve();
        } else {
          reject();
        }
      });
    await toast.promise(savingMenuitem, {
      loading: "Updating menuItem...",
      success: "Updated menuItem",
      error: "Error,Sorry...",
    });
}
const addSizes = () =>{
setSizes(oldSizes =>{
return [...oldSizes,{name:'',extraPrice:0}]
  
})

}

 const handleImg = async (evt) => {
   const image = evt.target.files?.[0];
    if (!image) return;
   const formData = new FormData();
   formData.append("size", "auto");
   formData.append("image_file", image);

   const removingbg = new Promise (async (resolve, reject) => { 
   const respon = await fetch("https://api.remove.bg/v1.0/removebg", {
     method: "POST",
     headers: {
       "X-Api-Key": "6ADX6VwdsUn7EDeuLiMWeLTk", // Replace with your actual API key
     },
     body: formData,
   });
   if (respon.ok) {
   const blob = await respon.blob();
   const reader = new FileReader();
   reader.onloadend = () => {
     resolve()
    // setImg(reader.result)
    uploadToCloudinary(reader.result);
   };
   reader.readAsDataURL(blob);
  }else{

 const errorResponse = await respon.json();
 // setError(errorResponse);
 console.error("Error:", errorResponse);
//  return;
reject()

  }
  })
  
   await toast.promise(removingbg, {
     loading: "removing image background...",
     success: "removed image background",
     error: "Error,Sorry...",
   });


 async function uploadToCloudinary(image) {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "k3jblwbh");
  data.append("cloud_name", "dzfmloyrl");

  const changingImg = new Promise(async (resolve, reject) => {
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
  await toast.promise(changingImg, {
    loading: "changing image...",
    success: "changed image",
    error: "Error,Sorry...",
  });
};

}


const addExtraIngre = ()=>{
setExtraIngredients(extraIngre =>{
return [...extraIngre,{name:'',extraPrice:0}]

})
}

const editSize =(evt,index,prop)=>{
const newvalue = evt.target.value
setSizes(preSizes => {
const newSizes = [...preSizes]
newSizes[index][prop] = newvalue
return newSizes
})
}


const editIngredients =(evt,index,prop)=>{
const newvalue = evt.target.value
setExtraIngredients(preIngredients =>{
const editIngred = [...preIngredients]
editIngred[index][prop] = newvalue
return editIngred 

})


} 

const removeSize = (index)=>{

  setSizes(preSizes => preSizes.filter((v,i)=> i !== index ))

}

const removeIngredient = (Ingreindex)=>{
setExtraIngredients(preIdgredients=> preIdgredients.filter((v,i)=> i !== Ingreindex))
}

useEffect(()=>{
if (typeof window !== "undefined") {
  if (localStorage.getItem("token")) {
    let jwtToken = localStorage.getItem("token");
    let decode = jwt.decode(jwtToken);
    let email = decode.email;

    fetch("/api/isAdmin?mail=" + email)
      .then((res) => res.json())
      .then((admin) => {
        if (!admin) {
          router.push("/");
        }
      });
  }else{
    router.push("/");
  }
}

  fetchingData()
  fetch("/api/categories").then((res)=>{
  res.json().then((data)=>{
    setCategories(data?.getcategory || [])
   }).catch((error)=>{
   console.log("something went wrong.",error)
  })
  })
},[])

const fetchingData = async()=>{

   let res  = await fetch(`/api/getMenuitembyId?id=${_id}`)
    let data =  await res.json()
    setIsLoading(false)
    if (data.success) {
      setItemName(data?.Item.ItemName);
      setDescription(data?.Item.description);
      setSizes(data?.Item.sizes);
      setExtraIngredients(data?.Item.extraIngregdientPrices);
      setPrice(data?.Item.basePrice);
      setCategory(data?.Item.category);
      setImg(data?.Item.img)
    } else {
      console.log("somthing went wrong", data.error);
    }
    // setImg(data).catch((error) => {
      // console.log("somthing went wrong", error);
    // });
  // });
// });
}

const deleteItem = async (id) => {
  const deleting = new Promise(async (resolve, reject) => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/MenuItemEndpoint?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setDeleteMenu(false);
      router.push('/menuItems')
      resolve();
    } else {
      setDeleteMenu(false);
      reject();
    }
    await toast.promise(deleting, {
      loading: " Deleting this Menu item...",
      success: "Menu item deleted!",
      error: "Error,Sorry...",
    });
  });
};

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-96">
          <h3 className="text-6xl font-sans   text-center  font-medium text-[#f8341e] ">
            Loading...
          </h3>
        </div>
      ) : (
        <section className="overflow-x-hidden max-w-[900px] mx-auto mt-14 pb-28">
          <Tabs path={Pathname} />

          <Link href={"/menuItems"}>
            <div className="cursor-pointer sm:w-[36rem] gap-2 mx-5 sm:mx-auto flex mt-14 items-center justify-center lg:w-[47rem] border py-2.5 px-4 shadow-sm border-gray-300  font-semibold rounded-lg  ">
              <span>
                <FaRegArrowAltCircleLeft className="size-6" />
              </span>
              <p className="font-sans font-bold">Show all menu items</p>
            </div>
          </Link>
          <div className="sm:w-[36rem] lg:w-[47rem]  mt-10 flex flex-col items-end mx-auto">
            <form onSubmit={handleSub} className="space-y-6">
              <div className="relative  mx-5 sm:mx-0  sm:w-[27rem]  lg:w-[35rem]">
                <div className="sm:absolute flex flex-col gap-2 items-center sm:items-start top-1 lg:-left-48 -left-36">
                  <div className="relative bg-gray-100 w-[8rem] lg:w-[11rem] h-24 lg:h-28 rounded-lg">
                    {img && (
                      <Image
                        src={img}
                        height={450}
                        width={450}
                        quality={90}
                        className="w-full h-full rounded-lg "
                        alt="Menu item img"
                        priority
                      />
                    )}
                    {!img && (
                      <div className="absolute w-full h-full flex justify-center items-center">
                        <MdOutlineAddPhotoAlternate className="text-black size-11 sm:size-14" />
                      </div>
                    )}
                  </div>
                  <div className=" font-sans text-gray-600 font-semibold text-sm rounded-lg border border-gray-300">
                    <label className=" flex flex-col justify-center cursor-pointer items-center h-12 w-[8rem] lg:w-[11rem] ">
                      <input
                        type="file"
                        onChange={(evt) => handleImg(evt)}
                        className="hidden"
                      />
                      <p className="lg:text-base">Change image</p>
                    </label>
                  </div>
                </div>
                <label
                  htmlFor="name"
                  className="block font-sans text-sm sm:mt-0 mt-3 font-medium leading-6 text-gray-600"
                >
                  Item name
                </label>
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    autoComplete="name"
                    className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
                <label
                  htmlFor="desc"
                  className="block mt-3 font-sans text-sm font-medium leading-6 text-gray-600"
                >
                  Description
                </label>
                <div className="">
                  <input
                    id="desc"
                    name="desc"
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoComplete="description"
                    className="block w-full  rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
                <label
                  htmlFor="category"
                  className="block mt-3 font-sans text-sm font-medium leading-6 text-gray-600"
                >
                  Category
                </label>
                <div className="">
                  <select
                    id="category"
                    value={category}
                    onChange={(evt) => setCategory(evt.target.value)}
                    className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                  >
                    {categories.length > 0 &&
                      categories.map((c, i) => (
                        <option key={i} className="outline-none" value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
                {/* <div className="w-full grid grid-cols-2 gap-2">
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
            </div> */}
                <label
                  htmlFor="price"
                  className="block mt-3 font-sans text-sm font-medium leading-6 text-gray-600"
                >
                  Base Price
                </label>
                <div className="">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    autoComplete="price"
                    className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
                <div className="w-full mx-0  px-4 py-3 rounded-lg mt-3 bg-gray-200  sm:w-[27rem]  lg:w-[35rem]">
                  <button
                    onClick={() => setSizeUp(!sizeUp)}
                    type="button"
                    className=" flex items-center  gap-2 font-sans font-semibold text-lg "
                  >
                    {sizeUp && (
                      <span>
                        <FaChevronUp className="size-5" />
                      </span>
                    )}
                    {!sizeUp && (
                      <span>
                        <FaChevronDown className="size-5" />
                      </span>
                    )}
                    Sizes ({sizes?.length})
                  </button>
                  {sizeUp && (
                    <>
                      {sizes?.length > 0 &&
                        sizes.map((v, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 w-[80%] gap-3 mt-5 mb-2"
                          >
                            <div key={v._id} className="flex flex-col">
                              <label
                                htmlFor="sizesName"
                                className="font-sans text-sm text-gray-600 font-semibold"
                              >
                                Name
                              </label>
                              <input
                                id="sizesName"
                                type="text"
                                value={v.name}
                                onChange={(evt) => editSize(evt, index, "name")}
                                placeholder="Size name"
                                className="bg-gray-50 font-sans border-gray-300  p-2 rounded-lg outline-none focus:ring-1 border  focus:ring-[#f8341e] "
                                autoComplete="name"
                              />
                            </div>
                            <div key={index} className="flex flex-col relative">
                              <label
                                htmlFor="ExtraPrice"
                                className="font-sans text-sm  text-gray-600 font-semibold"
                              >
                                Extra Price
                              </label>
                              <input
                                id="ExtraPrice"
                                type="number"
                                value={v.extraPrice}
                                onChange={(evt) =>
                                  editSize(evt, index, "extraPrice")
                                }
                                // placeholder="0"
                                className="bg-gray-50 font-sans p-2 rounded-lg outline-none focus:ring-1 border border-gray-300  focus:ring-[#f8341e] "
                                autoComplete="ExtraPrice"
                              />
                              <button
                                type="button"
                                onClick={() => removeSize(index)}
                                className="absolute -right-14 bottom-0 bg-white mt-5 p-2 rounded-lg "
                              >
                                <HiOutlineTrash className="size-6" />
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={addSizes}
                        className="w-full flex justify-center items-center font-sans text-lg font-bold p-2 mt-3 rounded-lg bg-white gap-2 mb-1 outline-none"
                      >
                        <span>
                          <AiOutlinePlus className="size-5" />
                        </span>
                        Add Item size
                      </button>
                    </>
                  )}
                </div>
                <div className="w-full mx-0  px-4 py-3 rounded-lg mt-3 bg-gray-200  sm:w-[27rem]  lg:w-[35rem]">
                  <button
                    type="button"
                    onClick={() => setIngredUp(!ingredUp)}
                    className=" flex items-center  gap-2 font-sans font-semibold text-lg "
                  >
                    {ingredUp && (
                      <span>
                        <FaChevronUp className="size-5" />
                      </span>
                    )}
                    {!ingredUp && (
                      <span>
                        <FaChevronDown className="size-5" />
                      </span>
                    )}
                    Extra ingrdients ({extraIngredients?.length})
                  </button>
                  {ingredUp && (
                    <>
                      {extraIngredients?.length > 0 &&
                        extraIngredients.map((v, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 w-[80%] gap-3 mt-5 mb-2"
                          >
                            <div key={index} className="flex flex-col">
                              <label
                                htmlFor="ingredientName"
                                className="font-sans text-sm text-gray-600 font-semibold"
                              >
                                Name
                              </label>
                              <input
                                id="ingredientName"
                                type="text"
                                value={v.name}
                                onChange={(evt) =>
                                  editIngredients(evt, index, "name")
                                }
                                placeholder="Ingredient name"
                                className="bg-gray-50 font-sans border-gray-300  p-2 rounded-lg outline-none focus:ring-1 border  focus:ring-[#f8341e] "
                                autoComplete="ingredientName"
                              />
                            </div>
                            <div
                              key={v.price}
                              className="flex flex-col relative"
                            >
                              <label
                                htmlFor="IngreExtraPrice"
                                className="font-sans text-sm  text-gray-600 font-semibold"
                              >
                                Extra Price
                              </label>
                              <input
                                id="IngreExtraPrice"
                                type="number"
                                value={v.extraPrice}
                                onChange={(evt) =>
                                  editIngredients(evt, index, "extraPrice")
                                }
                                // placeholder="0"
                                className="bg-gray-50 font-sans p-2 rounded-lg outline-none focus:ring-1 border border-gray-300  focus:ring-[#f8341e] "
                                autoComplete="IngreExtraPrice"
                              />
                              <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="absolute -right-14 bottom-0 bg-white mt-5 p-2 rounded-lg "
                              >
                                <HiOutlineTrash className="size-6" />
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={addExtraIngre}
                        className="w-full flex justify-center items-center font-sans text-lg font-bold p-2 mt-3 rounded-lg bg-white gap-2 mb-1 outline-none"
                      >
                        <span>
                          <AiOutlinePlus className="size-5" />
                        </span>
                        Add ingredients prices
                      </button>
                    </>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className=" mx-5 sm:mx-0 w-[90vw] sm:w-full h-10 rounded-lg  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none text-lg"
              >
                Save
              </button>
              <div
                onClick={() => setDeleteMenu(true)}
                className=" gap-2 mx-5 sm:mx-auto flex mt-14 items-center justify-center border py-2.5 px-4 shadow-sm border-gray-300  font-semibold rounded-lg cursor-pointer "
              >
                <p className="font-sans font-bold">Delete this Menu Item</p>
              </div>
            </form>
            {deleteMenu && (
              <div className="flex-col bg-black/80 z-50 flex inset-0 fixed justify-center  items-center">
                <div className=" sm:w-[19rem] lg:w-[20rem] flex flex-col gap-5 p-3 pb-4 rounded-lg bg-white">
                  <p className="text-center text-sm font-medium">
                    are you sure you want to delete this Menu item?
                  </p>
                  <div className="flex gap-3 w-full items-center justify-center">
                    <button
                      onClick={() => {
                        setDeleteMenu(false);
                      }}
                      className="bg-gray-100  border-gray-300 border text-black w-[80px] py-1.5 rounded-md  text flex justify-center items-center font-sans font-bold  outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        deleteItem(_id), setDeleteMenu(false);
                      }}
                      className="bg-[#f8341e] text-white w-[80px] py-1.5 rounded-md  flex justify-center items-center font-sans font-bold  outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
