import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/shopping-cart-context";
import Navbar from "../components/Navbar";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

//const apiUrl = "https://inbiz.onrender.com";
const apiUrl = "http://localhost:3000";

function Query(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/products/query/${props.type}`)
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

function ProductCard({ key, item }) {
  const [btnClick, setBtnClick] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const cartCtx = useContext(CartContext);

  function closeSnackbar() {
    setOpenSnackbar(false);
  }

  function handleClick(){
    console.log('clciked');
    cartCtx.addItemsToCart({...item, quantity:1});
  }

  return (
    <div className="flex flex-col w-[30%] h-fit">
      <img src={item["product_img"]} className="size-full" />
      <div className="flex py-5 justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium">{item["product_name"]}</h1>
          <h1 className="text-base font-light">{item["brand"]}</h1>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-2xl font-medium">₹{item["cost_price"]}</h1>
          <h1 className="text-sm font-base text-blue-400">
            {item["quantity"]} left
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
          setSnackbarMsg(`${item["product_name"]} added to cart`);
        }}
        disabled={btnClick}
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

function ProductDisplay() {
  const [products, getProducts] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/products`).then((response) => {
      getProducts(response.data);
    });
  }, []);

  return (
    <div className="flex flex-wrap p-5 w-[70%] gap-[30px]">
      {products && products.map((product, index) => {
        return <ProductCard key={index} item={product}/>;
      })}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-scroll relative bg-[#F4F6FA]">
      <Navbar />
      <div className="flex p-5 px-[100px] pt-[100px] gap-[10%]">
        <Filters />
        <ProductDisplay/>
      </div>
    </div>
  );
}
