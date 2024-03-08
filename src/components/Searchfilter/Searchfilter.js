import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../Searchfilter/Searchfilter.module.css";
import { motion } from "framer-motion";
import { FaSlidersH } from "react-icons/fa";
import Button from "../Button/Button";
import styled from "@emotion/styled";
const Searchfilter = ({ onFilterChange, handleSearch }) => {
  const navigate = useNavigate();
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [productData, setProductData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filterState, setFilterState] = useState({});
  const skinTypes = ["Dry", "Oily", "All Skin"];

  useEffect(() => {
    const fetchData = async () => {
      fetchSkinTypes();
      fetchIngredients();
      fetchCategories();
    };

    fetchData();
  }, []);

  const fetchSkinTypes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}product/getall`
      );
      if (!response.data) {
        throw new Error("Failed to fetch products");
      }
      setProductData(response.data);
      setIsLoadingProducts(false);
    } catch (error) {
      console.error(error);
      setIsLoadingProducts(false);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ingrediants");
      if (!response.data) {
        throw new Error("Failed to fetch ingrediants");
      }
      setIngredients(response.data);
      setIsLoadingProducts(false);
    } catch (error) {
      console.error(error);
      setIsLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}category/getall`
      );
      if (!response.data) {
        throw new Error("Failed to fetch category");
      }
      setCategories(response.data.categories);
      setIsLoadingProducts(false);
    } catch (error) {
      console.error(error);
      setIsLoadingProducts(false);
    }
  };

  const fetchSubCategories = async (id) => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_PATH}subCategory/getsubbycategory/${id}`
      );
      setSubCategories(res.data.subCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryID") {
      fetchSubCategories(value);
    }

    setFilterState((prevState) => ({ ...prevState, [name]: value }));
    console.log("SELECTED", filterState);
  };

  const resetFilter = () => {
    setFilterState({});
    handleSearch();
  };

  return (
    <motion.div className={Styles.container}>
      <div>
        <select
          className={Styles.input}
          name="skinType"
          value={filterState.skinType || ""}
          onChange={handleChange}
        >
          <option value="">Select Skin Type</option>
          {skinTypes.map((type, key) => (
            <option key={key} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className={Styles.input}
          name="ingredients"
          value={filterState.ingredients || ""}
          onChange={handleChange}
        >
          <option value="">Select Ingredient</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className={Styles.input}
          name="categoryID"
          value={filterState.categoryID || ""}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className={Styles.input}
          name="subCategoryID"
          value={filterState.subCategoryID || ""}
          onChange={handleChange}
        >
          <option value="">Select Subcategory</option>
          {subCategories &&
            subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
        </select>
      </div>
      <motion.button
        className={`${Styles.btn} ${Styles.hoverEffect}`}
        onClick={() => handleSearch(filterState)}
      >
        <FaSlidersH className={`${Styles.filterIcon} ${Styles.hoverEffect}`} />
      </motion.button>
      <motion.button>
      
        <div className={Styles.resetBtn}>
          <Button text={"Reset"} onClick={resetFilter}>
            Reset
          </Button>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default Searchfilter;
