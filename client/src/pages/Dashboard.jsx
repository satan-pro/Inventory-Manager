import Sidebar from "../components/Sidebar";

function Heading() {
  return (
    <div className="w-full p-5">
      <p className="text-4xl">Orders</p>
    </div>
  );
}

function Body()
{
    return(

        <div className="w-screen p-5 bg-gray-400">
            <div className="rounded-lg bg-gray-100">
            <Heading />
            </div>
        </div>
    );
}

function Main()
{
    return(
        <div className="flex">
        <Sidebar />
        <Body />
        </div>
    );
}

export default function Dashboard() {
  return (
    <Main />
  );
}
