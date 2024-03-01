import React, { useState, useEffect, useContext } from "react";
import Styles from "./AddPost.module.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const AddPost = ({ setAddPost, fetchData }) => {
  const { user } = useContext(AuthContext);
  const skinTypes = ["Dry", "Oily", "Mix", "All Skin"];
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  console.log("sssssssssssssssssssssssssssssssssssss", user);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    image: "",
    userId: user && user._id,
    categoryID: "",
    subCategoryID: "",
    skinType: "",
  });
  console.log(user);
  ////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      fetchCategories();
    };

    fetchData();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}category/getall`);
      console.log("Response data:", response.data); // Add this line for debugging
      if (response && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        console.error("Invalid data received from server:", response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/category/getall`
  //     );
  //     if (response) {
  //       setCategories(response.data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const fetchSubCategories = async (id) => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_PATH}subCategory/getsubbycategory/${id}`
      );
      setSubCategories(res.data.subCategories);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  /////////////////////////////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryID") {
      fetchSubCategories(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(formData)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("categoryID", formData.categoryID);
      formDataToSend.append("subCategoryID", formData.subCategoryID);
      formDataToSend.append("skinType", formData.skinType);
      formDataToSend.append("userID", formData.userId);

      const response = await axios.post(
        `${process.env.REACT_APP_PATH}reviews`,
        formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },

        }
      );

      console.log("Server response:", response.data);
      setFormData({
        productName: "",
        description: "",
        image: "",
        userId: user && user._id,
        categoryID: "",
        subCategoryID: "",
        skinType: "",
      });
      setAddPost(false);
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("submitting form data:", formData);
  //   try {
  //     const response = await axios.post(`http://localhost:5000/reviews`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     console.log("Server response:", response.data); // Log the server response
  //     // Reset form data if submission is successful
  //     setFormData({
  //       productName: "",
  //       description: "",
  //       image: "",
  //       userId: user && user._id,
  //       categoryID: "",
  //       subCategoryID: "",
  //       skinType: "",
  //     });
  //     // Close the form or handle as needed
  //     onclose();
  //   } catch (error) {
  //     console.log("Error submitting form data:", error.message);
  //   }
  // };
  
  const onclose = () => {
    setAddPost(false);
  };

  return (
    <>
      <div className={Styles.overlay}></div>
      <div className={Styles.container}>
        <h2 className={Styles.h2}>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className={Styles.formGroup}>
            <label className={Styles.label}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={Styles.inputField}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label className={Styles.label}>Image URL:</label>
            <input
              name="image"
              type="file"
              onChange={handleImageChange}
              className={Styles.inputField}
            />
          </div>
          <div className={Styles.formGroup}>
            <label className={Styles.label}>ProdName:</label>
            <input
              name="productName"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className={Styles.inputField}
              required
            />
          </div>
          <div className={Styles.formGroup}>
            {/* <label className={Styles.label}>Category:</label> */}
            <select
              name="categoryID" // Change name to "category"
              value={formData.categoryID || ""}
              onChange={handleChange}
              className={Styles.inputFieldd}
              required
            >
              <option className={Styles.options} value="">Select Category.</option>
              {categories && categories.map((category) => (
            <option  className={Styles.options} key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
            </select>
            {/* <label className={Styles.label}>subCategory:</label> */}
            <select
              name="subCategoryID" // Change name to "category"
              value={formData.subCategoryID || ""} // Update value to formData.category
              onChange={handleChange}
              className={Styles.inputFieldd}
              required
            >
              <option  className={Styles.options} value="">Select subCategory...</option>
              {subCategories &&
            subCategories.map((subCategory) => (
              <option className={Styles.options} key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
            </select>
            {/* <label className={Styles.label}>SkinType:</label> */}
            {/* <select
  name="skinType" // Change name to "category"
  value={formData.skinType} // Update value to formData.category
  onChange={handleChange}
  className={Styles.inputFieldd}
  required
>
  <option value="">Skin Type</option>
  {categories.map(category => (
    <option key={category._id} value={category._id}>{category.title}</option>
  ))}
</select> */}
            <select
              className={Styles.inputFieldd}
              name="skinType"
              value={skinTypes || ""}
              onChange={handleChange}
            >
              <option className={Styles.options} value="">Select Skin Type</option>
              {skinTypes.map((type, key) => (
                <option key={key} value={type}  className={Styles.options}>
                  {type} 
                </option>
              ))}
            </select>
          </div>
          <button className={Styles.submitButton}>Submit</button>
        </form>
        <button className={Styles.cancelButton} onClick={onclose}>
          cancel
        </button>
      </div>
    </>
  );
};

export default AddPost;
