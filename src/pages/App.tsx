import React from "react";
import Header from "../components/Header";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home";
import Movies from "./Movies";
import Series from "./Series";
import Signup from "./Signup";
import Login from "./Login";
import MovieDetails from "./MovieDetails";
import SerieDetails from "./SerieDetails";
import PrivateRoutes from "../utils/PrivatedRoutes";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/series/:id" element={<SerieDetails />} />
          <Route path="/series" element={<Series />} />
        </Route>

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
}

export default App;
