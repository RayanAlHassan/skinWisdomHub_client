import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import styles from "./NavBar.module.css";
import { Spin as Hamburger } from "hamburger-react";
import { AuthContext } from "../../Context/AuthContext";

function NavBar() {
  
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopping, setShopping] = useState(false);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 1197);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsResponsive(screenWidth <= 1197); // Adjust breakpoint as needed
      console.log("Window width:", screenWidth);
    };

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      if (currentScrollPos > prevScrollPos && shopping) {
        setShopping(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, shopping]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };


  const handleScrollToAbout = () => {
    setMenuOpen(false); // Close the menu if it's open
  
    // Use JavaScript to scroll to the "About Us" section smoothly
    document.getElementById("aboutus").scrollIntoView({ behavior: "smooth" });
  };


  return (
<header className={`${styles.header} ${visible ? "" : styles.hidden}`} style={{ backgroundColor: scrollY > 0 ? 'var(--bcg--top)' : '' }}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link className={styles.logo} to={"/"}>
            SkinWiz
          </Link>
        </div>

        <ul
          className={`${isResponsive ? "" : styles.navUl} ${
            isResponsive ? styles.dropdown : ""
          } ${menuOpen ? styles.active : ""}`}
        >
          <li className={styles.li}>
            <NavLink
              className={
                location.pathname === "/" ? styles.activeLink : styles.link
              }
              // style={{ color: "var(--beij-color)" }}
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              // style={{ color: "var(--beij-color)" }}
              className={
                location.pathname === "/reviews"
                  ? styles.activeLink
                  : styles.link
              }
              to="/reviews"
              onClick={() => setMenuOpen(false)}
            >
              reviews{" "}
            </NavLink>
          </li>

          <li className={styles.li}>
            <NavLink
              className={
                location.pathname === "/forYou"
                  ? styles.activeLink
                  : styles.link
              }
              to="/forYou"
              onClick={() => setMenuOpen(false)}
            >
              forYou{" "}
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              className={
                location.pathname === "/freequentQuestion"
                  ? styles.activeLink
                  : styles.link
              }
              to="/freequentQuestion"
              onClick={() => setMenuOpen(false)}
            >
              FAQs{" "}
            </NavLink>
          </li>

          <li className={styles.li}>
          <NavLink
  to={location.pathname === "/" ? "#" : "/"}
  className={styles.link}
  onClick={handleScrollToAbout} // Call handleScrollToAbout when clicked
>
  About Us
</NavLink>
          </li>
        </ul>
        <div className={styles.containBtn} >
          <button className={styles.cart}>
            {!user ? (
              <NavLink
                className={` ${styles.btn}`}
                to="./login"
                style={{ color: "var(--fonts-color)" }}
              >
                Login{" "}
              </NavLink>
            ) : (
              <NavLink
                style={{ color: "var(--fonts-color)" }}
                className={` ${styles.btn}`}
                to="./"
                onClick={logout}
              >
                logout
              </NavLink>
            )}
          </button>
          {user ? (<Link  to="./userP" style={{backgroundColor:"transparent"}} >
      <FaUser  style={{ color: 'white' ,backgroundColor:"transparent",fontSize: "24px"}} />
      {/* Add text if needed */}
      {/* <span>Profile</span> */}
    </Link> ):("")}
         

          <div className={styles.hamburger} onClick={handleMenuClick}>
            <Hamburger
              easing="ease-in"
              label="Show menu"
              hideOutline={false}
              duration={0.8}
              toggled={menuOpen}
              color="var(--grays-color)"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
