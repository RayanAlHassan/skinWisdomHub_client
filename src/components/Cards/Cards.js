
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Cards.module.css';
import { useNavigate } from 'react-router-dom';

const Cards = (props) => {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (props.filteredData) {
          response = await axios.get(`${process.env.REACT_APP_PATH}product/getall`, { params: props.filteredData });
        } else {
          response = await axios.get(`${process.env.REACT_APP_PATH}product/getall`);
        }
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

    fetchData();
    console.log("HEYY", props.filteredData);
  }, [props.filteredData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleDropdownSelect = (name) => {
    setSearchQuery(name);
    setShowDropdown(false);
  };

  // Filter productData based on searchQuery
  const filteredProducts = productData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ( item.subCategoryID.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

// Determine which set of products to display based on conditions
let productsToDisplay;
if (searchQuery) {
  productsToDisplay = filteredProducts;
} else if (props.filteredData && props.filteredData.products) {
  productsToDisplay = props.filteredData.products;
} else {
  productsToDisplay = productData;
}

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search For A Product Name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {showDropdown && (
        <div className={styles.dropdown}>
          {filteredProducts.map(item => (
            <div
              key={item._id}
              onClick={() => handleDropdownSelect(item.name)}
              className={styles.dropdownItem}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
      {isLoadingProducts ? (
        <p>Loading...</p>
      ) : (
        productsToDisplay.map((item) => (
          <div
            key={item._id}
            className={styles.card}
            onClick={() => navigate(`/card/${item._id}`)}
          >
            <div className={styles.cardContent}>
              <p className={styles.subCategory}>Subcategory: {item.subCategoryID?.name}</p>
              <img
                className={styles.img}
                src={`${process.env.REACT_APP_PATH}images/${item.image}`}
                alt={item.name}
              />
              <div className={styles.details}>
                <p className={styles.brand}>{item.name}</p>
                <p className={styles.skinType}> {item.skinType}</p>
              </div>
            </div>
            <div className={styles.hoverDetails}>
             <span className={styles.desc}>{item.description}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
