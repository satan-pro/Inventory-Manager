import { useState, useEffect } from "react";
import { KeyboardArrowDownRounded, CloseRounded } from "@mui/icons-material";
import { SearchRounded } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import "animate.css";
import laptop from "../assets/laptop.png";
import shoe from "../assets/shoe.png";
import smartwatch from "../assets/smartwatch.png";
import { Steps } from "antd";
import "animate.css";
//import 'dotenv/config';

//const apiUrl = process.env.REACT_APP_API_URL;

const apiUrl = "https://inbiz.onrender.com";
//const apiUrl = "http://localhost:3000";

function Heading() {
  return (
    <div className="w-full p-5 pb-[2px]">
      <p className="text-4xl mb-[10px]">Orders</p>
    </div>
  );
}

function SearchSpace() {
  return (
    <div className="w-full flex flex-row p-5 pb-2.5 mb-[20px] justify-between">
      <div className="w-[25%] border-2 border-[#9ca3af] rounded-lg hover:border-slate-500 hover:border-[2px] flex flex-row p-3 justify-between items-center bg-[#F4F4F6]">
        <SearchRounded sx={{ fontSize: 30 }} />
        <input
          type="text"
          className="basis-[85%] bg-[#F4F4F6] focus:border-0 focus:outline-0 text-gray-400 focus:text-gray-700"
          placeholder="Search here.."
        />
      </div>
      <div className="basis-[60%] flex flex-row gap-5 justify-end">
        <div className="h-[45px] w-[20%]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              className="border-2 border-[#9ca3af] border rounded-md hover:border-slate-500 hover:border-[2px]"
            />
          </LocalizationProvider>
        </div>
        <select
          className="sales-channel-select w-[20%] p-[3px] rounded-md bg-[#F4F4F6] border-2 border-[#9ca3af] border rounded-md hover:border-slate-500 hover:border-[2px] focus:border-[2px] focus:border-slate-500"
          id="sales-channel-select"
          defaultValue="Sales Channel"
        >
          <option value="default" selected style={{ display: "none" }}>
            Delivery Agent
          </option>
          <option value="FastShip">FastShip</option>
          <option value="Parcel Pals">Parcel Pals</option>
          <option value="Shopify">Shopify</option>
          <option value="SwiftRoute">SwiftRoute</option>
          <option value="Acme Deliveries">Acme Deliveries</option>
          <option value="None">None</option>
        </select>

        <select
          className="status w-[15%] p-[3px] rounded-md bg-[#F4F4F6] border-2 border-[#9ca3af] border rounded-md hover:border-slate-500 hover:border-[2px] focus:border-[2px] focus:border-slate-500"
          id="status-select"
          defaultValue="Sales"
        >
          <option value="default" selected style={{ display: "none" }}>
            Status
          </option>
          <option value="Confirmed">Confirmed</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="None">None</option>
        </select>
      </div>
    </div>
  );
}

function OrderPreview(props) {
  const [previewData, setPreviewData] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState(0);

  useEffect(() => {
    axios.get(`${apiUrl}/orders/${props.data}`).then((response) => {
      setPreviewData(response.data);
    });
    if (previewData["deliveryStatus"] == "Packed") setDeliveryStatus(1);
    else if (previewData["deliveryStatus"] == "Shipped") setDeliveryStatus(2);
    else if (previewData["deliveryStatus"] == "Delivered") setDeliveryStatus(3);
    else setDeliveryStatus(0);
  },[previewData]);

  return (
    <div>
      {previewData ? (
        <div
          className="w-[30%] h-screen p-[40px] flex flex-col fixed top-0 right-0 bg-[#FFFFFF] overflow-scroll animate__animated animate__slideInRight"
          style={{ display: props.openState ? "block" : "none" }}
        >
          <div className="flex flex-row justify-between items-center text-4xl mb-[20px]">
            <h1 className="">Order Details</h1>
            <CloseRounded
              className="cursor-pointer"
              fontSize="large"
              onClick={props.handleClick}
            />
          </div>
          <div className="flex flex-col mb-[10px]">
            <div className="flex flex-row gap-5 items-center pl-5 mb-[10px]">
              <h1 className="text-2xl">Order No</h1>
              <h1 className="text-xl text-blue-400">
                {previewData["orderId"]}
              </h1>
            </div>
            <div className="flex flex-row gap-5 items-center pl-5 mb-[10px]">
              <h1 className="text-2xl">Total Price</h1>
              <h1 className="text-xl">{previewData["totalPrice"]}</h1>
            </div>
            <div className="flex flex-row gap-5 items-center pl-5 mb-[10px]">
              <h1 className="text-2xl">Order Date</h1>
              <h1 className="text-xl">
                {previewData?.orderDate
                  ? previewData["orderDate"].substring(0, 10)
                  : ""}
              </h1>
            </div>
          </div>
          <div className="order-product-preview w-[90%] h-[50%] mx-auto mb-[30px] rounded-xl p-5 bg-[#F4F6FA] overflow-scroll">
            {previewData?.detailedOrders ? (
              previewData["detailedOrders"].map((product, index) => {
                return (
                  <div
                    className="flex flex-row gap-[30px] mb-[30px]"
                    key={index}
                  >
                    <img
                      src={product["product_img"]}
                      className="size-[30%] rounded-lg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-xl font-medium">
                        {product["product_name"]}
                      </h1>
                      <h1 className="text-lg font-light">{product["BRAND"]}</h1>
                      <h1 className="text-lg">
                        Items : {product["product_quantity"]}
                      </h1>
                      <h1 className="text-md">
                        Price : {product["sell_price"]}
                      </h1>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
          <Steps
            className="px-[40px] text-[#b5e48c]"
            direction="vertical"
            current={deliveryStatus}
            items={[
              {
                title: "Confirmed",
              },
              {
                title: "Packed",
              },
              {
                title: "Shipped",
              },
              {
                title: "Delivered",
              },
            ]}
          />
        </div>
      ) : (
        <div> Loading </div>
      )}
    </div>
  );
}

function Table(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/orders`).then((response) => {
      setOrders(response.data.orders);
    });
  }, []);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  function toggleCheckbox(orderId) {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(orderId)) {
        return prevSelectedCheckboxes.filter((id) => id !== orderId);
      } else {
        return [...prevSelectedCheckboxes, orderId];
      }
    });
  }

  const [isOpen, setIsOpen] = useState([]);

  function toggleDropdownRow(orderId) {
    setIsOpen((prevIsOpen) => {
      if (prevIsOpen.includes(orderId)) {
        return prevIsOpen.filter((id) => id !== orderId);
      } else {
        return [...prevIsOpen, orderId];
      }
    });
  }

  function DropdownRow(props) {
    const [detailedOrder, setDetailedOrder] = useState([]);

    useEffect(() => {
      axios.get(`${apiUrl}/orders/${props.id}`).then((response) => {
        setDetailedOrder(response.data["detailedOrders"]);
      });
    }, []);

    return (
      <div
        className="w-full border-l-4 border-slate-950 flex flex-col items-center p-[20px] bg-[#F4F6FA] animate_animated animate__fadeInDown"
        style={{ display: isOpen.includes(props.id) ? "block" : "none" }}
      >
        <table className="w-[95%] p-[20px] mx-auto">
          <thead className="text-left h-[60px] border-b-2 border-slate-300 font-medium text-blue-500">
            <th>Product Name</th>
            <th>Items</th>
            <th>Price</th>
            <th>Supplier</th>
          </thead>
          <tbody>
            {detailedOrder && detailedOrder.map((product, index) => {
              return (
                <tr className="p-[20px] h-[50px] text-left" key={index}>
                  <td>{product["product_name"]}</td>
                  <td>{product["product_quantity"]}</td>
                  <td>{product["sell_price"]}</td>
                  <td>{product["supplier_name"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-[95%] h-fit flex flex-col p-[30px] mx-auto rounded-xl bg-[#FFFFFF] overflow-scroll">
      <hr className="border-[1px] rounded-md border-gray-400"></hr>
      <table className="table-auto">
        <thead
          className="text-left border-b-2 border-gray-400 text-lg text-blue-500"
          style={{ height: "60px" }}
        >
          <th>
            <input type="checkbox" className="h-[20px] w-[20px]" />
          </th>
          <th>Order ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Delivery Agent</th>
          <th>Status</th>
        </thead>
        {orders.map((item, index) => (
          <tbody className="text-xl" key={index}>
            <tr
              key={index}
              className="text-left min-h-5 border-b-2"
              style={{
                height: "70px",
                backgroundColor: selectedCheckboxes.includes(item["order_id"])
                  ? "#a2d2ff"
                  : "#FFFFFF",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleCheckbox(item["order_id"])}
                  className="h-[20px] w-[20px] cursor-pointer"
                />
              </td>
              <td
                className="text-blue-400 cursor-pointer"
                onClick={() => {
                  props.previewClick(item["order_id"]);
                }}
              >
                {item["order_id"]}
              </td>
              <td>{item["order_date"].substring(0, 10)}</td>
              <td>{item["customer_name"]}</td>
              <td>{item["delivery_agent"]}</td>
              <td>{item["status"]}</td>
              <td>
                <div
                  className="bg-gray-400 w-[20px] h-[20px] flex items-center justify-center rounded-[50%] cursor-pointer"
                  onClick={() => toggleDropdownRow(item["order_id"])}
                >
                  <KeyboardArrowDownRounded />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="7" className="w-full">
                <DropdownRow id={item["order_id"]} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

function Body() {
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  return (
    <div className="w-screen h-full p-5 bg-[#F4F6FA] overflow-scroll">
      <div className="rounded-lg">
        <Heading />
        <SearchSpace />
        <Table
          previewClick={(orderId) => {
            setPreview(true);
            setPreviewData(orderId);
          }}
        />
      </div>
      <OrderPreview
        openState={preview}
        handleClick={() => setPreview(false)}
        data={previewData}
      />
    </div>
  );
}

export default function Orders() {

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
