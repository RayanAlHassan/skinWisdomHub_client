// import React, { useState } from "react";
// import styles from "./SignUpForm.module.css";
// import axios from "axios";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { app } from "../../firebase";
// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     email: "",
//     password: "",
//     role: "user",
//     description: "",
//     Link: "",
//   });
//   const [image, setImage] = useState(null); // Adjust as needed

//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };
//   const passwordInputType = showPassword ? "text" : "password";
//   const [logBtn, setLogBtn] = useState(false);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "password" && !passwordRegex.test(value)) {
//       setError(true);
//       setErrorMessage(
//         "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
//       );
//     } else {
//       setError(false);
//       setErrorMessage("");
//     }
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     // Assuming you have an input with type="file" for the image
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.role ||
//       !formData.dob ||
//       !formData.email ||
//       !formData.password ||
//       !formData.description ||
//       !formData.Link
//     ) {
//       setError(true);
//       setErrorMessage("All input fields are required");
//     } else if (error && !passwordRegex.test(formData.password)) {
//       setError(true);
//       setErrorMessage(
//         "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
//       );
//     } else {
//       const formDataToSubmit = new FormData();
//       formDataToSubmit.append("firstName", formData.firstName);
//       formDataToSubmit.append("lastName", formData.lastName);
//       formDataToSubmit.append("dob", formData.dob);
//       formDataToSubmit.append("email", formData.email);
//       formDataToSubmit.append("password", formData.password);
//       formDataToSubmit.append("role", formData.role);
//       formDataToSubmit.append("image", image);
//       formDataToSubmit.append("Link", formData.Link);
//       formDataToSubmit.append("description", formData.description);

//       try {
//         setLoading(true);
//         const addUser = await axios.post(
//           "http://localhost:5000/user/create",
//           formDataToSubmit,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log(addUser);
//         setError(false);
//         setLoading(false);
//         setFormData({
//           firstName: "",
//           lastName: "",
//           dob: "",
//           email: "",
//           password: "",
//           role: "user",
//           description: "",
//           Link: "",
//         });

//         if (addUser) {
//           setLogBtn(true);
//         }
//       } catch (error) {
//         setError(true);
//         setErrorMessage("Something went wrong");
//         setLoading(false);
//         console.error("Error in API call", errorMessage, error);
//       }
//     }
//   }

//   const handleLogin = () => {
//     // Navigate to the login page or perform any other desired action
//     navigate("/login");
//   };

//   const handleOAuth = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const auth = getAuth(app);

//       const result = await signInWithPopup(auth, provider);
//       console.log(result);

//       const displayNameParts = result.user.displayName.split(" ");
//       const firstName = displayNameParts[0];
//       const lastName = displayNameParts.slice(1).join(" ");

//       const res = await axios.post("http://localhost:5000/google/auth", {
//         firstName: firstName,
//         lastName: lastName,
//         email: result.user.email,
//         role: "user",
//         dob: Date.now(),
//         Link: "",
//         description: "",
//       });

//       console.log(res);
//       if (res) {
//         setLogBtn(true);
//         navigate("/login"); // navigate to login as user
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

import React, { useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { app } from "../../firebase";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    role: "user",
    description: "Data Analytics",
  });

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // State to store the name of the selected file
  const [imageUrl, setImageUrl] = useState(""); // State to store the URL of the selected image

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const passwordInputType = showPassword ? "text" : "password";
  const [logBtn, setLogBtn] = useState(false);

  const [descriptionOptions, setDescriptionOptions] = useState([
    "SOFTWARE_DEVELOPMENT",
    "DATA_ANALYTICS",
    "USER_INTERFACE_DESIGN",
    "NETWORK_INFRASTRUCTURE",
    "DEVOPS",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description" && !descriptionOptions.includes(value)) {
      setError(true);
      setErrorMessage("Invalid description selected");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileName(file.name); // Set the name of the selected file
    const imageUrl = URL.createObjectURL(file); // Create temporary URL for the selected image
    setImageUrl(imageUrl); // Set the URL of the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.role ||
      !formData.dob ||
      !formData.email ||
      !formData.password
    ) {
      setError(true);
      setErrorMessage("All input fields are required");
    } else if (error && !passwordRegex.test(formData.password)) {
      setError(true);
      setErrorMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
      );
    } else {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("dob", formData.dob);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("role", formData.role);
      formDataToSubmit.append("image", image);

      try {
        setLoading(true);
        const addUser = await axios.post(
          `${process.env.REACT_APP_PATH}user/create`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(addUser);
        setError(false);
        setLoading(false);
        setFormData({
          name: "",
          dob: "",
          email: "",
          password: "",
          role: "user",
        });

        if (addUser) {
          setLogBtn(true);
        }
      } catch (error) {
        setError(true);
        setErrorMessage("Something went wrong");
        setLoading(false);
        console.error("Error in API call", errorMessage, error);
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

    
      const res = await axios.post(`${process.env.REACT_APP_PATH}google/auth`, {
        name: result.user.displayName,
        email: result.user.email,
        role: "user", // or "admin" depending on your application logic
        dob: Date.now(),
      },{withCredentials:true});

      console.log(res);
      if (res) {
        setLogBtn(true);
        navigate("/userP");
      }
    } catch (err) {
      console.error("Error in sgnup google call", err);
    }
  };

  return (
    <div className={styles["sign-up-container"]}>
      <form onSubmit={handleSubmit} className={styles["sign-up-form"]}>
        <div style={{ margin: "0 auto" }}>
          <Link className={styles.toHome} to="/">
            {" "}
            {"<"}
          </Link>

          <h2 className={styles.title}>Rgistration</h2>
          <hr></hr>
          <div className={styles.flexing}>
            <div className={styles.left}>
              <div className={styles["form-group"]}>
                <label className={styles.label} htmlFor="firstName">
                  {" "}
                  name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  reqclassName={styles.label}
                  uired
                />
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="dob" className={styles.label}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className={styles.label}
                />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles["form-group"]}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.label}
                />
              </div>
              <div className={styles["form-group"]}>
                <label className={styles.label}>Password</label>
                <div className={styles["password-input-container"]}>
                  <input
                    className={styles.label}
                    type={passwordInputType}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <div
                    className={styles["password-toggle"]}
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </div>
                </div>
                {error && (
                  <p className={styles["error-message"]}>{errorMessage}</p>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label className={styles.label}>Role</label>

                {/* <div className={styles.flexingRadioBtn}>
                  <div className={styles["role-radio-group"]}>
                    <div className={styles.radios}>
                      <label htmlFor="user">User</label>
                      <input
                        id="user"
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === "user"}
                        onChange={handleChange}
                        style={{ width: "20%" }}
                      />
                    </div>
                  </div>
                  <div className={styles["role-radio-group"]}>
                    <div className={styles.radios}>
                      <label htmlFor="admin">Admin</label>
                      <input
                        id="admin"
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === "admin"}
                        onChange={handleChange}
                        style={{ width: "20%" }}
                      />
                    </div>
                  </div>
                </div> */}
              </div>
              <div className={styles["form-group"]}>
                <label className={styles.label}>Image</label>

                {/* <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                /> */}
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            {" "}
            <div class="container">
              <div className={styles.card}>
                <h3>Upload Files</h3>
                <div className={styles.drop_box}>
                  <header>
                    <h4 className={styles.title}>Uplaod an image here </h4>
                  </header>
                  <div className={styles.imggFile}>
                    {fileName && (
                      <p>
                        <span className={styles.fileName}>{fileName} </span>
                      </p>
                    )}{" "}
                    {/* Display file name */}
                    {imageUrl && (
                      <img
                        className={styles.selectedImg}
                        src={imageUrl}
                        alt="Selected Image"
                      />
                    )}{" "}
                    {/* Display selected image */}
                  </div>

                  <p style={{ color: "white" }}> </p>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    hidden
                    id="fileID"
                    // style={{display:"none"}}
                  />
                  <label htmlFor="fileID" className={styles.btn}>
                    Choose File
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.flexingRadioBtn}>
            <button className={styles.button} type="submit">
              Sign Up
            </button>
            <button onClick={handleOAuth}>sign up with google</button>

            {/* <button onClick={handleOAuth}>sign up with google</button> */}
          </div>

          {logBtn && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                textAlign: "center",
                fontSize: "12px",
                margin: "10px auto",
              }}
            >
              <p className={styles.title}>You've Successfully Registred</p>
              <button
                type="submit"
                onClick={handleLogin}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25px",
                  width: "80px",
                  textAlign: "center",
                  fontSize: "12px",
                  margin: "10px auto",
                }}
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
