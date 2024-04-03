import { Add, EditOutlined, SearchRounded } from "@mui/icons-material";
import { AddSharp, CloseRounded } from "@mui/icons-material";
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
import { PieChart } from "@mui/x-charts";
import { useState } from "react";
import "animate.css";

const products = [
  {
    img: shoe,
    name: "Sneaker-Black",
    brand: "NIKE",
    price: "850.00",
    stock: "178",
  },
  {
    img: laptop,
    name: "Xeon Pro 15",
    brand: "DELL",
    price: "1499.99",
    stock: "50",
  },
  {
    img: backpack,
    name: "Traverse 40L",
    brand: "THE NORTH FACE",
    price: "129.95",
    stock: "225",
  },
  {
    img: smartwatch,
    name: "Active X3",
    brand: "FITBIT",
    price: "249.99",
    stock: "180",
  },
  {
    img: ps5,
    name: "PlayStation 5",
    brand: "SONY",
    price: "499.99",
    stock: "3",
  },
  {
    img: lamp,
    name: "Table Lamp",
    brand: "PHILIPS",
    price: "699.00",
    stock: "10",
  },
];

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
      <button
        className="bg-[#5B83D7] w-fit h-[50px] text-slate-50 rounded-md flex items-center p-[15px] font-medium"
        onClick={props.addProdHandle}
      >
        <AddSharp />
        New Product
      </button>
    </div>
  );
}

function AddProduct(props) {
  return (
    <div
      className="w-[30%] h-screen z-20 flex flex-col p-10 pt-[50px] fixed top-0 right-0 bg-[#FFFFFF] overflow-scroll"
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
      <form action="http://localhost:3000/products" method="POST" encType="multipart/form-data">
        <h1 className="text-xl">Product Id</h1> 
        <input type="text" name="pid" className="border-2 border-text-gray-400 m-[10px] mb-[20px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Product Name</h1>
        <input type="text" name="pname" className="border-2 border-text-gray-400 m-[10px] mb-[20px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Brand</h1>
        <input type="text" name="brand" className="border-2 border-text-gray-400 m-[10px] mb-[20px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Category</h1>
        <input type="text" name="category" className="border-2 border-text-gray-400 m-[10px] mb-[20px] w-[75%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Price</h1>
        <input type="number" name="price" className="border-2 border-text-gray-400 m-[10px] mb-[20px] w-[50%] rounded-lg h-[50px] p-5" />
        <h1 className="text-xl">Quantity</h1>
        <input type="number" name="quantity" className="border-2 border-text-gray-400 m-[10px] mb-[20px] w-[50%] rounded-lg h-[50px] p-5" />
        <input
          type="file"
          accept="image/jpg, image/png"
          className="border-2 m-[10px] w-[50%]"
          name="image"
        />
        <button type="submit" name="submit" value="submit">
          Save Changes
        </button>
      </form>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
}

function ProductModal(props) {
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
          src={props.obj.img}
          className="w-[50%] h-[50%] rounded-xl mx-auto"
        />
      </div>
      <div className="mb-[10px]">
        <h1 className="text-sm font-light mb-[5px]">Product Name</h1>
        <input
          type="text"
          className="text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg"
          defaultValue={props.obj.name}
          disabled
        />
      </div>
      <h1 className="text-sm font-light mb-[5px]">Brand</h1>
      <input
        type="text"
        className="max-w-[50%] text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg mb-[10px]"
        defaultValue={props.obj.brand}
        disabled
      />
      <div className="flex flex-row justify-between mb-[20px]">
        <div className="flex flex-col">
          <h1 className="text-sm font-light mb-[5px]">Cost Price</h1>
          <input
            type="number"
            className="w-[150px] text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg mb-[10px]"
            defaultValue={props.obj.price}
            disabled
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-light mb-[5px]">Sell Price</h1>
          <input
            type="number"
            className="w-[150px] text-xl font-medium bg-transparent p-[5px] border-2 rounded-lg mb-[10px]"
            defaultValue={props.obj.price}
            disabled
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-around">
        <button className="w-fit h-[50px] p-5 bg-[#5B83D7] rounded-lg text-slate-100 font-medium flex items-center">
          Save Changes
        </button>
        <button className="w-fit h-[50px] p-5 rounded-lg border-2 border-[#E60023] text-[#E60023] font-medium flex items-center">
          Delete Item
        </button>
      </div>
    </aside>
  );
}

function ProductCard(props) {
  return (
    <div
      className="flex flex-col h-fit w-[250px] m-[20px] ml-[0px] p-5 rounded-2xl cursor-pointer shadow-[10px_10px_15px_-3px_rgba(0,0,0,0.1)] bg-[#FFFFFF]"
      onClick={() => props.clickEvent(props.id)}
    >
      <img src={props.img} className="size-full rounded-xl" />
      <h1 className="text-2xl font-semibold my-[5px]">{props.name}</h1>
      <h1 className="font-light mb-[5px]">{props.brand}</h1>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">{props.price}</h1>
        <h1 className="text-blue-400">{props.stock} left</h1>
      </div>
    </div>
  );
}

function Stats(props) {
  return (
    <div
      className="flex flex-col w-[40%] p-5 grow-0 border-l-2"
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
          <ProductFilled /> 1728 Products
        </div>

        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#ff99c8] border-2 border-[#DE3A85] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <InboxOutlined />
          258 Orders
        </div>
        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#e4c1f9] border-2 border-[#C469FB] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <ShoppingFilled />
          150 Packed
        </div>
        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#fcf6bd] border-2 border-[#F1DD23] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <TruckFilled />
          70 Shipped
        </div>
        <div
          className="w-fit h-fit bg-[#FFFFFF] flex p-2.5 text-lg gap-[8px] items-center justify-between rounded-3xl bg-[#d0f4de] border-2 border-[#31C96C] m-[10px] ml-[0px]"
          style={{ borderRadius: "40px" }}
        >
          <CheckCircleOutlined />
          38 Delivered
        </div>
      </div>
      <div className="flex justify-between items-center border-b-2 pb-[20px]">
        <h1 className="text-2xl">Category Chart</h1>
        <select
          className="w-fit rounded-md bg-[#F4F6FA] focus:border-0"
          id="chart-select"
          defaultValue="Category"
        >
          <option value="Category" selected>
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
              data: [
                { id: 0, value: 287 },
                { id: 1, value: 342 },
                { id: 2, value: 198 },
                { id: 3, value: 271 },
                { id: 4, value: 219 },
                { id: 5, value: 234 },
                { id: 6, value: 177 },
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 180,
            },
          ]}
          width={400}
          height={200}
        />
        <div className="flex flex-row w-full h-[75%] justify-between mt-[30px]">
          <div className="w-[45%] mb-[10px] border-r-2">
            <h1 className="text-xl font-medium">Most Popular</h1>
            <h3>Electronics</h3>
          </div>
          <div className="w-[45%] mb-[10px]">
            <h1 className="text-xl font-medium">Least Popular</h1>
            <h3>Stationery</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body() {
  const [closeStats, setCloseStats] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [addProd, setAddProd] = useState(false);

  function modalControl(key) {
    setModalKey(key);
    setModal(true);
  }

  return (
    <div className="w-screen h-full p-5 bg-[#F4F6FA] flex gap-[20px] overflow-scroll">
      <div className="w-full grow-1">
        <Heading addProdHandle={() => setAddProd(true)} />
        <div className="flex flex-wrap h-screen overflow-scroll">
          {products.map((item, index) => {
            return (
              <ProductCard
                key={index}
                id={index}
                img={item.img}
                name={item.name}
                brand={item.brand}
                price={item.price}
                stock={item.stock}
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
          obj={products[modalKey]}
        />
      )}
      <AddProduct open={addProd} onClose={() => setAddProd(false)} />
    </div>
  );
}

export default function Products() {
  return <Body />;
}
