import React from "react";
import { Route, Routes } from "react-router-dom";
import UserOutlet from "../outlet/UserOutlet";
import Home from "../pages/Home/Home";
import ForYou from "../pages/ForYou/ForYou";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Reviews from "../../src/pages/Reviews/Reviews";
import FreequentQuestion from "../pages/FreequentQuestion/FreequentQuestion";
import SingleCard from "../components/SingleCard/SingleCard";
import UserPage from "../pages/UserPage/UserPage";
function AppRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<UserOutlet />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forYou" element={<ForYou />}></Route>
        <Route
          path="/freequentQuestion"
          element={<FreequentQuestion />}
        ></Route>
        <Route path="/reviews" element={<Reviews />}></Route>
        <Route path="/card/:id" element={<SingleCard />}></Route>
        <Route path="/userP" element={<UserPage />}></Route>

      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
}

export default AppRoute;
