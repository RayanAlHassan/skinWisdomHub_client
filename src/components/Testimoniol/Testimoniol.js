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
        const response = await axios.get(`${process.env.APP_BACKEND}testimoniol/`);
        console.log("sssssssssssssssssssssssssssssss",response.data)
        
        if (!response.data) {
          throw new Error("Failed to fetch testimoniol");
        }
        
        // Filter testimonials with status "pending"
        const pendingTestimonials = response.data.filter(testimonial => testimonial.status === "pending");

        setTestimoniolData(pendingTestimonials);
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
        {isLoadingTestimoniol ? (
          <p>Loading...</p>
        ) : (
          testimoniolData.map((element) => (
            <div className={style.card} key={element._id}>
              <div className={style.detail}>
                <h4 className={style.name}>{element?.userID?.name}</h4>
                <p className={style.feedback}>{element.feedback}</p>
              </div>
              {/* <div className={style.topLeft}>
              <img
              src={`http://localhost:5000/images/${element?.userID?.image}`}
              className={style.profileUser}
                alt="profile user"
              />
              <p className={style.name}>{element.userID?.name}</p>
            </div> */}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Testimoniol;
