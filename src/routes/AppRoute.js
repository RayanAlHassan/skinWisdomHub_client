import React from "react";
import { Route, Routes } from "react-router-dom";
import UserOutlet from "../outlet/UserOutlet";
import Home from "../pages/Home/Home";
import Reviewing from "../pages/Reviewing/Reviewing";
import QuestionAnswer from "../pages/QuestionAnswer/QuestionAnswer";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

function AppRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<UserOutlet />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reviews" element={<Reviewing />}></Route>
        <Route path="/questionAnswer" element={<QuestionAnswer />}></Route>
      </Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>

    </Routes>
  );
}

export default AppRoute;
