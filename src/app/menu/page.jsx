"use client"
import React, { useEffect,useState } from 'react'
import Image from 'next/image';
import MenuTile from '../component/menuTile';
import { useAppContext } from '../context/contextApi'; 
import FlyingButton from "react-flying-item";
import toast from 'react-hot-toast';




export default function Menu() {
const [categories, setCategories] = useState([]);
const [menuItem, setMenuItem] = useState([]);
const [extras, setExtras] = useState({});
 const [isLoading, setIsLoading] = useState(true);
const {addTOCart,setShowPopup,showPopup,setSize} = useAppContext() 

const handleAddToCartButtonClick = (item)=>{
 const hasOption = item.sizes.length > 0 || item.extraIngregdientPrices.length > 0  
 if(hasOption){
setSize(item.sizes?.[0])
setExtras(item)
setShowPopup(true)
 return; 
}
addTOCart(item);
setShowPopup(false);
  
}



 useEffect(()=>{

fetch("/api/categories").then((res) => {
  res.json()
  .then((data) => {
  setCategories(data?.getcategory || []);
  })
  .catch((error) => {
  console.log("something went wrong.", error);
    });
});


fetch("/api/MenuItemEndpoint")
  .then((resp) => resp.json())
  .then((result) => {
  setMenuItem(result.menuitems);
  setIsLoading(false)
  }).catch((error)=>{
    setIsLoading(false);
    console.log("something went wrong",error)
  });


  },[])


  function showAlert(item){
    if (!(item.sizes.length > 0 || item.extraIngregdientPrices.length > 0)){
     toast.success("Added to cart!");
   }

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
          {categories.length > 0 &&
            categories.map((c) => (
              <div key={c._id} className="mb-11">
                <h1 className="text-4xl font-bold text-[#f8341e] mb-4 text-center">
                  {c.name}
                </h1>
                <div className="lg:flex lg:flex-wrap lg:-m-4 grid sm:grid-cols-2 gap-0    md:grid-cols-3">
                  {menuItem
                    .filter((m) => m.category === c._id)
                    .map((item) => (
                      <div key={item._id} className="p-4 lg:w-1/3">
                        <div className="h-full bg-gray-200 hover:bg-white hover:shadow-lg cursor-pointer px-8 pt-8 pb-5 rounded-lg overflow-hidden text-center relative">
                          <div className="w-[170px] md:w-[150px] relative  mx-auto h-24 mb-3">
                            <Image
                              src={item.img}
                              alt={item.ItemName}
                              width={0}
                              height={0}
                              className="w-full h-full"
                              sizes="auto"
                              priority
                            />
                          </div>
                          <h1 className="title-font text-2xl font-bold line-clamp-1 text-gray-900 mb-3">
                            {item.ItemName}
                          </h1>

                          <p className=" line-clamp-3 font-sans mb-3 text-sm text-gray-600 font-medium">
                            {item.description}
                          </p>
                          <div className="relative flex items-center justify-center sm:justify-start  gap-5 ">
                            <div
                              onClick={() => handleAddToCartButtonClick(item)}
                              className="cursor-pointer w-full px-2  h-10 rounded-full hidden sm:flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none"
                            >
                              {item.sizes.length > 0 ||
                              item.extraIngregdientPrices.length > 0 ? (
                                <span className="line-clamp-1">
                                  Add to cart (from ${item.basePrice})
                                </span>
                              ) : (
                                <FlyingButton
                                  src={item.img}
                                  targetTop={"8%"}
                                  targetLeft={"84%"}
                                >
                                  <span className="line-clamp-1">
                                    Add to cart ${item.basePrice}
                                  </span>
                                </FlyingButton>
                              )}
                            </div>
                            <div
                              onClick={() => {handleAddToCartButtonClick(item),showAlert(item)}}
                              className="cursor-pointer w-full  px-2  h-10 rounded-full  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none sm:hidden  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 ... "
                            >
                              {item.sizes.length > 0 ||
                              item.extraIngregdientPrices.length > 0 ? (
                                <span className="line-clamp-1">
                                  Add to cart (from ${item.basePrice})
                                </span>
                              ) : (
                                  <span className="line-clamp-1">
                                    Add to cart ${item.basePrice}
                                  </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          <MenuTile onToCart={extras} />
        </section>
      )}
    </>
  );
}
