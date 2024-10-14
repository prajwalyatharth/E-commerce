import React from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete functions for deleting
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-page container my-4">
      <Toaster />
      <div className="row">
        <h1>Your Cart</h1>
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4>
            {cart?.length > 0
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : "your cart is empty"}
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cart?.map((p) => (
            <div className="row m-2 p-2 card flex-row">
              <div className="col-md-4 ">
                <img
                  src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
              </div>
              <div className="col-md-8">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">Rs {p.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeCartItem(p._id);
                    toast.success("Item is removed from cart");
                  }}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Cart Summary</h4>
          <p> total Checkout payment</p>
          <hr />
          <h5>Total : {totalPrice()}</h5>
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <h4>current address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate(`/dashboard/user/profile`)}
                >
                  Update address
                </button>
              </div>
            </>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate(`/dashboard/user/profile`)}
                >
                  {" "}
                  update Address
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning"
                  onClick={() =>
                    navigate(`/login`, {
                      state: "/cart",
                    })
                  }
                >
                  Please login to checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
