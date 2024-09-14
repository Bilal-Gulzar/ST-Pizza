"use client"
import { createContext,useContext, useEffect,useState } from "react";
import { useParams,usePathname } from "next/navigation";
import { Underdog } from "next/font/google";
import PreviousMap from "postcss/lib/previous-map";
var jwt = require("jsonwebtoken");


const AppContext = createContext();

export function AppWrapper({children}){
const param = useParams()
const Pathname = usePathname()
const [token,setToken]=useState(null)
const [name,setName]= useState('')
const [showPopup,setShowPopup] = useState(false)
const [cartProducts,setCartProducts] = useState([])
const [size, setSize] = useState(undefined);

useEffect(()=>{

  try{
  if(is && is.getItem('cart')){

setCartProducts(JSON.parse(is.getItem('cart')))
  }


}catch(error){
console.log(error)
clearcart()
}
},[])

const is = typeof window !== "undefined"? window.localStorage : null; 

function saveCartProductToLocalStorage(Foodmenus) {
  if (is) {
    is.setItem("cart", JSON.stringify(Foodmenus));
  }
}

const addTOCart = (menu,size=null,extras=[])=>{
setCartProducts(prev => {
const CartItem = {...menu,size,extras}
const newCartproduct = [...prev,CartItem]
saveCartProductToLocalStorage(newCartproduct)
return newCartproduct;
})
}

function clearcart(){
saveCartProductToLocalStorage([])
setCartProducts([])
}

function removeMenuFromCart(indexToRemove){
setCartProducts(previousCart =>{

const removeItem  = previousCart.filter((v,index)=> index !== indexToRemove)
saveCartProductToLocalStorage(removeItem);

return removeItem;

})


}


useEffect(() => {
const token = localStorage.getItem("token");
  if (token) {
    const jwtToken = localStorage.getItem("token");
    fetch (`/api/updateProfile?token=${jwtToken}`).then((res)=>{
      res.json().then((data)=>{
        setName(data.Userdata?.name)
      })
    })
   setToken(jwtToken);
  }
 const checkTokenAndLogout = () => {
   // Check if token is absent or expired
   if (!token || jwt.decode(token).exp * 1000 < Date.now()) {
     localStorage.removeItem("token");
     setToken(null);
   }
 };

 checkTokenAndLogout();

}, [param,Pathname]);




 return (
    <AppContext.Provider
        value={{token,setToken,name,showPopup,cartProducts,size,setSize,clearcart ,setShowPopup,addTOCart,removeMenuFromCart,clearcart}}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext(){
  return useContext(AppContext);
}


