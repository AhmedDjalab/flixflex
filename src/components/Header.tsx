import React from "react";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

function Header() {
  return (
    <div
      className="flex text-[#59585D] mt-5  h-10 justify-between  
    border-b-2 border-[#111013] 	
    mx-4
    "
    >
      <div>
        <ul className="flex gap-6 list-none ">
          <li className="hover:text-white">Movies</li>
          <li className="hover:text-white">Series</li>
          <li className="hover:text-white">TV Shows</li>
        </ul>
      </div>

      <div className="flex justify-end flex-1 gap-6 ">
        <NavLink className="hover:text-white" to="/login">
          Login
        </NavLink>
        <NavLink className="hover:text-white" to="/signup">
          Signup
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
