import { Add, EditOutlined, SearchRounded } from "@mui/icons-material";
import { AddSharp, CloseRounded,  DataUsage } from "@mui/icons-material";
import {
  ProductFilled,
  InboxOutlined,
  ShoppingFilled,
  TruckFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import shoe from "../assets/shoe.png";
import laptop from "../assets/laptop.png";
import backpack from "../assets/backpack.png";
import smartwatch from "../assets/smartwatch.png";
import ps5 from "../assets/ps5.png";
import lamp from "../assets/lamp.png";
//import { PieChart } from "@mui/x-charts";
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";
import "animate.css";
import axios from "axios";

const apiUrl = "https://inbiz.onrender.com";
//const apiUrl = "http://localhost:3000";

function refreshPage()
{
  window.location.reload();
}

function Heading(props) {
  return (
    <div className="w-full p-5 pb-[20px] flex items-center justify-between">
      <h1 className="text-4xl">Products</h1>
      <div className="w-[30%] h-[40px] border-2 rounded-md flex flex-row p-3 justify-between items-center bg-[#E5E9F0]">
        <SearchRounded sx={{ fontSize: 30 }} className="text-gray-400" />
        <input
          type="text"
          className="basis-[85%] h-[20px] bg-[#E5E9F0] focus:border-0 focus:outline-0 text-gray-400 focus:text-gray-700"
          placeholder="Search here.."
        />
      </div>
      <div className="flex gap-[20px]">
      <button
        className="bg-[#5B83D7] w-fit h-[50px] text-slate-50 rounded-md flex items-center p-[15px] font-medium"
        onClick={props.addProdHandle}
      >
        <AddSharp />
        New Product
      </button>
      <button
        className="bg-[#5B83D7] w-fit h-[50px] text-slate-50 rounded-md flex items-center p-[15px] font-medium gap-[10px]"
        onClick={props.handleStats}
      >
        <DataUsage />
        Stats
      </button>
      </div>
    </div>
  );
}

function AddProduct(props) {
  return (
    <div
      className="w-[30%] h-screen z-20 flex flex-col p-10 pt-[50px] fixed top-0 right-0 bg-[#FFFFFF] overflow-scroll animate__animated animate__slideInRight"
      style={{ display: props.open ? "block" : "none" }}
    >
    <div className="flex flex-row items-center justify-between mb-[20px]">
        <h1 className="text-4xl">Add Product</h1>
        <CloseRounded
          fontSize="large"
          className="cursor-pointer"
          onClick={props.onClose}
        />
      </div>
      <form action="https://inbiz.onrender.com/products" method="POST" encType="multipart/form-data" className="flex flex-col">
        <h1 className="text-xl">Product Id</h1> 
        <input type="text" name="pid" className="border-2 border-text-gray-400 m-[10px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Product Name</h1>
        <input type="text" name="pname" className="border-2 border-text-gray-400 m-[10px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Brand</h1>
        <input type="text" name="brand" className="border-2 border-text-gray-400 m-[10px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Category</h1>
        <input type="text" name="category" className="border-2 border-text-gray-400 m-[10px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Supplier Id</h1>
        <input type="text" name="supplier_id" className="border-2 border-text-gray-400 m-[10px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Price</h1>
        <input type="number" name="price" className="border-2 border-text-gray-400 m-[10px] w-[50%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Quantity</h1>
        <input type="number" name="quantity" className="border-2 border-text-gray-400 m-[10px] w-[50%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Add image</h1>
        <input
          type="file"
          accept=".jpn,.png,.jpeg"
          className="border-2 m-[10px] w-[50%] mb-[20px]"
          name="image"
        />
        <button type="submit" name="submit" value="submit" className="w-fit h-[50px] p-5 bg-[#5B83D7] rounded-lg text-slate-100 font-medium flex items-center">
          Save Changes
        </button>
      </form>
    </div>
  );
}

function ProductModal(props) {

  const [delProd, setDelProd] = useState(false);

  const handleSubmit = (event) =>{
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    axios.post(`${apiUrl}/products/update/${props.obj["product_id"]}`,{
      prodData:formObject
    }).then((response)=>{
      console.log(response);
      props.onClose();
      refreshPage();
    }).catch((err)=>{
      console.error(err);
    });
  }

  if(delProd)
  {
    axios.post(`${apiUrl}/products/delete/${props.obj["product_id"]}`)
    .then((response)=>{
      console.log(response);
      props.onClose();
      refreshPage();
    }).catch(err=>{
      console.error(err);
    });
  }

  return (
    <aside
      className="w-[25%] h-screen z-10 flex flex-col p-10 pt-[50px] fixed top-0 right-0 bg-[#FFFFFF] animate__animated animate__slideInRight"
      style={{ display: !props.close ? "none" : "block" }}
    >
      <div className="flex flex-row items-center justify-between mb-[20px]">
        <h1 className="text-4xl">Preview</h1>
        <CloseRounded
          fontSize="large"
          className="cursor-pointer"
          onClick={() => props.onClose()}
        />
      </div>
      <div className="flex flex-col mb-[20px]">
        <h1 className="text-right cursor-pointer text-blue-500 mb-[10px]">
          Edit <EditOutlined />
        </h1>
        <img
          src={props.obj["product_img"]}
          className="w-[50%] h-[50%] rounded-xl mx-auto"
        />
      </div>
      <form  onSubmit={handleSubmit}>
      <div className="mb-[10px]">
        <h1 className="text-sm font-light mb-[5px]">Product Name</h1>
        <input
          type="text"
          className="text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg"
          name="pname"
          defaultValue={props.obj["product_name"]}
        />
      </div>
      <h1 className="text-sm font-light mb-[5px]">Brand</h1>
      <input
        type="text"
        className="max-w-[50%] text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg mb-[10px]"
        name="brand"
        defaultValue={props.obj["brand"]}
      />
      <div className="flex flex-row justify-between mb-[20px]">
        <div className="flex flex-col">
          <h1 className="text-sm font-light mb-[5px]">Price (Rs.)</h1>
          <input
            type="number"
            className="w-[150px] text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg mb-[10px]"
            name="price"
            defaultValue={props.obj["cost_price"]}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-light mb-[5px]">Quantity</h1>
          <input
            type="number"
            className="w-[150px] text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg mb-[10px]"
            name="quantity"
            defaultValue={props.obj["quantity"]}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-around">
        <button type="submit" className="w-fit h-[50px] p-5 bg-[#5B83D7] rounded-lg text-slate-100 font-medium flex items-center" name="submit" value="submit">
          Save Changes
        </button>

        <button className="w-fit h-[50px] p-5 rounded-lg border-2 border-[#E60023] text-[#E60023] font-medium flex items-center" name="delete" value={delProd} onClick={()=>setDelProd(true)}>
          Delete Item
        </button>
      </div>
      </form>
    </aside>
  );
}

function ProductCard(props) {
  return (
    <div
      className="flex flex-col h-fit w-[20%] m-[20px] ml-[0px] rounded-2xl cursor-pointer shadow-[10px_10px_15px_-3px_rgba(0,0,0,0.1)] bg-[#FFFFFF]"
      onClick={() => props.clickEvent(props.id)}
    >
      <img src={require(props.img)} className="size-full rounded-t-xl" alt="image"/>
      <div className="flex flex-col p-5">
      <h1 className="text-2xl font-semibold my-[5px]">{props.name}</h1>
      <h1 className="font-light mb-[5px]">{props.brand}</h1>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Rs. {props.price}</h1>
        <h1 className="text-blue-400">{props.stock} left</h1>
      </div>
      </div>
    </div>
  );
}

function Stats(props) {

  const [stats, setStats] = useState(null);
  const [data, setPieData] = useState([]);
  let samplePieData = [
    { id: 0, value: 287 },
    { id: 1, value: 342 },
    { id: 2, value: 198 },
    { id: 3, value: 271 },
    { id: 4, value: 219 },
    { id: 5, value: 234 },
    { id: 6, value: 177 },
  ];
  useEffect(()=>{
    axios.get(`${apiUrl}/products/stats`).then((response)=>{
      setStats(response.data);
      let newPieData = response.data.category.map((category, index) => ({
        id: index,
        value: category["items"],
        label: category["product_category"]
      }));
      setPieData(newPieData);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  console.log(data);

  return (
    <div
      className="flex flex-col w-[40%] p-5 grow-0 border-l-2 animate__animated animate__slideInRight"
      style={{ display: props.close ? "none" : "block" }}
    >
      <div className="flex flex-row justify-between items-center mb-[10px]">
        <h1 className="text-4xl">Total Stats</h1>
        <CloseRounded
          fontSize="large"
          className="cursor-pointer"
          onClick={props.onClose}
        />
      </div>
      <div className="flex flex-wrap mb-[20px]">
        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#a9def9] border-2 border-[#3BA5DB] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <ProductFilled /> {stats && stats.products} Products
        </div>

        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#ff99c8] border-2 border-[#DE3A85] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <InboxOutlined />
          {stats && stats.orders} Orders
        </div>
        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#e4c1f9] border-2 border-[#C469FB] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <ShoppingFilled />
          {stats && stats.packed} Packed
        </div>
        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#fcf6bd] border-2 border-[#F1DD23] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <TruckFilled />
          {stats && stats.shipped} Shipped
        </div>
        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#d0f4de] border-2 border-[#31C96C] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <CheckCircleOutlined />
          {stats && stats.delivered} Delivered
        </div>
      </div>
      <div className="flex justify-between items-center border-b-2 pb-[20px]">
        <h1 className="text-2xl">Category Chart</h1>
        <select
          className="w-fit rounded-md bg-[#F4F6FA] focus:border-0"
          id="chart-select"
          defaultValue="Category"
        >
          <option value="Category">
            Category
          </option>
          <option value="Top-Selling">Top Selling</option>
          <option value="Price">Price</option>
        </select>
      </div>
      <div className="py-[30px] flex flex-col items-center">
        <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
        <div className="flex flex-row w-full h-[75%] justify-between mt-[30px]">
          <div className="w-[45%] mb-[10px] border-r-2">
            <h1 className="text-xl font-medium">Most Popular</h1>
            <h3>{stats && stats.popular}</h3>
          </div>
          <div className="w-[45%] mb-[10px]">
            <h1 className="text-xl font-medium">Least Popular</h1>
            <h3>{stats && stats.least}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body() {
  const [closeStats, setCloseStats] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [addProd, setAddProd] = useState(false);

  const [productsData, setProductsData] = useState([]);

  const fetchProducts = async ()=>{
    axios.get(`${apiUrl}/products`).then((response)=>{
      setProductsData(response.data);
    })
  }

  useEffect(()=>{
   fetchProducts();
  }, []);

  function modalControl(key) {
    setModalKey(key);
    setModal(true);
  }

  return (
    <div className="w-screen h-full p-5 bg-[#F4F6FA] flex gap-[20px] overflow-scroll">
      <div className="w-full grow-1">
        <Heading addProdHandle={() => setAddProd(true)} handleStats={()=>setCloseStats(false)}/>
        <div className="flex flex-wrap h-screen overflow-scroll">
          {productsData.map((item, index) => {
            return (
              <ProductCard
                key={index}
                id={index}
                img={item["product_img"]}
                name={item["product_name"]}
                brand={item["brand"]}
                price={item["cost_price"]}
                stock={item["quantity"]}
                clickEvent={(key) => modalControl(key)}
              />
            );
          })}
        </div>
      </div>
      <Stats close={closeStats} onClose={() => setCloseStats(true)} />
      {modal && (
        <ProductModal
          close={modal}
          onClose={() => setModal(false)}
          key={modalKey}
          obj={productsData[modalKey]}
        />
      )}
      <AddProduct open={addProd} onClose={() => setAddProd(false)} />
    </div>
  );
}

export default function Products() {

  useEffect(()=>{
    axios.get(`${apiUrl}/auth/authUser/admin`).then((response)=>{
      if(!response.data.valid)
      {
        window.location='/login';
      }
    })
  })
  return <Body />;
}
