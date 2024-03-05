// import { createContext, useReducer, useEffect } from "react";
// import axiosInstance from "../Utils/AxiosInstance.js";

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "login":
//       return { user: action.payload };
//     case "logout":
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//   });

//   useEffect(() => {
//     const storedUser = localStorage.getItem("authUser");
//     if (storedUser) {
//       dispatch({ type: "login", payload: JSON.parse(storedUser) });
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("state", JSON.stringify(state.user));
//   }, [state]);

//   useEffect(() => {
//     if (state.user) {
//       localStorage.setItem("authUser", JSON.stringify(state.user));
//     }
//   }, [state.user]);

//   const setUser = (userData) => {
//     dispatch({ type: "login", payload: userData });
//     localStorage.setItem("authUser", JSON.stringify(userData));
//         localStorage.setItem("state", JSON.stringify(userData));

//     console.log("userdata:", userData);
//   };

// const fetchUserData = async () => {
//   try {
//     const authUser = JSON.parse(localStorage.getItem("authUser"));

//     if (!authUser || !authUser.user.id) {
//       console.error("Invalid user data in local storage");
//       return;
//     }

//     const response = await axiosInstance.get(
//       `http://localhost:5000/user/view-one/${authUser.user.id}`
//     );

//     console.log("Response from server:", response);

//     if (response.status === 200 && response.data && response.data.User) {
//       setUser(response.data.User); // Update this line
//       console.log("User data fetched successfully:", response.data.User);
//     } else {
//       console.error("Invalid user data in the response:", response);
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// };

//   const logout = async () => {
//     console.log("Logout function called");
//     try {
//       await axiosInstance.post("http://localhost:5000/user/logout");
//       dispatch({ type: "logout" });
// } catch (error) {
//   console.error("Error logging out:", error);
// } finally {
//       localStorage.clear();
//     }
//   };
//   return (
//     <AuthContext.Provider value={{ ...state, setUser, fetchUserData, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
////////////////////////////////////////////////////

// withe cookies not local storage
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/AxiosInstance.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    // console.log(user);
    if (checkUser) {
      // fetchUserData();
      console.log("tryy");
      fetchOne();
    } else {
      console.log("user updatedd");
    }
  }, [checkUser, user]);

  // useEffect(() => {
  //   if (!user && user === null) {
  //     fetchOne();
  //   }
  // }, [user, userUpdated]);

  //   useEffect(()=>{
  // if(!user)
  //   },[])

  // const fetchUserData = async () => {
  //   try {
  //     setCheckUser(true);
  //     const response = await axiosInstance.get(`/user/view-all`, {
  //       withCredentials: true,
  //     });
  //     setUser(response.data.user);
  //   } catch (err) {
  //     setUser(null);
  //   } finally {
  //     setCheckUser(false);
  //   }
  // };
  const fetchOne = async () => {
    try {
      setCheckUser(true);
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}user/loggedIn`,
        { withCredentials: true }
      );
      setUser(response.data.user);
      // console.log(response.data.user);
      setUserUpdated(false);
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setCheckUser(false);
    }
  };

  const logout = async () => {
    try {
      console.log("user beforrr logout", user);

      const response = await axios.post(`http://localhost:5000/user/logout`);
      setUser(null);
      console.log(response.data);
      navigate("/");
      console.log("user after logout", user);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, checkUser, fetchOne, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
