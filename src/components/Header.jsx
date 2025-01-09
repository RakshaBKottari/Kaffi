import React from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "../css/header.module.css";
import { FaUser } from "react-icons/fa";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {

  // Get cart items from local storage to display the count on cart icon badge
  const CartItemsJSON = localStorage.getItem("CartItems");
  const CartItems = JSON.parse(CartItemsJSON) || [];
  const CartItemsLength = CartItems.length;

 

  return (
    <>
      <header className={HeaderCSS.header}>
        <div>
          <Link to="/home" className={HeaderCSS.logotext}>
          Kaffi 
          </Link>
        </div>
        
        <ul
          className={HeaderCSS.ulist}
        >
          <li className={HeaderCSS.list}>
            <Link to="/home" className={HeaderCSS.atag}>
              HOME
            </Link>
          </li>
          <li className={HeaderCSS.list}>
            <Link to="/wishlists" className={HeaderCSS.atag}>
              WISHLIST
            </Link>
          </li>
          <li className={HeaderCSS.list}>
            <Link to="/login" className={HeaderCSS.atag}>
              <FaUser className={HeaderCSS.register_icon} />
            </Link>
          </li>
          <li className={HeaderCSS.list}>
            <Link to="/cart" className={HeaderCSS.atag}>
                <Badge badgeContent={CartItemsLength} color="primary">
                  <ShoppingCartIcon />
                </Badge>
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
