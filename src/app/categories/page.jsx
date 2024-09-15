"use client"
import React, { useEffect, useRef, useState } from 'react'
import Tabs from '../component/tabs'
import { usePathname,useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";
import { decode } from 'jsonwebtoken';
var jwt = require('jsonwebtoken')

export default function Categories() {
 const Pathname = usePathname();
 const router = useRouter()
const [newCategory,setNewCategory] = useState('')
const [deleteCategory,setDeleteCategory] = useState(false)
const [editCategory,setEditCategory] = useState('') 
const [categories,setCategories] = useState([])
const [id,setId] = useState('')
const [isLoading, setIsLoading] = useState(true);
const[value,setValue] =useState('')
const inputRef = useRef(null)

const handleSub = async()=>{
// evt.preventDefault()
let data = {newCategory}
if(editCategory){
  data.id = id
}

const savingPromise = new Promise(async (resolve, reject) => {
  let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/categories`, {
    method: editCategory ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if(res.ok){
  // let response = await res.json();
  setEditCategory("");
  fetchingData();
  setNewCategory("");
  resolve()
  }else{
    reject()
  }
  //        if (response.success) {
});


    await toast.promise(savingPromise, {
      loading:  editCategory ? "Editing category..." : "Creating category...",
      success: editCategory ? "Edited category" : "created category!",
      error: "Error,Sorry...",
    });
      //  }else{}

}

const deleteItem = async(_id)=>{

const deleting = new Promise(async (resolve, reject) => {

let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/categories?id=${_id}`,{
  method:"DELETE"
});

if(res.ok){
// let response = await res.json();
setDeleteCategory(false)
fetchingData();
resolve()
}else{
setDeleteCategory(false);
  reject()
}
 await toast.promise(deleting, {
   loading:" Deleting category...",
   success: "Category deleted!",
   error: "Error,Sorry...",
 });

})
}

 const fetchingData = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/categories`);
   const response = await res.json();
   setIsLoading(false)
   if(response.success){
   setCategories(response.getcategory);
 }else{
  console.log("error in get Categories")
 }
}


const cancel = ()=>{
setNewCategory('')
setEditCategory('')
setId('')
}
 
 useEffect(()=>{
if(typeof window !== 'undefined'){
if(localStorage.getItem('token')){

 let jwtToken = localStorage.getItem('token')
 let decode = jwt.decode(jwtToken)
 let email =  decode.email

fetch('/api/isAdmin?mail='+email)
.then((res)=>res.json())
.then((admin)=>{
if(!admin){  
  router.push('/')
}
})
}else{
  router.push("/");

}

}

fetchingData()

 },[])


const foucus = () => {
  inputRef.current.focus();

}


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

          {/* <form className="pt-9" method="POST"> */}
          <div className="sm:w-[36rem] pt-9 mx-5 sm:mx-auto flex  gap-2 sm:gap-3 items-center  lg:w-[47rem]">
            <div className="flex-grow">
              <label
                htmlFor="name"
                className="block text-sm sm:mt-0 mt-3 font-medium leading-6 text-gray-600"
              >
                {editCategory ? "Update category: " : "New category name"}
                {editCategory && (
                  <span className="font-medium text-black ">{newCategory}</span>
                )}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                ref={inputRef}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                autoComplete="name"
                className="block w-full rounded-lg border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 font-medium focus:ring-1 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
            <button
              disabled={newCategory.length ===0}
              onClick={handleSub}
              // type="submit"
              className="bg-[#f8341e] mt-9 cursor-pointer sm:mt-6 text-white w-[70px] sm:w-[85px] py-2.5 sm:py-2 rounded-lg  flex justify-center items-center   text-sm sm:text-base font-sans font-bold  outline-none"
            >
              {editCategory ? "Update" : "Create"}
            </button>
            <button
              onClick={cancel}
              className="bg-gray-100  border-gray-300 border mt-9 sm:mt-6 text-black w-[75px] sm:w-[85px]  py-2.5  sm:py-2 rounded-lg  text flex justify-center items-center font-sans font-bold   text-sm  sm:text-base outline-none"
            >
              Cancel
            </button>
          </div>
          {/* </form> */}
          <div className="sm:w-[36rem] relative mx-5 sm:mx-auto flex  mt-20 gap-2 sm:gap-3 items-center  lg:w-[47rem] flex-col ">
            {categories.length > 0 && (
              <p className=" absolute font-sans font-medium  -top-6 left-0 text-gray-600 text-sm ">
                Existing Categories
              </p>
            )}
            {categories.length > 0 &&
              categories.map((v) => (
                <div
                  key={v._id}
                  className="flex w-full items-center justify-between rounded-lg border py-2 px-4 shadow-sm  border-gray-300 bg-gray-100 sm:text-sm sm:leading-6 outline-none "
                >
                  <p className=" font-bold text-base font-sans text-gray-900">
                    {v.name}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditCategory("c"),
                          setNewCategory(v.name),
                          setId(v._id),
                          setValue(v.name),
                          foucus();
                      }}
                      className="bg-gray-50 border-gray-400 border text-gray-900 w-[53px] py-1 rounded-lg  flex justify-center items-center font-sans font-bold  outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteCategory(true), setId(v._id);
                      }}
                      className="bg-gray-50 border-gray-400 border text-gray-900 w-[65px] py-1 rounded-lg  flex justify-center items-center font-sans font-bold  outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {deleteCategory && (
            <div className="flex-col bg-black/80 flex inset-0 fixed justify-center  items-center">
              <div className=" sm:w-[19rem] lg:w-[20rem] flex flex-col gap-5 p-3 pb-4 rounded-lg bg-white">
                <p className="text-center text-sm font-medium">
                  are you sure you want to delete this category?
                </p>
                <div className="flex gap-3 w-full items-center justify-center">
                  <button
                    onClick={() => {
                      setDeleteCategory(false), setId("");
                    }}
                    className="bg-gray-100  border-gray-300 border text-black w-[80px] py-1.5 rounded-md  text flex justify-center items-center font-sans font-bold  outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      deleteItem(id), setEditCategory(""), setNewCategory("");
                    }}
                    className="bg-[#f8341e] text-white w-[80px] py-1.5 rounded-md  flex justify-center items-center font-sans font-bold  outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
