import { Route, Routes } from "react-router-dom";
import Cart from "../Cart/Cart";
import Products from "../Products/Products";
import Checkout from "../../Components/Checkout";

const AllRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>

        </Routes>
    )

    
}
export default AllRoutes;