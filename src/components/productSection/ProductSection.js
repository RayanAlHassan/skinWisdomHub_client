import React, { useEffect, useState } from "react";
import placeholder from "../../assets/images/model.jpg";
import Slider from "react-slick";
import style from "./ProductSection.module.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom

import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSection = () => {
  console.log(process.env.REACT_APP_PATH);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productData, setProductData] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PATH}product/GetLastEight`
        );
        if (!response.data) {
          throw new Error("Failed to fetch products");
        }
        console.log(response.data);
        setProductData(response.data.products);
        setIsLoadingProducts(false);
      } catch (error) {
        console.error(error);
        setIsLoadingProducts(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    autoplaySpeed: 2500,
    autoplay: true,
    pauseOnHover: true,

    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleDescriptionExpansion = (productId) => {
    setExpandedDescriptionId(
      productId === expandedDescriptionId ? null : productId
    );
  };

  return (
    <section id="ourproducts" className={style.contentsection}>
      <h2 className={style.title}>Most recent product</h2>
      <div className={style.cards}>
        <Slider {...settings}>
          {productData.map((element) => {
            const isDescriptionExpanded = expandedDescriptionId === element._id;
            return (
              <div className={style.card} key={element._id}>
                <NavLink
                  // to={`/singleProduct/${element.slug}`}
                  className={style.productHolder}
                  key={element._id}
                  onClick={() => navigate(`/card/${element._id}`)} // Navigate to SingleCard on click
                >
                  <h1 className={style.subtitle}>
                    {element.subCategoryID.name}
                  </h1>{" "}
                  <img
                    className={style.imgg}
                    src={`${process.env.REACT_APP_PATH}images/${element.image}`}
                    alt="product"
                  />
                  <div className={style.details}>
                    <div>
                      <h4>{element.name}</h4>
                      <p className={style.description}>
                        {isDescriptionExpanded ? (
                          element.description
                        ) : (
                          <>
                            {element.description.slice(0, 30)}...{" "}
                            <span
                              className={style.viewMore}
                              onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                toggleDescriptionExpansion(element._id);
                              }}
                            >
                              View More
                            </span>
                          </>
                        )}
                      </p>
                      <p>{element.skinType}</p>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default ProductSection;
