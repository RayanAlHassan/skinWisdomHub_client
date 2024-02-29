import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import image from "../../assets/images/top.jpg";
import style from "./Reviews.module.css";
import Rating from "@mui/material/Rating";
import { AuthContext } from "../../Context/AuthContext";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FaComment } from 'react-icons/fa';
import { Divide } from "hamburger-react";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [reviewsResponse, commentsResponse] = await Promise.all([
          axios.get("http://localhost:5000/reviews/"),
          axios.get("http://localhost:5000/comments/"),
        ]);
        if (reviewsResponse && commentsResponse) {
          setReviews(
            reviewsResponse.data.map((review) => ({
              ...review,
              selectedRating: 0,
            }))
          );
          console.log("reviews", reviewsResponse.data);
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  console.log("reviewsss", reviews);

  const handleSubmit = async (value, id) => {
    try {
      const response = await axios.post("http://localhost:5000/rate/create", {
        reviewID: id,
        value: value,
        userID: user._id,
      });
      if (response) {
        console.log("Response:", response.data);
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


  const handleChange = (value, id) => {
    setReviews(
      reviews.map((review) => {
        if (review._id === id) {
          return {
            ...review,
            selectedRating: value,
          };
        }
        return review;
      })
    );
    handleSubmit(value, id);
  };

  const handleOpenModal = (id) => {
    setSelectedReviewId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/comments/create",
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
        `http://localhost:5000/reviews/${reviewId}/averageRating`
      );
      if (response) {
        return response.data.averageRating;
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  return (
    <main className={style.container}>
      {/* Background Image */}
      <div className={style.top}>
        <img src={image} className={style.img} alt="background" />
        <div className={style.heroBackgrd}></div>

        <input
          type="text"
          placeholder="Search For Products Name Or Skin Type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={style.searchbar}
        />
      </div>

      {/* Posts */}
      {filteredReviews.map((rev) => (
        <div key={rev._id} className={style.post}>
          <div className={style.postTop}>
            <div className={style.topLeft}>
              {rev.userID.image ? (
                <img
                  src={`http://localhost:5000/images/${rev.userID.image}`}
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
                <p className={style.time}>{formatTimeSince(rev.createdAt)}</p>
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
          <div className={style.center}>
            <p className={style.skinType}>{rev.skinType}</p>
            <p className={style.desc}>{rev.description}</p>

            <img
              src={`http://localhost:5000/images/${rev.image}`}
              className={style.posttt}
              alt="rev"
            />
          </div>
          <div className={style.rating}>
            <div className={style.rateStuff}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Rating
                name={`simple-controlled-${rev._id}`}
                value={rev.selectedRating}
                onChange={(e, value) => handleChange(value, rev._id)}
                max={5}
                precision={1}
              />
              <span>{rev.selectedRating}</span>
            </Box>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: "400", fontSize: "20px" }}>
                ( {Math.round(rev.rate * 100) / 100} )
              </span>
              <StarIcon style={{ color: "yellow" , fontSize:"20px" }} />
            </span>
            </div>
           
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
                        {console.log("comments img", comment.userID.image)}

                        {/* <p>{comment.USERid}</p> */}
                        <div className={style.userComented}>
                          <img
                            src={`http://localhost:5000/images/${comment.userID.image}`}
                            className={style.imgComment}
                            alt="rev"
                          />
                          <p>{comment.userID.name}</p>
                        </div>

                        <p>{comment.feedback}</p>
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
              <button className={style.submitButton} onClick={handleAddComment}>
                Add Comment
              </button>
            </div>
            <button className={style.closee} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default Reviews;
