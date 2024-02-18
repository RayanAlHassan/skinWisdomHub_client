import React from 'react';
import style from './SingleCard.module.css';
import image from '../../assets/images/serum.jpg';

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

const SingleCard = ({ id }) => {
  // Find the item with the provided id
  const item = data.find(item => item.id === id);

  if (!item) {
    return null; // Or you can render a loading indicator or an error message
  }
  const imgSrc = item.img ? item.img : ''; // Set imgSrc to an empty string if item.img is undefined

  return (
    <div className={style.container}>
      <div className={style.left}>
        <img className={style.img} src={imgSrc} alt={item.brand} />
      </div>
      <div className={style.right}>
        <h2>{item.brand}</h2>
        <p>Category: {item.categoryID}</p>
        <p>Subcategory: {item.subCategoryID}</p>
        <p>Description: {item.description}</p>
        <p>Skin Type: {item.skinType}</p>
        <ul>
          <p>Ingredients:</p>
          {item.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}: {ingredient.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default SingleCard;
