import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import navbarItems from "../../Components/NavbarItems";
import CartLength from "../../Components/CartLength";

const Navbar = ({ toggle }) => {
  return (
    <nav>   
      <Link to="/" className="link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-tabler icon-tabler-brand-edge"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M20.978 11.372a9 9 0 1 0 -1.593 5.773"></path>
          <path d="M20.978 11.372c.21 2.993 -5.034 2.413 -6.913 1.486c1.392 -1.6 .402 -4.038 -2.274 -3.851c-1.745 .122 -2.927 1.157 -2.784 3.202c.28 3.99 4.444 6.205 10.36 4.79"></path>
          <path d="M3.022 12.628c-.283 -4.043 8.717 -7.228 11.248 -2.688"></path>
          <path d="M12.628 20.978c-2.993 .21 -5.162 -4.725 -3.567 -9.748"></path>
        </svg>
        Products
      </Link>
      <div className="menu-items">
       <>
      {navbarItems.map((item, index) => (
          <Link className="link" to={item.link} key={index}>
          
              {item.isCart ? (
                <>
                  {item.title} <CartLength />
                </>
              ) : (
                item.title
              )}

          </Link>
        ))
    }
    </> 
      </div>
      <div className="icons">
        <div className="mobile-menu-icon">
          <FaBars onClick={toggle} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;