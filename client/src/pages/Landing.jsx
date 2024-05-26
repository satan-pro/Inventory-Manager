import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

function Query(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/query/${props.type}`)
      .then((response) => {
        setCategories(response.data.queryRes);
        console.log(categories);
      });
  }, []);

  return (
    <div className="px-[20px] font-light">
      {categories.map((elem, index) => {
        return (
          <div className="flex items-center gap-[10px] m-[10px]" key={index}>
            <input type="checkbox" />
            {props.type === "category" ? (
              <h1 className="text-lg">{elem["product_category"]}</h1>
            ) : props.type === "supplier" ? (
              <h1 className="text-lg">{elem["supplier_name"]}</h1>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function Filters() {
  return (
    <div className="w-[20%]">
      <div className="p-5 border-b-2">
        <h1 className="text-2xl mb-[10px]">Categories</h1>
        <Query type="category" />
      </div>
      <div className="p-5 border-b-2">
        <h1 className="text-2xl mb-[10px]">Price</h1>
        <div className="px-[20px] font-light">
          <div className="flex items-center gap-[10px] m-[10px]">
            <input type="checkbox" />
            <h1 className="text-lg">Less than ₹500</h1>
          </div>
          <div className="flex items-center gap-[10px] m-[10px]">
            <input type="checkbox" />
            <h1 className="text-lg">₹500 - ₹1000</h1>
          </div>
          <div className="flex items-center gap-[10px] m-[10px]">
            <input type="checkbox" />
            <h1 className="text-lg">₹1000 - ₹1500</h1>
          </div>
          <div className="flex items-center gap-[10px] m-[10px]">
            <input type="checkbox" />
            <h1 className="text-lg">₹1500 - ₹2000</h1>
          </div>
        </div>
      </div>
      <div className="p-5 border-b-2">
        <h1 className="text-2xl mb-[10px]">Supplier</h1>
        <Query type="supplier" />
      </div>
    </div>
  );
}

function ProductCard(props) {
  const [btnClick, setBtnClick] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  function closeSnackbar() {
    setOpenSnackbar(false);
  }

  function handleClick(){
    console.log('clciked');
    axios.get(`http://localhost:3000/cart/${props.item["product_id"]}`).then((response)=>{
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="flex flex-col w-[30%] h-fit">
      <img src={props.item["product_img"]} className="size-full" />
      <div className="flex py-5 justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium">{props.item["product_name"]}</h1>
          <h1 className="text-base font-light">{props.item["brand"]}</h1>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-2xl font-medium">₹{props.item["cost_price"]}</h1>
          <h1 className="text-sm font-base text-blue-400">
            {props.item["quantity"]} left
          </h1>
        </div>
      </div>

      <button
        className="w-full p-2.5 bg-[#5B83D7] text-white rounded-md"
        style={{ backgroundColor: btnClick ? "#A1B8E8" : "#5B83D7" }}
        onClick={() => {
          handleClick();
          setBtnClick(true);
          setOpenSnackbar(true);
          setSnackbarMsg(`${props.item["product_name"]} added to cart`);
        }}
      >
        {btnClick ? "Added" : "Add to Cart"}
      </button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbarMsg}
      />
    </div>
  );
}

function ProductDisplay(props) {
  const [products, getProducts] = useState([]);
  const [tempCart, setTempCart] = useState([]);

  function cartUpdate(item)
  {
    setTempCart((prev)=>{
      return [...prev,item];
    });
    props.addToCart(tempCart);
  }

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      getProducts(response.data);
    });
  }, []);

  return (
    <div className="flex flex-wrap p-5 w-[70%] gap-[30px]">
      {products.map((product, index) => {
        return <ProductCard key={index} item={product} addItem={(item)=>cartUpdate(item)}/>;
      })}
    </div>
  );
}

export default function Landing() {
  const [cart, setCart] = useState([]);
  function cartUpdate(temp)
  {
    setCart((prev)=>{
      return [...prev,temp];
    });
    console.log(cart);
  }
  return (
    <div className="w-screen h-screen flex flex-col overflow-scroll relative bg-[#F4F6FA]">
      <Navbar />
      <div className="flex p-5 px-[100px] pt-[100px] gap-[10%]">
        <Filters />
        <ProductDisplay addToCart={(tempCart)=>cartUpdate(tempCart)}/>
      </div>
    </div>
  );
}
