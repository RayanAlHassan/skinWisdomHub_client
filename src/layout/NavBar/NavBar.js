import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Spin as Hamburger } from "hamburger-react";
import { AuthContext } from "../../Context/AuthContext";
import styles from "./NavBar.module.css";

function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 1197);
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  // Handle window resize and scroll
  useEffect(() => {
    const handleResize = () => setIsResponsive(window.innerWidth <= 1197);
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setScrollY(currentScrollPos);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={`${styles.header} ${visible ? "" : styles.hidden}`}
      style={{ backgroundColor: scrollY > 0 ? "var(--bcg--top)" : "" }}
    >
      <nav className={styles.nav}>
        <Link className={styles.logo} to={"/"}>
          skinWiz
        </Link>

        {/* Navigation links */}
        <ul
          className={`${isResponsive ? styles.dropdown : styles.navUl} ${
            menuOpen ? styles.active : ""
          }`}
        >
          {[
            { path: "/", name: "Home" },
            { path: "/reviews", name: "Reviews" },
            { path: "/forYou", name: "ForYou" },
            { path: "/freequentQuestion", name: "FAQs" },
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* Mobile menu: login/logout & user icon */}
          {isResponsive && (
            <>
              {!isLoggedIn ? (
                <li onClick={() => setMenuOpen(false)}>
                  <NavLink to="/login" className={styles.link}>
                    Login
                  </NavLink>
                </li>
              ) : (
                <>
                  <li onClick={() => setMenuOpen(false)}>
                    <NavLink to="/" onClick={logout} className={styles.link}>
                      Logout
                    </NavLink>
                  </li>
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/userP" className={styles.userLink}>
                      <FaUser
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        {/* Desktop: login/logout & user icon */}
        {!isResponsive && (
          <div className={styles.containBtn}>
            {!isLoggedIn ? (
              <NavLink className={styles.btn} to="/login">
                Login
              </NavLink>
            ) : (
              <>
                <NavLink className={styles.btn} to="/" onClick={logout}>
                  Logout
                </NavLink>
                <Link to="/userP">
                  <FaUser style={{ fontSize: "24px", color: "white" }} />
                </Link>
              </>
            )}
          </div>
        )}

        {/* Hamburger menu for mobile */}
        {isResponsive && (
          <div
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Hamburger
              easing="ease-in"
              label="Show menu"
              hideOutline={false}
              duration={0.8}
              toggled={menuOpen}
              color="var(--grays-color)"
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
