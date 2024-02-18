import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import style from "./HeroSection.module.css";
// import main from "../../../src/assets/images/model.jpg";
import crem from "../../../src/assets/images/crem.png";
import { AuthContext } from "../../Context/AuthContext";

function HeroSection() {
  const { user, logout } = useContext(AuthContext);

  return (
    <main className={style.container}>
      {/* <div className={style.left}>
        <img className={style.mainImg} src={main} alt="main" />
      </div> */}
      <div className={style.right}>
        <div className={style.div}>
          <h1 className={style.header}>
            Every Skin problem deserves its own traitments
          </h1>
          <p className={style.action}>
            Unlock Your Skincare Story:{" "}
            <button               className={style.btnaction}
>
            <NavLink
              to="/login"
        style={{textDecoration:"none" , color:"var(--font-color"}}
            >
              Join Now!
            </NavLink>
            </button>
     
           
          </p>
        </div>
        <img className={style.cremImg} src={crem} alt="main" />
      </div>
    </main>
  );
}

export default HeroSection;
