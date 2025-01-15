import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductData from "../ProductData";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import HomeCSS from "../css/home.module.css";
import WishlistEmpty from "../assets/emptyCart.svg";


function Wishlists() {
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("CartItems")) || [];
    return storedCartItems;
  });

  const user = JSON.parse(localStorage.getItem("userType"));
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
    if (wishlist.includes(productId)) {
      // To Remove the product from wishlist
      const updatedWishlist = wishlist.filter((id) => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      // Add product to wishlist
      const updatedWishlist = [...wishlist, productId];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Filtering the ProductData array to display only the wishlist products
  const wishlistProducts = ProductData.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className={HomeCSS.page}>
      <Header />
      <div
        className={
          wishlistProducts.length === 0
            ? HomeCSS.emptyContent
            : HomeCSS.filledContent
        }
      >
        
        {wishlistProducts.length === 0 ? (
          <div className={HomeCSS.emptyWishlistContainer}>
            <div className={HomeCSS.imageContainer}>
              <img
                src={WishlistEmpty}
                className={HomeCSS.emptyWishlistImage}
                alt="Empty Cart"
              />
            </div>
            <h1 className={HomeCSS.EmptyHeading}>
              Save your favorite here!
            </h1>
          </div>
        ) : (
          <div className={HomeCSS.wishlistContainer}>
            <div className={HomeCSS.productContainer}>
              {wishlistProducts.map((product) => (
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Wishlists;
