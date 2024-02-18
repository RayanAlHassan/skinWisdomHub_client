import React, { useState, useEffect } from "react";
import style from "./ForYou.module.css";
import Searchfilter from "../../components/Searchfilter/Searchfilter";
import bcg from "../../assets/images/bcg.png";
import Cards from "../../components/Cards/Cards";
import { FaFilter, FaSearch, FaSlidersH, FaTags } from "react-icons/fa";

function ForYou() {
   const [isFilterVisible, setIsFilterVisible] = useState(false);
  useEffect(() => {
    setIsFilterVisible(false); // Reset the state to false when the component mounts
  }, []);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  return (
    <main className={style.container}>
      <div className={style.top}>
 
        <img
          src={bcg}
          alt="background sky"
          style={{
            marginBottom: "20px",
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        {isFilterVisible && (
        <div className={style.show}>
          <Searchfilter />
        </div>
      )}
      </div>
      <div className={style.bottom}>
        <div className={style.headContainer}>
          <h1 className={style.header}>Find Your Skin's Perfect Fit 
          <FaFilter className={style.filterIcon} onClick={toggleFilter} /></h1>

        </div>

        <div className={style.card}>
          <Cards />
        </div>
      </div>
  
    </main>
  );
}

export default ForYou;
