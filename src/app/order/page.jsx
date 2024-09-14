"use client"
import React, { useEffect,useState } from 'react'
import Tabs from '../component/tabs';
import TabsForNotAdmin from '../component/tabsForNotAdmin';
import { usePathname, useRouter } from "next/navigation";
import { BsEmojiNeutral } from "react-icons/bs";
var jwt = require('jsonwebtoken')
import { decode } from 'jsonwebtoken';

export default function OrdersPage() {
  const Pathname = usePathname();
  const router = useRouter(); 
  const [orders, setOrders] = useState([]);
  const [isAdmin,setIsAdmin] = useState(false)
 const [isLoading, setIsLoading] = useState(true);

useEffect(()=>{
  setIsLoading(true)
const jwtToken = localStorage.getItem('token')
if (jwtToken) {
  fetch("/api/orders?mail=" + jwtToken)
  .then((res) => res.json())
  .then((data) => {setOrders(data.reverse()) ,setIsLoading(false)})
    .catch((error) => {console.log("somthing went wrong" + error),setIsLoading(false)});
} else {
  router.push("/");
}

  if (jwtToken){
    let decode = jwt.decode(jwtToken);
    let email = decode.email;

    fetch("/api/isAdmin?mail=" + email)
      .then((res) => res.json())
      .then((admin)=>setIsAdmin(admin));
  }
},[])


function showOrderDetail(id){

router.push('/order/'+id)
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
      {isAdmin ? <Tabs path={Pathname} /> : <TabsForNotAdmin path={Pathname} />}{" "}
      {orders.length === 0 && (
        <div className="flex tracking-wide flex-col pb-20 gap-5 justify-center items-center text-3xl mt-24 font-bold text-[#f8341e]">
          {" "}
          No Order Found...
          <div>
            <BsEmojiNeutral className="text-[#f8341e] size-24" />
          </div>
        </div>
      )}
      <div className="flex flex-col mt-12 gap-4">
        {orders?.length > 0 &&
          orders.map((x) => (
            <div
              key={x._id}
              className="sm:w-[36rem] gap-5 lg:gap-9 mx-5 sm:mx-auto flex  flex-col  sm:flex-row items-center justify-between  lg:w-[46rem] border py-2.5 px-4 shadow-sm  bg-gray-100  font-semibold rounded-lg  "
            >
              <div className="sm:block hidden">
                <button
                  className={`${
                    x.paid ? "bg-green-500" : "bg-red-400"
                  } border-gray-400 text-white w-[88px] py-2 rounded-md  flex justify-center items-center font-sans font-semibold  tracking-wide outline-none`}
                >
                  {x.paid ? "Paid" : "Not paid"}
                </button>
              </div>
              <div className="grow  sm:pt-0 pt-3 ">
                <div className="flex gap-4 justify-between items-center">
                  <div>{x.UserEmail}</div>
                  <div className="text-gray-500 text-sm">
                    {x.createdAt.replace("T", " ").substring(0, 16)}
                  </div>
                </div>
                {/* <div className='flex'> */}
                <div className="text-gray-500 text-sm line-clamp-1">
                  {x.cartProducts.map((p) => p.ItemName).join(", ")}
                </div>
                {/* </div> */}
              </div>
              <div className="flex gap-4 sm:gap-0  pb-1 sm:pb-0 ">
                <div className="sm:hidden block">
                  <button
                    className={`${
                      x.paid ? "bg-green-500" : "bg-red-400"
                    } border-gray-400 text-white w-[88px] py-2 rounded-md  flex justify-center items-center font-sans font-semibold  tracking-wide outline-none`}
                  >
                    {x.paid ? "Paid" : "Not paid"}
                  </button>
                </div>
                <button
                  onClick={() => showOrderDetail(x._id)}
                  className="bg-gray-100 border-gray-400 border text-gray-900  px-3 py-2 rounded-lg flex justify-center items-center font-sans font-bold  outline-none"
                >
                  Show&nbsp;order
                </button>
              </div>
            </div>
          ))}
      </div>
      </section>
      }
    </> 
  );
}
