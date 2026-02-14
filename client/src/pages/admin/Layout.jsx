import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  
  const {axios,setToken,navigate} = useAppContext();  

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    axios.defaults.headers.common['Authorization'] = null;
   navigate('/')
  }

  return (
    <>
    <div className="flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
      <img
        src={assets.logo}
        alt=""
        className="w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <button
        onClick={logout}
        className="px-6 py-2 bg-primary text-white rounded-full"
      >
        Logout
      </button>
    </div>
    <div className="flex h-[calc(100vh-70px)]">
          <Sidebar/>
          <Outlet/>
    </div>
    </>
  );
};

export default Layout;
