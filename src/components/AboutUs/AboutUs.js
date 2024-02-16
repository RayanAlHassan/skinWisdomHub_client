import React from "react";
import pd from "../../assets/images/pd.jpg"
import style from "./AboutUs.module.css"; // Import the CSS module
// import trust from "../../assets/images/"
function AboutUs() {
  return (
    <main className={style.container}> {/* Apply the 'container' class */}
      <div className={style.left}>
        <img className={style.imgg} src={pd} width="100%" height="100%" />
        
        </div> {/* Apply the 'left' class */}
      <div className={style.right}>
        <div className={style.div}>
          <h1 className={style.header}>About Us</h1> {/* Apply the 'header' class */}
          <p className={style.action}> {/* Apply the 'action' class */}
            Welcome to <span>SkinWiz</span>, where we're here to help you understand
            your skin better and find the right products for you. In today's world,
            it's easy to get caught up in trends and influencer recommendations, but
            we're here to provide clear, straightforward advice. Our team of
            skincare enthusiasts and experts is dedicated to giving you honest,
            unbiased reviews and personalized recommendations tailored to your skin
            type. We believe in transparency and safety, ensuring that the products
            we recommend are effective and suitable for your skin. Join us in our
            mission to promote healthy, happy skin – let's navigate the world of
            skincare together. Thank you for choosing <span>SkinWiz</span> as your
            trusted skincare advisor.
          </p>
        </div>
      </div>
    </main>
  );
}

export default AboutUs;
