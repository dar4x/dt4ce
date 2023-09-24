import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Map from "../components/Map";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}></Route>
      <Route path="/" element={<Map />} />
    </Routes>
  );
}

export default MainRoutes;
