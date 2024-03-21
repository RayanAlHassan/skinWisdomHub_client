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
import { FaComment } from "react-icons/fa";
import { Divide } from "hamburger-react";
import LoadingPage from "../../components/LoadingPage";
import { useMediaQuery } from "@mui/material";
import badWordData from "../../components/BadWord.json";
import { FaSearch } from "react-icons/fa";

const badWords = badWordData.badWords;
function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false); // Add showMore state
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 970);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [reviewsResponse, commentsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_PATH}reviews/`),
          axios.get(`${process.env.REACT_APP_PATH}comments/`),
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
          setIsLoading(false); // Set loading to false when data is fetched
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of error
      }
    }

    fetchData();
    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  console.log("reviewsss", reviews);

  const handleWindowResize = () => {
    setIsResponsive(window.innerWidth <= 970);
  };

  const handleSubmit = async (value, id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH}rate/create`,
        {
          reviewID: id,
          value: value,
          userID: user._id,
        }
      );
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
      if (!user) {
        // If user is not logged in, display an alert
        alert("You need to log in to add a comment.");
        return; // Return early to prevent further execution of the function
      }
      if (containsBadWord(newComment)) {
        setError("Your comment contains inappropriate language.");
      } else {
        setError(""); // Reset error state if no bad words are found
        const response = await axios.post(
          `${process.env.REACT_APP_PATH}comments/create`,
          {
            reviewID: selectedReviewId,
            feedback: newComment,
            userID: user && user._id,
          }
        );
        if (response) {
          console.log("Comment added:", response.data);
          setComments([...comments, response.data]);
          setNewComment("");
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const containsBadWord = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    return words.some((word) => badWords.includes(word));
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
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // Function to toggle description expansion
  const toggleDescriptionExpansion = (reviewId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId], // Toggle the value for the review ID
    }));
  };

  return (
    <main className={style.container}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {/* Background Image */}
          <div className={style.top}>
            <img src={image} className={style.img} alt="background" />
<div className={style.animatedHead}>


            <div className={`${style.words} ${style["word-1"]}`}>
              <span>A</span>
              <span>u</span>
              <span>t</span>
              <span>h</span>
              <span>e</span>
              <span>n</span>
              <span>t</span>
              <span>i</span>
              <span>c</span>
            </div>

            <div className={`${style.words} ${style["word-2"]}`}>
              <span>R</span>
              <span>e</span>
              <span>v</span>
              <span>i</span>
              <span>e</span>
              <span>w</span>
              <span>s</span>
            </div>

            <div className={`${style.words} ${style["word-3"]}`}>
              <span>H</span>
              <span>u</span>
              <span>b</span>
            </div>
            </div>
            <div className={style.heroBackgrd}></div>
            {/* <input
              type="text"
              placeholder="Search For Products Or Skin Type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchbar}
            /> */}
          </div>
          <div className={style.search}>
            <input
              type="text"
              placeholder="Search For Products Or Skin Type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchbar}
            />
            <span className={style.searchIcon}>
      <FaSearch />
      </span>

      
          </div>
          {/* <input
        type="text"
        placeholder="Search For Products Or Skin Type"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // className={styles.searchInput}
      /> */}

          {/* Posts */}
          <div>
            {filteredReviews.map((rev) => (
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
                    </div>
                  </div>
                  <div className={style.topCenter}>
                    <p className={style.productName}>
                      {/* {console.log("heyyy",`http://localhost:5000/images/${rev.userID.image}`)} */}
                      {rev.subCategoryID.name}
                    </p>
                  </div>
                </div>
                <div className={style.center}>
                  <div className={style.lefttSide}>
                    <img
                      src={`${process.env.REACT_APP_PATH}images/${rev.image}`}
                      className={style.posttt}
                      alt="rev"
                    />
                  </div>

                  <div className={style.righttSide}>
                    <p className={style.subCategory}> {rev.productName}</p>

                    <p className={style.skinType}>Skin Type: {rev.skinType}</p>
                    <div className={style.desc}>
                      {isResponsive
                        ? expandedDescriptions[rev._id]
                          ? rev.description
                          : rev.description.slice(0, 40)
                        : expandedDescriptions[rev._id]
                        ? rev.description
                        : rev.description.slice(0, 100)}
                      {rev.description.length > (isResponsive ? 40 : 100) && (
                        <span
                          className={style.viewMore}
                          onClick={() => toggleDescriptionExpansion(rev._id)}
                        >
                          {expandedDescriptions[rev._id]
                            ? " View Less"
                            : "... View More"}
                        </span>
                      )}
                    </div>
                    {/* <p className={style.desc}>{rev.description}</p> */}
                  </div>
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
                      <StarIcon style={{ color: "yellow", fontSize: "20px" }} />
                    </span>
                  </div>

                  <button
                    className={style.commentButton}
                    onClick={() => handleOpenModal(rev._id)}
                  >
                    <FaComment color="var(--Font-color)" />
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
                              {console.log(
                                "comments img",
                                comment.userID.image
                              )}

                              {/* <p>{comment.USERid}</p> */}
                              <div className={style.userComented}>
                                <img
                                  src={`${process.env.REACT_APP_PATH}images/${comment.userID.image}`}
                                  className={style.imgComment}
                                  alt="rev"
                                />
                                <p>{comment.userID.name}</p>
                              </div>

                              <p className={style.feedb}>{comment.feedback}</p>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                    <textarea
                      className={style.commentTextArea}
                      multiline
                      // rows={4}
                      variant="outlined"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => {
                        setNewComment(e.target.value);
                        setError("");
                      }}
                    />
                    {error && <p className={style.error}>{error}</p>}

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
        </div>
      )}
    </main>
  );
}
export default Reviews;
