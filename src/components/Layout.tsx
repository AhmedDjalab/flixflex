import React from "react";
import Header from "./Header";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col h-screen bg-bodyColor">
      {/* header */}
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
