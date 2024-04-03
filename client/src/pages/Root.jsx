import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex w-screen h-screen bg-[#F4F6FA]">
      <Sidebar />
      <Outlet />
    </div>
  );
}
