import React, { useEffect, useState } from "react";
import img from "../../assets/images/hero.jpg";
import style from "./Testimoniol.module.css";
import axios from "axios";

function Testimoniol() {
  const [isLoadingTestimoniol, setIsLoadingTestimoniol] = useState(true);
  const [testimoniolData, setTestimoniolData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/testimoniol/");
        if (!response.data) {
          throw new Error("Failed to fetch testimoniol");
        }
        console.log(response.data);
        setTestimoniolData(response.data);
        setIsLoadingTestimoniol(false);
      } catch (error) {
        console.error(error);
        setIsLoadingTestimoniol(false);
      }
    };

    fetchData();
  }, []);
  return (
    <section id="ourproducts" className={style.content}>
      <h2 className={style.title}>Testimoniol From Our Users</h2>
      <div className={style.cards}>
        {testimoniolData.map((element) => {
          return (
            <div className={style.card} key={element._id}>
              <div className={style.detail}>
                <h4>namee :{element?.userID?.name}</h4>
                <p className={style.feedback}>{element.feedback}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Testimoniol;
