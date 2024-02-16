import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import style from "./HeroSection.module.css";
import main from "../../../src/assets/images/mainImg.png";
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
        style={{textDecoration:"none" , color:"var(--main-color"}}
            >
              Join Now!
            </NavLink>
            </button>
     
           
          </p>
          {/* <p>SkinWis: Where Beauty Meets Knowledge</p> */}
          {/* <button className={style.cart}>
            {!user ? (
              <NavLink className={` ${style.btn}`} to="./login"             style={{color:"var(--beij-color)"}}
              >
                Login{" "}
              </NavLink>
            ) : (
              <NavLink              style={{color:"var(--beij-color)"}}
               className={` ${style.btn}`} to="./" onClick={logout}>
                logout
              </NavLink>
            )}
          </button> */}
          {/* <ul className={style.ul}>
            <li className={style.li}>Knowledge what your skin needs</li>
            <li className={style.li}>Help your skin recover</li>
            <li className={style.li}>Trust Curology</li>
          </ul> */}
          {/* 
<h1>
   
      
      <div class="scroller">
        <span>
          Knowledge what your skin needs<br/>
          Help your skin recover<br/>
          Trust Curology
        </span>
      </div>
      
 
    </h1> */}
        </div>
        <img className={style.cremImg} src={crem} alt="main" />
      </div>
    </main>
  );
}

export default HeroSection;
