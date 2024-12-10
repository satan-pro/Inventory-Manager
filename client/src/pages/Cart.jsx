import { useState, useEffect, useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import Navbar from "../components/Navbar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import qr from "../assets/qr.jpg";
import { Update } from "@mui/icons-material";
import { useToast } from "@chakra-ui/react";
import trashIcon from "../assets/trash.png";

//const apiUrl = "https://inbiz.onrender.com";
const apiUrl = "http://localhost:3000";

function UserDetails({ setId, proceed, disp, steps, stepCount }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked");
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    proceed();
    steps();

    /* axios
      .post(`${apiUrl}/cart`, {
        cartData: formObject,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          props.proceed();
          props.steps();
          props.setId(null);
        }
      })
      .catch((err) => {
        console.log(err);
      }); */
  };
  return (
    <div
      className="flex flex-col gap-[20px]"
      style={{ display: disp ? "block" : "none" }}
    >
      <h1 className="text-2xl font-base">Enter your details</h1>
      <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
        <div className="flex gap-[20px]">
          <div className="flex flex-col gap-[10px] basis-[50%]">
            <input
              type="text"
              name="fname"
              className="p-4 border-2 rounded-md h-[50px] text-lg"
              placeholder="First Name"
            />
          </div>
          <div className="flex flex-col gap-[10px] basis-[50%]">
            <input
              type="text"
              name="lname"
              className="p-4 border-2 rounded-md h-[50px] text-lg"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div className="flex flex-col gap-[10px] basis-[70%]">
            <input
              type="text"
              name="contact"
              className="p-4 border-2 rounded-md h-[50px] text-lg"
              placeholder="Contact Number"
            />
          </div>
          <div className="flex flex-col gap-[10px] basis-[30%]">
            <input
              type="text"
              name="pincode"
              className="p-4 border-2 rounded-md h-[50px] text-lg"
              placeholder="Pincode"
            />
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div className="flex flex-col gap-[10px] basis-[50%]">
            <input
              type="text"
              name="address1"
              className="p-4 border-2 rounded-md h-[50px] text-lg"
              placeholder="Address Line 1"
            />
          </div>
          <div className="flex flex-col gap-[10px] basis-[50%]">
            <input
              type="text"
              name="address2"
              className="p-4 border-2 rounded-md h-[50px] text-lg"
              placeholder="Address Line 2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-[100px] bg-[#5B83D7] p-2.5 text-lg text-white rounded-md"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}

function Checkout(props) {
  function placeOrder() {
    axios
      .get(`${apiUrl}/cart/placeOrder`)
      .then((response) => {
        if (response.data.sucess) {
          console.log("succ");
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const toast = useToast();

  return (
    <div
      className="w-[90%] flex flex-col gap-[20px] mt-[20px]"
      style={{ display: props.disp ? "none" : "block" }}
    >
      <h1 className="text-3xl font-base">Payment Portal</h1>
      <div className="w-full h-fit flex flex-col items-center">
        <img src={qr} className="w-[40%]" />
      </div>
      <div className="flex justify-center p-5">
        <button
          className="w-fit bg-[#5B83D7] p-2.5 text-lg text-white rounded-md"
          onClick={() => {
            placeOrder();
            toast({
              title: "Order Placed.",
              description: "Thank you for ordering with us.",
              status: "success",
              duration: 8000,
              isClosable: true,
            });
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

function CartDetail({ key, item }) {
  const cartCtx = useContext(CartContext);

  function handleClick(value) {
    cartCtx.updateItems(item["product_id"], value);
  }

  return (
    <div className="w-full h-[100px] flex gap-[20px] justify-between">
      <img src={item["product_img"]} className="w-[100px] h-[100px] rounded-lg" />
      <div className="w-[50%] flex flex-col p-1 justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium">{item["product_name"]}</h1>
          <h2 className="text-sm font-light">{item["brand"]}</h2>
        </div>
        <h1 className="text-lg font-medium">Rs. {item["cost_price"]}</h1>
      </div>

      <div className="w-[30%] flex items-center justify-center gap-[5px]">
        <button
          className="px-2 text-xl font-medium"
          onClick={() => handleClick(-1)}
        >
          -
        </button>
        <div className="w-[30%] flex items-center justify-center text-lg">
          {item["quantity"]}
        </div>
        <button
          className="px-2 text-xl font-medium"
          onClick={() => handleClick(1)}
        >
          +
        </button>
      </div>

      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => cartCtx.deleteItem(item["product_id"])}
      >
        <img src={trashIcon} />
      </div>
    </div>
  );
}

function UpdateCart() {
  const cartCtx = useContext(CartContext);
  const cartData = cartCtx.items;
  /* useEffect(()=>{
    async function fetchCartData()
    {
      const response = await axios.get(`${apiUrl}/cart/${props.id}`);
      if(response.data.success)
      {
        setCartData(response.data.cartData);
      }
    }

    fetchCartData();
  },[]); */

  return (
    // <div className="flex flex-col p-5 gap-[20px]">
    //   <h1 className="text-2xl font-medium">Cart Details</h1>
    //   {cartData.map((item, index)=>{
    //     return(
    //       <div className="w=[80%] flex gap-[20px]" key={index}>
    //         <img src={item["PRODUCT_IMG"]} />
    //         <h1 className="text-xl font-base">{item["product_name"]}</h1>
    //       </div>
    //     )
    //   })}
    // </div>
    <div className="w-[40%] p-3 border-1">
      <h1 className="text-3xl font-medium mb-[20px]">Cart Details</h1>
      <div className="w-full flex flex-col gap-[30px] py-5 px-4 border-2 rounded-xl">
        {cartData.map((item, index) => (
          <>
            <CartDetail key={index} item={item} />
            <hr></hr>
          </>
        ))}
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">Total Amount:</p>
          <p className="text-xl font-base">
            Rs. {cartData.reduce(
              (acc, item) => acc + item["cost_price"] * item["quantity"],
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Body(props) {
  const steps = ["Select Products", "Add delivery Details", "Checkout"];

  const [stepCount, setStepCount] = useState(1);
  const [disp, setDisplay] = useState(true);

  const handleStepCount = () => {
    setStepCount(stepCount + 1);
  };

  return (
    <div className="w-full p-5 flex gap-[20px]">
      <div className="w-[70%] p-5 flex flex-col gap-[20px]">
        <Stepper activeStep={stepCount} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <UserDetails
          setId={(id) => setSessionId(id)}
          proceed={() => setDisplay(false)}
          disp={disp}
          steps={handleStepCount}
          stepCount={stepCount}
        />
        <Checkout disp={disp} />
      </div>
      <UpdateCart />
    </div>
  );
}

export default function Cart() {
  const [sessionId, setSessionId] = useState(null);
  return (
    <div className="w-screen min-h-screen overflow-scroll relative">
      <Navbar />
      <div className="flex p-5 px-[30px] pt-[100px] gap-[10%]">
        <Body />
      </div>
    </div>
  );
}
