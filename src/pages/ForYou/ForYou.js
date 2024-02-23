import React, { useState, useEffect } from "react";
import style from "./ForYou.module.css";
import Searchfilter from "../../components/Searchfilter/Searchfilter";
import bcg from "../../assets/images/top.jpg";
import Cards from "../../components/Cards/Cards";
import { FaFilter, FaSearch, FaSlidersH, FaTags } from "react-icons/fa";
// import SearchBar from "../../components/SearchBar/SearchBar";
import useFilterStore from "../../components/filterStore";
function ForYou() {
  const filterData = useFilterStore((state) => state.filterData);
  const setFilterData = useFilterStore((state) => state.setFilterData);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    setIsFilterVisible(false); // Reset the state to false when the component mounts
  }, []);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleFilterChange = (filterData) => {
    setFilterData(filterData);
  };

  return (
    <main className={style.container}>
      <div className={style.top}>
        <div className={style.heroBackgrd}></div>

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
        {/* <SearchBar/> */}

        {isFilterVisible && (
          <div className={style.show}>
      <Searchfilter onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>
      <div className={style.bottom}>
        <div className={style.headContainer}>
          <h1 className={style.header}>
            Find Your Skin's Perfect Fit
            <FaFilter className={style.filterIcon} onClick={toggleFilter} />
          </h1>
        </div>

        <div className={style.card}>
          <Cards filterData={filterData} />
        </div>
      </div>
    </main>
  );
}

export default ForYou;
