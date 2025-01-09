import React, { useState, useEffect } from "react";
import ProductData from "../ProductData";
import { toast } from "react-toastify";
import HomeCSS from "../css/home.module.css";
import DATA from "../ProductData";

const Products = () => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return storedWishlist;
  });

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("CartItems")) || [];
    return storedCartItems;
  });

  const user = JSON.parse(localStorage.getItem("userType"));
  const HeroImg = DATA[0].img

  function cartHandle(productId) {
    if (user === null) {
      toast.error("Please Login First!");
    } else if (user === "guest") {
      toast.warning("Please Login as User!");
    } else {
      if (!cartItems.includes(productId)) {
        const updatedCartItems = [...cartItems, productId];
        setCartItems(updatedCartItems);
        localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
        toast.success("Successfully added to cart!");
      } else {
        toast.info("Product is already in the cart.");
      }
    }
  }

  const handleWishlistToggle = (productId) => {
    if (user === null) {
      toast.error("Please login first!");
    } else {
      if (wishlist.includes(productId)) {
        const updatedWishlist = wishlist.filter((id) => id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast.info("Product removed from wishlist!");
      } else {
        const updatedWishlist = [...wishlist, productId];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast.info("Product added to wishlist!");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className={HomeCSS.mainDiv}>
      <div className={HomeCSS.HeroSection}>
        <h1 style={{fontSize:'10rem', color: '#FDF8FB'}}>Bale Bale!<br/>Coffee Parka!</h1>
        <img src={HeroImg} className={HomeCSS.heroImg} alt='heroimg'/>
      </div>
    <h1 align="center" className={HomeCSS.heading}>Extraordinary coffee for extraordinary people</h1>

      <div className={HomeCSS.productContainer}>
        {ProductData.map((product) => (
          <div key={product.id} className={HomeCSS.productCard}>
            <img
              src={product.img}
              className={HomeCSS.productImg}
              alt={product.title}
            />
            <div className={HomeCSS.productTitlePriceDiv}>
              <h2 className={HomeCSS.title}>{product.title}</h2>
              <p className={HomeCSS.price}>
                Price: ₹<b>{product.price}</b>
              </p>
              <h2 className={HomeCSS.desc}>{product.desc}</h2>

              <div className={HomeCSS.cartDiv}>
                <button
                  className={HomeCSS.wishlistBtn}
                  onClick={() => handleWishlistToggle(product.id)}
                >
                  {wishlist.includes(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>

                {!cartItems.includes(product.id) && (
                  <button
                    className={HomeCSS.cartBtn}
                    onClick={() => cartHandle(product.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
