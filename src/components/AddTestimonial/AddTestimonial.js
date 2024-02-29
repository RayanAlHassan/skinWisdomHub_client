import React, { useState, useEffect, useContext } from "react";
import Styles from "./AddTestimonial.module.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const AddTestimonial = ({ setAddTestimonial, fetchData }) => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    feedback: "",
    userID: user && user._id,
    status: "pending", // Set default status as "pending"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/testimoniol/create",
        formData
      );

      console.log("Server response:", response.data);
      // Reset form data if submission is successful
      setFormData({
        feedback: "",
        userID: user && user._id,
        status: "pending",
      });
      setAddTestimonial(false);
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };
  
  const onClose = () => {
    setAddTestimonial(false);
  };

  return (
    <>
      <div className={Styles.overlay}></div>
      <div className={Styles.container}>
        <h2 className={Styles.h2}>Add New Testimonial</h2>
        <form onSubmit={handleSubmit}>
          <div className={Styles.formGroup}>
            <label className={Styles.label}>Feedback:</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className={Styles.inputField}
              required
            />
          </div>
          <button className={Styles.submitButton}>Submit</button>
        </form>
        <button className={Styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddTestimonial;
