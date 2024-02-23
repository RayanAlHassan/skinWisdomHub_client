import React from "react";
import style from "./SingleCard.module.css";
import image from "../../assets/images/serum.jpg";

const fakeData = [
  {
    id: 1,
    brand: "FAKE BRAND",
    img: image,
    description:
      "A nutrient-rich, lightweight essence that boosts barrier function and provides immediate, luminous hydration. Hailey's essential prep step to calm skin and begin the rhode routine. ",
    subCategoryID: "fakeSubCateg1",
    skinType: "oil skin",
    ingredients: [
      {
        name: "Fake Ingredient 1",
        description: "Description of Fake Ingredient 1",
      },
      {
        name: "Fake Ingredient 2",
        description: "Description of Fake Ingredient 2",
      },
    ],
  },

  // Add more fake data objects as needed
];

const SingleCard = () => {
  return (
    <div className={style.container}>
      {fakeData.map((item) => (
        <div key={item.id} className={style.content}>
          <div className={style.left}>
            <img className={style.img} src={item.img} alt={item.brand} />
          </div>
          <div className={style.right}>
            <p className={style.subCategory}> {item.subCategoryID}</p>
            <p className={style.brand}>BRAND: {item.brand}</p>
            <p className={style.skinType}>Skin Type: {item.skinType}</p>
            <p className={style.description}>description: {item.description}</p>

            <ul className={style.ingredients}>
              <p className={style.ingredientsTitle}>Ingredients:</p>
              {item.ingredients.map((ingredient, index) => (
                <li key={index} className={style.li}>
                  {ingredient.name}: {ingredient.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleCard;
