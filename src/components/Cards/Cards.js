import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Cards.module.css';

const Cards = (props) => {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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
          <Link to={`/card/${item._id}`} key={item._id} className={styles.link} >
            <div key={item._id} className={styles.card}>
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
                <p className={styles.subCategory}>Subcategory: {item.subCategoryID?.name}</p>
                <p className={styles.brand}>Brand: {item.name}</p>
                <ul className={styles.ingredients}>
                  <p className={styles.ingredientsTitle}>Ingredients:</p>
                  {item.ingrediantsID?.map((ingredient, index) => (
                    <li key={index}>{ingredient?.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Cards;
