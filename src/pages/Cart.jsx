import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ProductData from "../ProductData";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import CartCSS from "../css/cart.module.css";
import EmptyCart from "../assets/emptyCart.svg";
import { FaEdit,FaCheck } from "react-icons/fa"; // Importing an edit icon

function Cart() {
  const cartItemsIdsJSON = localStorage.getItem("CartItems");
  const cartItemsIds = JSON.parse(cartItemsIdsJSON) || [];

  const [cartItems, setCartItems] = useState(
    ProductData.filter((product) => cartItemsIds.includes(product.id))
  );

  const handleIncrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleDecrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleRemove = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const updateLocalStorage = (items) => {
    const itemIds = items.map((item) => item.id);
    localStorage.setItem("CartItems", JSON.stringify(itemIds));
  };

  const getSubTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalAmount = () => {
    return getSubTotalAmount() + 99;
  };

  const [ProceedToCheckout, setProceedToCheckout] = useState(true);

  const handleProceedToCheck = () => {
    setProceedToCheckout(false);
    // toast.info("Confirm the delivery address!");
  };

  const [address, setAddress] = useState(localStorage.getItem("Address") || "");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleConfirmClick = () => {
    localStorage.setItem("Address", address);
    setIsEditMode(false);
    toast.success("Address Updated!");
  };

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const navigate = useNavigate();
  const handleOrderBtn = () => {
    toast.success("Order Placed! Thank you!");
    localStorage.removeItem("CartItems");
    navigate("/home");
  };

  return (
    <div className={CartCSS.mainContainer}>
      <Header />

      {cartItems.length === 0 ? (
        <div className={CartCSS.EmptyCartContainer}>
          <div className={CartCSS.imagecontainer}>
            <img
              src={EmptyCart}
              className={CartCSS.emptycart}
              alt="Empty Cart"
            />
          </div>
          <h1 align="center" style={{ color: "var(--darkred)" }}>
            Oops! Your cart is empty, shop Now!
          </h1>
        </div>
      ) : (
        <div className={CartCSS.Container}>
          {cartItems.map((product) => (
            <div key={product.id} className={CartCSS.card}>
              <div className={CartCSS.image}>
                <img src={product.img} alt={product.title} />
              </div>
              <div className={CartCSS.details}>
                <h2 className={CartCSS.title}>{product.title}</h2>
                <p className={CartCSS.price}>
                  <b>₹{product.price}.00</b>
                </p>
                <p className={CartCSS.instock}>In Stock</p>

                <div className={CartCSS.quantityControls}>
                  <div className={CartCSS.quantityBack}>
                    <button
                      className={CartCSS.quantityBtn}
                      onClick={() => handleDecrement(product.id)}
                    >
                      -
                    </button>
                    <span className={CartCSS.quantity}>{product.quantity}</span>
                    <button
                      className={CartCSS.quantityBtn}
                      onClick={() => handleIncrement(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className={CartCSS.removeButton}
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={CartCSS.amountContainer}>
            <h2 className={CartCSS.subamount}>
              Sub Total: ₹{getSubTotalAmount()}
            </h2>
            <p className={CartCSS.shipping}>Shipping Charges: ₹99</p>
            <div className={CartCSS.deliveryeditandtitle}>
              <h2 className={CartCSS.deliveryaddresstitle}>Delivery Address:</h2>
            <FaEdit
                  className={CartCSS.editIcon}
                  onClick={handleEditClick}
                  title="Edit Address"
                />
            </div>

            {!isEditMode ? (
              <div className={CartCSS.addressContainer}>
                <p className={CartCSS.deliveryaddress}>{address}</p>
               
              </div>
            ) : (
              <div className={CartCSS.editAddressContainer}>
                <input
                  type="text"
                  value={address}
                  onChange={handleInputChange}
                  className={CartCSS.inputAddress}
                  placeholder="Enter new address"
                />
                {/* <button
                  onClick={handleConfirmClick}
                  className={CartCSS.confirmBtn}
                >
                  Confirm
                </button> */}
                <FaCheck
                  className={CartCSS.confirmBtn}
                  onClick={handleConfirmClick}
                  title="confirm"
                />
              </div>
            )}

            <span className={CartCSS.amountline}></span>
            <h1 className={CartCSS.totalamount}>
              Total Amount: ₹{getTotalAmount()}
            </h1>
            <span className={CartCSS.amountline}></span>

            {ProceedToCheckout ? (
              <button
                className={CartCSS.checkout}
                onClick={handleProceedToCheck}
              >
                Checkout
              </button>
            ) : (
              <button className={CartCSS.orderBtn} onClick={handleOrderBtn}>
                Place Order
              </button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
