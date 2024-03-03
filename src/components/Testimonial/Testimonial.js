// import React, { useEffect, useState } from "react";
// import img from "../../assets/images/hero.jpg";
// import style from "./Testimoniol.module.css";
// import axios from "axios";
// import LoadingPage from "../LoadingPage";

// function Testimoniol() {
//   const [isLoadingTestimoniol, setIsLoadingTestimoniol] = useState(true);
//   const [testimoniolData, setTestimoniolData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_PATH}testimoniol/`
//         );
//         console.log("tset", response.data);

//         if (!response.data) {
//           throw new Error("Failed to fetch testimoniol");
//         }

//         // Filter testimonials with status "pending"
//         const pendingTestimonials = response.data.filter(
//           (testimonial) => testimonial.status === "pending"
//         );

//         setTestimoniolData(pendingTestimonials);
//         setIsLoadingTestimoniol(false);
//       } catch (error) {
//         console.error(error);
//         setIsLoadingTestimoniol(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <section id="ourproducts" className={style.content}>
//       <h2 className={style.title}>Testimoniol From Our Users</h2>
//       <div className={style.cards}>
//         {isLoadingTestimoniol ? (
//           // <p>Loading...</p>
//           <LoadingPage />
//         ) : (
//           testimoniolData.map((element) => (
//             <div className={style.card} key={element._id}>
//               <div className={style.detail}>
//                 <div className={style.head}>
//                   {" "}
//                   <h4 className={style.name}>{element?.userID?.name}</h4>
//                 </div>
//                 <div className={style.desc}>
//                 <p className={style.feedback}>{element.feedback}</p>

//                 </div>
//               </div>
//               {/* <div className={style.topLeft}>
//               <img
//               src={`http://localhost:5000/images/${element?.userID?.image}`}
//               className={style.profileUser}
//                 alt="profile user"
//               />
//               <p className={style.name}>{element.userID?.name}</p>
//             </div> */}
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// }

// export default Testimoniol;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Arrival.css";
import LoadingPage from "../LoadingPage";
import style from "./Testimonial.module.css";

const Testimonial = () => {
  const [positionIndex, setPositionIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PATH}testimoniol/`
        );
        const data = response.data.filter(
          (testimonial) => testimonial.status === "pending"
        );
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <section>
    <h2 className={style.title}>Testimonial From Our Users</h2>

    <div className="testimonial-container">

      {loading ? (
        <LoadingPage />
      ) : (
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`testimonial-card ${
                index === positionIndex ? "center-card" : ""
              }`}
              style={{ zIndex: index === positionIndex ? 5 : 1 }}
              animate={{
                opacity: index === positionIndex ? 1 : 0.5,
                scale: index === positionIndex ? 1 : 0.8,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-detail">
                <div className="testimonial-head">
                  <h4 className="testimonial-name">
                    {testimonial?.userID?.name}
                  </h4>
                </div>
                <div className="testimonial-desc">
                  <p className="testimonial-feedback">{testimonial.feedback}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </section>
  );
};

export default Testimonial;
