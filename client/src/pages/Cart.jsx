import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import qr from "../assets/qr.jpg";
import { Update } from "@mui/icons-material";

function UserDetails(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked");
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    axios
      .post("http://localhost:3000/cart", {
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
      });
  };
  return (
    <div
      className="flex flex-col gap-[20px]"
      style={{ display: props.disp ? "block" : "none" }}
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
          <button type="submit" className="w-[100px] bg-[#5B83D7] p-2.5 text-lg text-white rounded-md">
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}

function Checkout(props) {

  function placeOrder()
  {
    axios.get("http://localhost:3000/placeOrder").then((response)=>{
      if(response.data.sucess)
      {
        console.log('succ');
        window.location='/';
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="w-[90%] flex flex-col gap-[20px] mt-[20px]" style={{display:props.disp?"none":"block"}}>
      <h1 className="text-3xl font-base">Payment Portal</h1>
      <div className="w-full h-fit flex flex-col items-center">
        <img src={qr} className="w-[40%]" />
      </div>
      <div className="flex justify-center p-5">
      <button className="w-fit bg-[#5B83D7] p-2.5 text-lg text-white rounded-md" onClick={()=>placeOrder()}>
            Place Order
          </button>
      </div>
    </div>
  );
}

function UpdateCart(props)
{
  const [cartData, setCartData] = useState([]);
  useEffect(()=>{
    async function fetchCartData()
    {
      const response = await axios.get(`http://localhost:3000/cart/${props.id}`);
      if(response.data.success)
      {
        setCartData(response.data.cartData);
      }
    }

    fetchCartData();
  },[]);

  return (
    <div className="flex flex-col p-5 gap-[20px]">
      <h1 className="text-2xl font-medium">Cart Details</h1>
      {cartData.map((item, index)=>{
        return(
          <div className="w=[80%] flex gap-[20px]" key={index}>
            <img src={item["PRODUCT_IMG"]} />
            <h1 className="text-xl font-base">{item["PRODUCT_NAME"]}</h1>
          </div>
        )
      })}
    </div>
  )
}

function Body(props) {
  const steps = ["Select Products", "Add delivery Details", "Checkout"];
  let stepCount = 1;

  useEffect(()=>{
    props.setId(sessionId);
  });

  const [disp, setDisplay] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  function handleStepCount() {
    stepCount += 1;
    console.log(stepCount);
  }

  function getStepCount()
  {
    return stepCount;
  }

  return (
    <div className="w-[70%] p-5 flex flex-col gap-[20px]">
      <Stepper activeStep={stepCount} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <UserDetails
        setId={(id)=>setSessionId(id)}
        proceed={() => setDisplay(false)}
        disp={disp}
        steps={()=>handleStepCount}
      />
      <Checkout disp={disp} 
      />
    </div>
  );
}

export default function Cart() {
  const [sessionId, setSessionId] = useState(null);
  return (
    <div className="w-screen h-screen overflow-scroll relative">
      <Navbar />
      <div className="flex p-5 px-[100px] pt-[100px] gap-[10%]">
        <Body setId={(id)=>setSessionId(id)}/>
        
      </div>
    </div>
  );
}
