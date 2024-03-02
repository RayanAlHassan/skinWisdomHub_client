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

  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true while submitting
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH}testimoniol/create`,
        formData
      );

      console.log("Server response:", response.data);
      // Reset form data if submission is successful
      setFormData({
        feedback: "",
        userID: user && user._id,
        status: "pending",
      });
      setSubmissionSuccess(true);
      setAddTestimonial(false);
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
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
          <button className={Styles.submitButton} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <button className={Styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
        {submissionSuccess && (
          <p className={Styles.successMessage}>Testimonial submitted successfully!</p>
        )}
      </div>
    </>
  );
};

export default AddTestimonial;
