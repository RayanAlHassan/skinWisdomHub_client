
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './SingleCard.module.css';
import { useParams } from 'react-router-dom';
import LoadingPage from '../LoadingPage';
import { colors } from '@mui/material';
const SingleCard = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Access the id parameter from the URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Extract the product ID from the URL parameters
        const productId = window.location.pathname.split('/').pop();
        const response = await axios.get(`${process.env.REACT_APP_PATH}product/getone/${productId}`);
        console.log(productId)

        setProduct(response.data);
        console.log("heyyyyyy",response.data)
        setLoading(false);
      } catch (error) {
        setError('Error fetching product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Empty dependency array to ensure the effect runs only once

  if (loading) {
    return <LoadingPage/>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <main className={style.container}>
    <div key={product._id} className={style.content}>
      <div className={style.left}>
        <img className={style.img} src={`${process.env.REACT_APP_PATH}images/${product.image}`} alt={product.name} />
      </div>
      <div className={style.right}>
        <p className={style.subCategory}>  {product.subCategoryID.name}</p> {/* Accessing the name property */}
        <p className={style.name}>{product.name}</p>
        <p className={style.skinType}>For {product.skinType} Skin</p>
        <p className={style.description}> {product.description}</p>

        <ul  className={style.ingredients}>
          <p className={style.ingredientsTitle}>Ingredients:</p>
          {product.ingrediantsID ? (
            product.ingrediantsID.map((ingredient, index) => (
              <li key={index} className={style.li}>
              <span className={style.nameIng}> {ingredient.name}:</span> <span className={style.descIng}> {ingredient.description}</span> 
              </li>
            ))
          ) : (
            <li>No ingredients available</li>
          )}
        </ul>
      </div>
    </div>
  </main>
    </>

  );
  
 
  
};

export default SingleCard;
