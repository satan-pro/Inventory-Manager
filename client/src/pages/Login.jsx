import { useEffect, useState } from "react";
import axios from "axios";
export default function Login(props) {
  const [loginBtn, setLoginBtn] = useState(true);
  const [regBtn, setRegBtn] = useState(false);

  useEffect(()=>{
    handleType()
  },[]);

  function handleType() {
    if (props.type === "login") {
      setLoginBtn(true);
      setRegBtn(false);
    } else if (props.type === "register") {
      setRegBtn(true);
      setLoginBtn(false);
    }
  }

  const handleLogin = (event)=>{
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    axios.post(`http://localhost:3000/auth/login`,{
        authData:formObject
    }).then((response)=>{
        response.data.success?response.data.type==='customer'?window.location='/':window.location='/home/orders':window.location.reload();
    }).catch((err)=>{
        console.log(err);
    });
  }

  const handleRegister = (event)=>{
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    axios.post(`http://localhost:3000/auth/register`,{
        authData:formObject
    }).then((response)=>{
        response.data.success?window.location='/login':window.location.reload();
    }).catch((err)=>{
        console.log(err);
    });
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[50%] flex flex-col bg-[#F4F6FA] pt-[50px]">
        <h1 className="text-8xl text-right text-[#5B83D7] pr-[10px]">In</h1>
      </div>
      <div className="w-[50%] flex flex-col bg-[#5B83D7] pt-[50px]">
        <h1 className="text-8xl text-left text-white pl-[10px] mb-[40px]">
          Biz
        </h1>
        <div className="w-full flex flex-col items-center">
          <div className="w-[50%] rounded-lg flex flex-col gap-[20px]">
            <div className="flex gap-[20px] text-xl">
              <button
                className="w-[100px] p-2.5 rounded-md"
                style={{
                  backgroundColor: loginBtn ? "#F4F6FA" : "#92ACE4",
                  color: loginBtn ? "#1F2937" : "#FFFFFF",
                }}
                onClick={() => {
                  setLoginBtn(true);
                  setRegBtn(false);
                }}
              >
                Login
              </button>
              <button
                className="w-[100px] p-2.5 rounded-md"
                style={{
                  backgroundColor: regBtn ? "#F4F6FA" : "#92ACE4",
                  color: regBtn ? "#1F2937" : "#FFFFFF",
                }}
                onClick={() => {
                  setLoginBtn(false);
                  setRegBtn(true);
                }}
              >
                Register
              </button>
            </div>
            <form
              className="p-5 bg-[#F4F6FA] rounded-lg"
              style={{ display: loginBtn ? "block" : "none" }}
              onSubmit={handleLogin}
            >
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-xl font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="bg-transparent border-b-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-xl font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-transparent border-b-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                        <label htmlFor="userType" className="block text-gray-700 text-xl font-medium mb-2">User Type</label>
                        <select id="userType" name="userType" className="bg-transparent border-b-2 rounded-md px-4 py-2 w-full focus:outline-none focus:ring">
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
              <button
                type="submit"
                className="bg-[#5B83D7] text-white rounded-md px-4 py-2 w-full font-medium"
              >
                Login
              </button>
            </form>

            <form
              className="p-5 bg-[#F4F6FA] rounded-lg"
              style={{ display: regBtn ? "block" : "none" }}
              onSubmit={handleRegister}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-xl font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-transparent border-b-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-xl font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-transparent border-b-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-xl font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-transparent border-b-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                        <label htmlFor="userType" className="block text-gray-700 text-xl font-medium mb-2">User Type</label>
                        <select id="userType" name="userType" className="bg-transparent border-b-2 rounded-md px-4 py-2 w-full focus:outline-none focus:ring">
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
              <button
                type="submit"
                className="bg-[#5B83D7] text-white rounded-md px-4 py-2 w-full font-medium"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
