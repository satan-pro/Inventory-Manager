import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div className="w-full h-fit p-5 px-[100px] flex flex-row justify-between items-center border-b-2 fixed top-0 left-0 bg-white">
    <Link to="/home">
      <div className="w-[45%] text-3xl font-medium text-blue-500">InBiz</div>
      </Link>
      <div className="w-fit flex flex-row items-center gap-[10px]">
        <div className="flex flex-row px-5 border-r-2 text-xl gap-[30px]">
        <Link to="/">
          <span>Categories</span>
          </Link>
          <Link to="/cart">
            <Badge color="error" badgeContent={props.count}>
              <span className="text-xl">View Cart</span>
            </Badge>
          </Link>   
        </div>
        <div className="w-fit flex text-lg items-center gap-[20px]">
          <span>Contact Us</span>
          <Link to="/register">
          <button className="w-fit p-5 h-[40px] border-2 rounded-md flex items-center">
            Sign Up
          </button>
          </Link>
          <Link to="/login">
          <button className="w-fit p-5 h-[40px] border-2 border-[#5B83D7] text-white rounded-md flex items-center bg-[#5B83D7]">
            Log In
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
