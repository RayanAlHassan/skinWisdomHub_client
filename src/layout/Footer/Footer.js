import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.module.css";
import styles from "./Footer.module.css";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const handleScrollToAbout = () => {
    setMenuOpen(false); // Close the menu if it's open

    // Use JavaScript to scroll to the "About Us" section smoothly
    document.getElementById("aboutus").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container__wrapper}`}>
        <div className={styles.logo__description}>
          <Link
            style={{ textDecoration: "none" }}
            to={"/"}
            className={styles.logo__container}
          >
            <div className={styles.logo__wrapper}>
              {/* <div className={styles.logo}>
                <img src={confluence} alt="" />
              </div> */}
              <p className={styles.logo__name}>skinWis</p>
            </div>
          </Link>
          <p className={styles.slogan}>
            SkinWiz is your go-to destination for comprehensive skincare product
            reviews. Our expert team meticulously analyzes a wide range of
            skincare products, providing you with honest and unbiased
            assessments.
          </p>
        </div>
        <div className={styles.company}>
          <h3 className={styles.section__title}>Website Sections</h3>
          <ul className={styles.links}>
            <Link style={{ textDecoration: "none" }} to="/">
              <li>Home</li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/Reviews">
              <li>Reviews</li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/forYou">
              <li>ForYou</li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/freequentQuestion">
              <li>FAQs</li>
            </Link>
          </ul>
        </div>
        <div className={styles.company}>
          <h3 className={styles.section__title}>Navigation Links</h3>
          <ul className={styles.links}>
            <Link
              to={location.pathname === "/" ? "#" : "/"}
              style={{ textDecoration: "none" }}
              onClick={handleScrollToAbout} // Call handleScrollToAbout when clicked
            >
              <li> About Us</li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/login">
              <li>Join Us</li>
              {/* <h3 className={styles.section__title}>Follow Us</h3> */}
              <div className={styles.social__icons}>
                {/* <a
                  href="https://www.instagram.com/souhad_moussa/?igsh=MXZ0amw0cnF4aGthcQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram
                    className={styles.icon}
                    style={{ fill: "var(--bcg--top)" }}
                  />
                </a> */}
                <a
                  href="https://www.linkedin.com/in/rayan-alhassan-bb355b216/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    className={styles.icon}
                    style={{ fill: "var(--bcg--top)" }}
                  />
                </a>
                <a
                  href="https://wa.me/76303610"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp
                    className={styles.icon}
                    style={{ fill: "var(--bcg--top)" }}
                  />
                </a>
              </div>
            </Link>
            {/* <a href="https://wa.me/70572631" target="_blank" style={{ textDecoration: 'none' }}>
  <li style={{ display: 'flex', alignItems: 'center' }}>
    Contact Us
  </li>
</a> */}

            {/* <Link  style={{textDecoration:'none'}} to="/login">
              <li>
              <img src={anglesRight} alt="" style={{ filter: 'brightness(1) invert(1) sepia(100%) saturate(10000%) hue-rotate(168deg)' }} />
                Login
              </li>
            </Link> */}
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        © 2024 - Homedy All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
