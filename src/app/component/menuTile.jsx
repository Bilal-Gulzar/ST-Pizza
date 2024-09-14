import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useAppContext } from "../context/contextApi"; 
import FlyingButton from "react-flying-item";
import { resolve } from 'styled-jsx/css';


export default function MenuTile({onToCart}) {
  const {addTOCart,showPopup,setShowPopup,setSize,size} = useAppContext(); 
  const [extraIngre,setExtraIngre] = useState([])
  
  const selectIngredients = (evt,extraThing) => {
    let checked  =  evt.target.checked
   if(checked){
   setExtraIngre(prev =>{
  const addExtra = [...prev,extraThing]
  return addExtra
   })
  }
  else{

   setExtraIngre(prev =>{
 return prev.filter((x)=> x.name !== extraThing.name)
   })

  }
}


let selectPrice = onToCart?.basePrice;
if(size){
selectPrice  += size?.extraPrice; 
}

for(let item of extraIngre){
 selectPrice += item.extraPrice
}

const handleCart = async ()=>{
let SelectedMenu = {ItemName:onToCart.ItemName,img:onToCart.img,description:onToCart.description,basePrice:selectPrice,_id:onToCart._id}
addTOCart(SelectedMenu,size,extraIngre)
await new Promise(resolve => setTimeout(resolve,1000))
setShowPopup(false)
}



  return (
    <>
      {showPopup && (
        <div className="max-w-[900px]">
          <div className="bg-black/80 flex  justify-center inset-0 fixed ">
            <div className="w-[75vw] sm:w-[24rem] rounded-lg   my-14  sm:mt-9 sm:mb-5 lg:w-[27rem] flex  px-3 h-auto bg-white">
              <div className="overflow-y-auto flex-col gap-6 flex pb-3  px-3 pt-7">
                <div className="w-[150px] sm:w-[170px] lg:w-[280px] md:w-[150px] mx-auto relative min-h-40 lg:min-h-56">
                  <Image
                    src={onToCart?.img}
                    fill
                    className="w-full h-full"
                    alt="pizza"
                    sizes="auto"
                    priority
                    // quality={100}
                  />
                </div>
                <p className="text-center -mt-4 text-xl font-semibold">
                  {onToCart?.ItemName}
                </p>
                <div className=" -mt-2 mb-4">
                  <p className="font-sans text-sm text-center ">
                    {onToCart?.description}
                  </p>
                </div>
                {onToCart?.sizes.length > 0 && (
                  <p className="text-center font-sans  font-semibold">
                    Pick your size
                  </p>
                )}
                <div className="flex flex-col gap-1.5 -mt-3">
                  {onToCart?.sizes.length > 0 &&
                    onToCart.sizes?.map((v) => (
                      <div
                        key={v._id}
                        className="p-2.5 border-gray-300 border rounded-md "
                      >
                        <label className="text-gray-700  font-sans">
                          <input
                            type="radio"
                            checked={v.name === size?.name}
                            onChange={(evt) => {
                              setSize(v);
                            }}
                            name="size"
                            className="accent-blue-600"
                          />
                          &nbsp; {v.name} $
                          {parseInt(onToCart.basePrice) +
                            parseInt(v.extraPrice)}
                        </label>
                      </div>
                    ))}
                </div>
                {onToCart?.extraIngregdientPrices.length > 0 && (
                  <>
                    <p className="text-center font-sans  font-semibold">
                      Any extras?
                    </p>
                    <div className="flex flex-col gap-2 -mt-3">
                      {onToCart.extraIngregdientPrices.map((extra, index) => (
                        <div
                          key={index}
                          className="p-2.5 border-gray-300 border rounded-md "
                        >
                          <label className="text-gray-700">
                            <input
                              type="checkbox"
                              name={extra.name}
                              onChange={(evt) => selectIngredients(evt, extra)}
                              className="accent-blue-600"
                            />
                            &nbsp; {extra.name}+${extra.extraPrice}
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="gap-3 flex flex-col">
                  <div
                    onClick={() => {
                      handleCart();
                    }}
                    className="cursor-pointer py-1.5 min-h-10 rounded-lg  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none text-lg"
                  >
                <FlyingButton src={onToCart.img} targetTop={'10%'} targetLeft={'84%'}>
                    Add to cart ${selectPrice}
                        </FlyingButton>
                  </div>

                  <div
                    onClick={() => setShowPopup(false)}
                    className="cursor-pointer min-h-10 flex items-center justify-center border py-1.5 px-4 shadow-sm border-gray-300  font-semibold rounded-lg"
                  >
                    <p className="font-sans font-bold">Cancel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
