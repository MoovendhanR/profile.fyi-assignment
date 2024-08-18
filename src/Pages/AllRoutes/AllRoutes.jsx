import { Route, Routes } from "react-router-dom";
import Cart from "../Cart/Cart";
import Products from "../Products/Products";

const AllRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    )

    
}
export default AllRoutes;