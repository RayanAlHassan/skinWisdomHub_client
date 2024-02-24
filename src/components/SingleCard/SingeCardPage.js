import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleCard from './SingleCard';

const SingleCardPage = ({ match }) => {
  const [product, setProduct] = useState(null);
  const productId = match.params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/getone/${productId}`);
        console.log("hyyyyyyyyyyy",response.data); // Log the fetched product data
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    fetchProduct();
  }, [productId]);
  return (
    <div>
      {product ? (
        <SingleCard product={product} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleCardPage;
