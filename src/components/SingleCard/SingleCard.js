// import React from "react";
// import style from "./SingleCard.module.css";
// import image from "../../assets/images/serum.jpg";

// const fakeData = [
//   {
//     id: 1,
//     name: "FAKE BRAND",
//     img: image,
//     description:
//       "A nutrient-rich, lightweight essence that boosts barrier function and provides immediate, luminous hydration. Hailey's essential prep step to calm skin and begin the rhode routine. ",
//     subCategoryID: "fakeSubCateg1",
//     skinType: "oil skin",
//     ingredients: [
//       {
//         name: "Fake Ingredient 1",
//         description: "Description of Fake Ingredient 1",
//       },
//       {
//         name: "Fake Ingredient 2",
//         description: "Description of Fake Ingredient 2",
//       },
//     ],
//   },

//   // Add more fake data objects as needed
// ];

// const SingleCard = () => {
//   return (
//     <div className={style.container}>
//       {fakeData.map((item) => (
//         <div key={item.id} className={style.content}>
//           <div className={style.left}>
//             <img className={style.img} src={item.img} alt={item.name} />
//           </div>
//           <div className={style.right}>
//             <p className={style.subCategory}> {item.subCategoryID}</p>
//             <p className={style.brand}>BRAND: {item.brand}</p>
//             <p className={style.skinType}>Skin Type: {item.skinType}</p>
//             <p className={style.description}>description: {item.description}</p>

//             <ul className={style.ingredients}>
//               <p className={style.ingredientsTitle}>Ingredients:</p>
//               {item.ingredients.map((ingredient, index) => (
//                 <li key={index} className={style.li}>
//                   {ingredient.name}: {ingredient.description}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SingleCard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './SingleCard.module.css';
import { useParams } from 'react-router-dom';
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
        const response = await axios.get(`http://localhost:5000/product/getone/${productId}`);
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <div className={style.container}>
    <div key={product._id} className={style.content}>
      <div className={style.left}>
        <img className={style.img} src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
      </div>
      <div className={style.right}>
        <p className={style.subCategory}>  {product.subCategoryID.name}</p> {/* Accessing the name property */}
        <p className={style.name}>{product.name}</p>
        <p className={style.skinType}>For {product.skinType} Skin</p>
        <p className={style.description}> {product.description}</p>

        <ul className={style.ingredients}>
          <p className={style.ingredientsTitle}>Ingredients:</p>
          {product.ingrediantsID ? (
            product.ingrediantsID.map((ingredient, index) => (
              <li key={index} className={style.li}>
              <span className={style.nameIng}> {ingredient.name}:</span> <span className={style.descIng}>{ingredient.description}</span> 
              </li>
            ))
          ) : (
            <li>No ingredients available</li>
          )}
        </ul>
      </div>
    </div>
  </div>
    </>

  );
  
 
  
};

export default SingleCard;
