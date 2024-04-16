import {
  LocalConvenienceStoreRounded,
  BarChartRounded,
  ChecklistRounded,
  CategoryRounded,
  LocalShippingRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-screen w-fit flex flex-col bg-blue-950 text-gray-100 p-[20px] pt-8">
    <Link to="/">
      <div className="logo h-12 mb-[50px]">
        <LocalConvenienceStoreRounded sx={{ fontSize: 45 }} />
      </div>
      </Link>
      <ul className="flex flex-col gap-[30px]">
        <li className="sidebar-options">
          <a href="#">
            <BarChartRounded sx={{ fontSize: 35 }} />
          </a>
        </li>
        <li>
          <Link to="/home/orders">
            <ChecklistRounded sx={{ fontSize: 35 }} />
          </Link>
        </li>
        <li>
          <Link to="/home/products">
            <CategoryRounded sx={{ fontSize: 35 }} />
          </Link>
        </li>
        <li>
          <a href="#">
            <LocalShippingRounded sx={{ fontSize: 35 }} />
          </a>
        </li>
      </ul>
    </aside>
  );
}
