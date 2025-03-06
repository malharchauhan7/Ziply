import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import Login from "./common/Login";
import Signup from "./common/Signup";
import PrivateRoutes from "./hooks/PrivateRoutes";
const App = () => {
  axios.defaults.baseURL = "http://localhost:8001/";
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
