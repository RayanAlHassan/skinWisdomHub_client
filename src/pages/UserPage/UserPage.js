import React, { useContext, useEffect, useState } from "react";
import style from "./UserPage.module.css";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import image from "../../assets/images/cleanse.jpg";
import CardContent from "@mui/material/CardContent";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import pfUser from "../../assets/images/pexels-polina-kovaleva-6543263.jpg";
import { FaComment, FaEnvelope } from 'react-icons/fa';
import AddPost from "../../components/AddPost/AddPost";
import AddTestimonial from "../../components/AddTestimonial/AddTestimonial";


function UserPage() {
  const [addPostVisible, setAddPostVisible] = useState(false); // State variable to manage the visibility of AddPost
  const [addTestimonialVisible, setAddTestimonialVisible] = useState(false); // State variable to manage the visibility of AddTestimonial

  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleOpenModal = (id) => {
    setSelectedReviewId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [reviewsResponse, commentsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_PATH}reviews/byuser/${user._id}`),
          axios.get(`${process.env.REACT_APP_PATH}comments/`),
        ]);
        if (reviewsResponse && commentsResponse) {
          setReviews(
            reviewsResponse.data.map((review) => ({
              ...review,
              selectedRating: 0,
            }))
          );
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [ user && user._id]);
  const toggleAddPost = () => {
    setAddPostVisible(!addPostVisible);
  };
  const toggleAddTestimonial = () => {
    setAddTestimonialVisible(!addTestimonialVisible);
  };
  const filteredReviews = reviews.filter(
    (review) =>
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.skinType.toLowerCase().includes(searchQuery.toLowerCase())
  );
  function formatTimeSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      if (days === 1) {
        return "Yesterday";
      } else {
        return date.toLocaleDateString(); // You can format the date however you want
      }
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else {
      return "just now";
    }
  }
  const fetchAverageRating = async (reviewId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}reviews/${reviewId}/averageRating`
      );
      if (response) {
        return response.data.averageRating;
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };
  const handleSubmit = async (value, id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_PATH}rate/create`, {
        reviewID: id,
        value: value,
        userID: user._id,
      });
      if (response) {
        console.log("Response:", response.data);
        console.log("userr authontext", user);
        setReviews(
          reviews.map((review) => {
            if (review._id === id) {
              return {
                ...review,
                rate: response.data.rate,
              };
            }
            return review;
          })
        );

        // Fetch and update average rating
        const averageRating = await fetchAverageRating(id);
        if (averageRating !== undefined) {
          setReviews(
            reviews.map((review) => {
              if (review._id === id) {
                return {
                  ...review,
                  rate: averageRating,
                };
              }
              return review;
            })
          );
        }
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH}comments/create`,
        {
          reviewID: selectedReviewId,
          feedback: newComment,
          userID: user._id,
        }
      );
      if (response) {
        console.log("Comment added:", response.data);
        setComments([...comments, response.data]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <section className={style.container}>
      <div className={style.top}> 
      <div className={style.containImg}>
      <img
          src={`${process.env.REACT_APP_PATH}images/${user?.image}`}
          className={style.pfImg}
        />
      </div>
       
        {/* {console.log(`http://localhost:5000/${user?.image}`)} */}
      </div>
      <div className={style.center}>
        <div className={style.left}>
          {/* <div className={style.cardInfo}> */}
          <h2 className={style.nameLeft}> {user?.name}</h2>
          <p className={style.mail}> <FaEnvelope style={{fontSize:"24px"}} color="rgb(232, 225, 225)"  />{user?.email}</p>

          {/* </div> */}
         
          <p className={style.DOB}>{user && new Date(user?.dob).toLocaleDateString()}</p> {/* Display only the date */}
          <div className={style.btns}>
      
      <button className={style.btn2} onClick={toggleAddPost}>Add Post</button>
      {addPostVisible && <AddPost setAddPost={setAddPostVisible} />} {/* Render AddPost conditionally */}

      <button className={style.btn2} onClick={toggleAddTestimonial}>Add Testimonial</button>
             
          </div>
          {addTestimonialVisible && <AddTestimonial setAddTestimonial={setAddTestimonialVisible} />} {/* Render AddTestimonial conditionally */}
        </div>
        <div className={style.right}>
         

          {/* /////////////////////posts/////////////// */}
          <div className={style.containerPost}>
            {/* Posts */}
            {console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr",reviews)}
            {console.log("fffffffffffffffffffff",filteredReviews)}

            {reviews.map((rev) => (
              <div key={rev._id} className={style.post}>
                <div className={style.postTop}>
                  <div className={style.topLeft}>
                    {rev.userID.image ? (
                      <img
                        src={`${process.env.REACT_APP_PATH}images/${rev.userID.image}`}
                        className={style.profileUser}
                        alt="profile user"
                      />
                    ) : (
                      <img
                        src={image}
                        className={style.profileUser}
                        alt="profile user"
                      />
                    )}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p className={style.name}>{rev?.userID?.name}</p>
                      <p className={style.time}>
                        {formatTimeSince(rev.createdAt)}
                      </p>
                      {console.log("subCategory name",rev.subCategoryID.name)}
                    </div>
                  </div>
                  <div className={style.topCenter}>
              <p
                className={style.productName}
                // style={{ fontWeight: "900", fontSize: "22px" }}
              >
                {/* {console.log("heyyy",`http://localhost:5000/images/${rev.userID.image}`)} */}
                {rev.subCategoryID.name}
             
              </p>
              <p className={style.subCategory}>   {rev.productName}</p>

            </div>
                </div>
                <div className={style.centerPost}>
                  <p className={style.skinType}>{rev.skinType}</p>
                  <p className={style.desc}>{rev.description}</p>

                  <img
                    src={`${process.env.REACT_APP_PATH}images/${rev.image}`}
                    className={style.posttt}
                    alt="rev"
                  />
                </div>
                <div className={style.rating}>
            
                  <span style={{ display: "flex", alignItems: "center" ,height:"fitContent"}}>
                    <span style={{ fontWeight: "900", fontSize: "20px" }}>
                      ( {Math.round(rev.rate * 100) / 100} )
                    </span>
                    <StarIcon style={{ color: "yellow" , fontSize:"20px" }} />
                  </span>
                  <button
                    className={style.commentButton}
                    onClick={() => handleOpenModal(rev._id)}
                  >
                    <FaComment color="var(--Font-color)"/>
                  </button>
                </div>
              </div>
            ))}

            {/* Comments Modal */}
            <Modal open={showModal} onClose={handleCloseModal}>
              <div className={style.modalBackdrop}>
                <div className={style.modalContent}>
                  <h2 className={style.titleCmnt}>Comments</h2>
                  <div className={style.commentsContainer}>
                    <div className={style.commentCards}>
                      {comments
                        .filter(
                          (comment) => comment.reviewID._id === selectedReviewId
                        )
                        .map((comment) => (
                          <Card key={comment._id} className={style.commentCard}>
                            <CardContent>
                              {/* <p>{comment.userID}</p> */}
                              <div className={style.userComented}>
                                <img
                                  src={`${process.env.REACT_APP_PATH}images/${comment.userID.image}`}
                                  className={style.imgComment}
                                  alt="rev"
                                />
                                <p>{comment.userID.name}</p>
                              </div>

                              <p>{comment.feedback}</p>
                              {console.log("comments", comment.userID.name)}
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                    <textarea
                      className={style.commentTextArea}
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className={style.submitButton}
                      onClick={handleAddComment}
                    >
                      Add Comment
                    </button>
                  </div>
                  <button className={style.closee} onClick={handleCloseModal}>
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          {/* ////////////////////End posts///////////////////// */}
        </div>
      </div>
    </section>
  );
}

export default UserPage;
