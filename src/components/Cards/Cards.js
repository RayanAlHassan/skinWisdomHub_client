import React, {useEffect,useState,} from 'react'
import axios from 'axios';
import styles from './Cards.module.css';
import {  useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
const Cards = (props) => {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook here

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/product/getall", { params: { ...props.filterData, search: props.searchQuery } });
            if (!response.data) {
                throw new Error("Failed to fetch products");
            }
            console.log(response.data);
            setProductData(response.data);
            setIsLoadingProducts(false);
        } catch (error) {
            console.error(error);
            setIsLoadingProducts(false);
        }
    };

    fetchData();
  }, [props.filterData]);

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
    (item.subCategoryID && item.subCategoryID.name.toLowerCase().includes(searchQuery.toLowerCase()))
);

  return (
    <div className={styles.container}>
      <input 
        type="text" 
        placeholder="Search products..." 
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
        filteredProducts.map((item) => (
          <div 
          key={item._id} 
          className={styles.card}
          onClick={() => navigate(`/card/${item._id}`)} // Navigate to SingleCard on click
          >          
              <div className={styles.cardContent}>
                <p className={styles.subCategory}>Subcategory: {item.subCategoryID?.name}</p>
                <img 
                  className={styles.img} 
                  src={`http://localhost:5000/images/${item.image}`} 
                  alt={item.name} 
                />
                <div className={styles.details}>
                  <p className={styles.brand}>{item.name}</p>
                  <p className={styles.skinType}>Skin Type: {item.skinType}</p>
                </div>
              </div>
              <div className={styles.hoverDetails}>
                {/* <p className={styles.subCategory}>Subcategory: {item.subCategoryID?.name}</p> */}
                {/* <p className={styles.p}> */}
                  desc: <span className={styles.desc}>{item.description}</span>
                  {/* </p> */}
                {/* <ul className={styles.ingredients}>
                  <p className={styles.ingredientsTitle}>Ingredients:</p>
                  {item.ingrediantsID?.map((ingredient, index) => (
                    <li key={index}>{ingredient?.name}</li>
                  ))}
                </ul> */}
              </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
