import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import styles from "./NavBar.module.css";
import { Spin as Hamburger } from "hamburger-react";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../components/Button/Button";
import logoo from "../../assets/icons/purpleLogo.png";
import starLogo from "../../assets/icons/star.png";

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

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
  // useEffect(() => {
  //   // Listen for changes in the user state
  //   // and update local state accordingly
  //   if (user) {
  //     console.log(user)
  //     setVisible(true); // Ensure visibility when user is logged in
  //   }
  // }, [user]);

  return (
    <header
      className={`${styles.header} ${visible ? "" : styles.hidden}`}
      style={{ backgroundColor: scrollY > 0 ? "var(--bcg--top)" : "" }}
    >
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link className={styles.logo} to={"/"}>
            {/* <div className={styles.divImgLogo}> */}
            {/* <img width={"119px"} height={"36px"} src={logoo}style={{position:"relative"}}/>
            <img src={starLogo}className={styles.imgLogo}/>

            */}
            {/* </div> */}
            skinWiz
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
              Reviews{" "}
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
              ForYou{" "}
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

          {/* <li className={styles.li}>
            <NavLink
              to={location.pathname === "/" ? "#" : "/"}
              className={styles.link}
              onClick={handleScrollToAbout} // Call handleScrollToAbout when clicked
            >
              About Us
            </NavLink>
          </li> */}

          {window.innerWidth <= 1200 && (
            <li className={styles.li} onClick={() => setMenuOpen(false)}>
              {!user ? (
                <NavLink className={styles.link} to="./login">
                  Login
                </NavLink>
              ) : (
                <NavLink className={styles.link} to="/" onClick={logout}>
                  Logout
                </NavLink>
              )}
            </li>
          )}
          {user && window.innerWidth <= 1197 && (
            <li className={styles.li} onClick={() => setMenuOpen(false)}>
              <Link to="./userP" className={styles.userLink}>
                <FaUser
                  style={{
                    color: "white",
                    backgroundColor: "transparent",
                    fontSize: "24px",
                  }}
                />
              </Link>
            </li>
          )}
        </ul>
        <div className={styles.containBtn}>
          {window.innerWidth > 1200 && (
            <button className={styles.cart}>
              {!user ? (
                <NavLink className={` ${styles.btn}`} to="./login">
                  Login
                </NavLink>
              ) : (
                <NavLink className={` ${styles.btn}`} to="/" onClick={logout}>
                  Logout
                </NavLink>
              )}
            </button>
          )}
          {/* <button onClick={logout}>logggouttt</button> */}
 {/* Conditional rendering of user icon */}
 {user && window.innerWidth >1197 && (
            <li className={styles.li} onClick={() => setMenuOpen(false)}>
              <Link to="./userP" className={styles.userLink}>
                <FaUser
                  style={{
                    color: "white",
                    backgroundColor: "transparent",
                    fontSize: "24px",
                  }}
                />
              </Link>
            </li>
          )}

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
