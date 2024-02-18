import React from 'react'
import styles from "./Cards.module.css"
import image from "../../assets/images/serum.jpg"
import { Link } from 'react-router-dom';


const data = [
    {
      id: 1,
      brand: "la roshe pose",
      img: image,
      categoryID: "face",
      subCategoryID: "cleansing",
      description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
      image: image, // Replace with actual image URL
      skinType: "All skin types",
      ingredients: [
        {
          name: "Chamomile Extract",
          description: "Soothes and calms the skin, reducing redness and irritation."
        },
        {
          name: "Aloe Vera Extract",
          description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
        },
        {
          name: "Glycerin",
          description: "Attracts moisture to the skin, keeping it soft and supple."
        },
        {
          name: "Coco-Betaine",
          description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
        }
      ]
    },
    {
        id: 2,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      },
      {
        id: 3,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      },
      {
        id: 4,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      },
      {
        id: 5,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      },
      {
        id: 6,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      }, {
        id: 7,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      }, {
        id: 8,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      }, {
        id: 9,
        brand: "la roshe pose",
        img: image,
        categoryID: "face",
        subCategoryID: "cleansing",
        description: "This gentle cleansing foam effectively removes impurities while nourishing the skin. Formulated with natural extracts including chamomile and aloe vera, it leaves your skin feeling refreshed and revitalized.",
        image: image, // Replace with actual image URL
        skinType: "All skin types",
        ingredients: [
          {
            name: "Chamomile Extract",
            description: "Soothes and calms the skin, reducing redness and irritation."
          },
          {
            name: "Aloe Vera Extract",
            description: "Hydrates and moisturizes the skin, promoting a healthy complexion."
          },
          {
            name: "Glycerin",
            description: "Attracts moisture to the skin, keeping it soft and supple."
          },
          {
            name: "Coco-Betaine",
            description: "Gently cleanses without stripping away natural oils, leaving the skin balanced."
          }
        ]
      },
  ];
const Cards = () => {
    return (
      <div className={styles.container}>

        {data.map((item) => (
                          <Link to={`/card/${item.id}`} key={item.id} className={styles.link}>

          <div key={item.id} className={styles.card}>
            <div className={styles.cardContent}>
            <p className={styles.subCategory}>Subcategory: {item.subCategoryID}</p>

              <img className={styles.img} src={item.img} alt={item.brand} />
              <div className={styles.details}>
                <p className={styles.brand}>{item.brand}</p>
                <p className={styles.skinType}>Skin Type: {item.skinType}</p>
              </div>
            </div>
            <div className={styles.hoverDetails}>
              <p className={styles.subCategory}>Subcategory: {item.subCategoryID}</p>
              <p className={styles.brand}>Brand: {item.brand}</p>
              <ul className={styles.ingredients}>
                <p className={styles.ingredientsTitle}>Ingredients:</p>
                {item.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.name}</li>
                ))}
              </ul>
            </div>
          </div>
            </Link>
        ))}
      </div>
    );
  };
export default Cards
