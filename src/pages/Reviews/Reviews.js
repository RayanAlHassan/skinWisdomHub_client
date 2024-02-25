
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import image from "../../assets/images/cleanse.jpg";
// import style from "./Reviews.module.css";
// import Rating from "@mui/material/Rating";
// import { AuthContext } from "../../Context/AuthContext";
// import StarIcon from "@mui/icons-material/Star";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";

// function Reviews() {
//   const [reviews, setReviews] = useState([]);
//   const { user } = useContext(AuthContext);
//   const [comments, setComments] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [newComment, setNewComment] = useState("");
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     async function fetchReviews() {
//       try {
//         const response = await axios.get("http://localhost:5000/reviews/");
//         if (response) {
//           setReviews(
//             response.data.map((review) => ({ ...review, selectedRating: 0 }))
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     }

//     async function fetchComments() {
//       try {
//         const response = await axios.get("http://localhost:5000/comments/");
//         if (response) {
//           console.log("data commentssssssssss", response.data);
//           setComments(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     }

//     fetchReviews();
//     fetchComments();
//   }, []);

//   const handleSubmit = async (value, id) => {
//     try {
//       const response = await axios.post("http://localhost:5000/rate/create", {
//         reviewID: id,
//         value: value,
//         userID: user._id,
//       });
//       if (response) {
//         console.log("Response:", response.data);
//         // Assuming response.data contains updated review data with ratings
//         setReviews(
//           reviews.map((review) => {
//             if (review._id === id) {
//               return {
//                 ...review,
//                 rate: response.data.rate,
//               };
//             }
//             return review;
//           })
//         );
//       }
//     } catch (error) {
//       console.error("Error updating rating:", error);
//     }
//   };

//   const handleChange = (value, id) => {
//     // Update the selected rating for the current post
//     setReviews(
//       reviews.map((review) => {
//         if (review._id === id) {
//           return {
//             ...review,
//             selectedRating: value,
//           };
//         }
//         return review;
//       })
//     );
//     handleSubmit(value, id);
//   };

//   const handleOpenModal = (id) => {
//     setSelectedReviewId(id);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleAddComment = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/comments/create", {
//         reviewID: selectedReviewId,
//         feedback: newComment,
//         userID: user._id,
//       });
//       if (response) {
//         console.log("Comment added:", response.data);
//         // Update the comments state to include the new comment
//         setComments([...comments, response.data]);
//         // Clear the newComment state
//         setNewComment("");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };
// //   const filteredProducts = reviews.filter(item => 
// //     item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
// //     (item.subCategoryID && item.subCategoryID.name.toLowerCase().includes(searchQuery.toLowerCase()))
// // );
//   return (
//     <main className={style.container}>
//       {/* Posts */}
//       <div className={style.top}>
//         <img src={image} className={style.img} alt="background" />
//       </div>
//       {reviews.map((rev) => (
//         <div key={rev._id} className={style.post}>
//           {/* Post Content */}
//           <div className={style.postTop}>
//             <div className={style.topLeft}>
//               {rev.userID.image ? (
//                 <img
//                   src={`http://localhost:5000/images/${rev.userID.image}`}
//                   className={style.profileUser}
//                   alt="profile user"
//                 />
//               ) : (
//                 <img src={image} className={style.profileUser} alt="profile user" />
//               )}
//               <p className={style.name}>{rev?.userID?.name}</p>
//             </div>
//             <div className={style.topCenter}>
//               <p className={style.name} style={{ fontWeight: "900", fontSize: "22px" }}>
//                 {rev.productName}
//               </p>
//               <p className={style.skinType}>{rev.skinType}</p>
//             </div>
//           </div>
//           <div className={style.center}>
//             <img src={`http://localhost:5000/images/${rev.image}`} className={style.posttt} alt="rev" />
//           </div>
//           <div className={style.bottom}>
//             <p className={style.desc}>{rev.description}</p>
//             <div className={style.rating}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <Rating
//                   name={`simple-controlled-${rev._id}`}
//                   value={rev.selectedRating} // Use selectedRating from review object
//                   onChange={(e, value) => handleChange(value, rev._id)}
//                   max={5}
//                   precision={1}
//                 />
//                 <span>{rev.selectedRating}</span>
//               </Box>
//               <span style={{ display: "flex", alignItems: "center" }}>
//                 <span style={{ fontWeight: "900", fontSize: "20px" }}>
//                   ( {Math.round(rev.rate * 100) / 100} )
//                 </span>
//                 <StarIcon style={{ color: "yellow" }} /> Out Of 5
//               </span>
//               {/* Comments Button */}
//               <button className={style.commentButton} onClick={() => handleOpenModal(rev._id)}>View Comments</button>
//             </div>
//           </div>
//         </div>
//       ))}
//       {/* Comments Modal */}
//       <Modal open={showModal} >
//         <div className={style.modalBackdrop}>
//           <div className={style.modalContent}>
//             <h2 className={style.titleCmnt}>Comments</h2>
//             <div className={style.commentsContainer}>
//               {/* Comment Cards */}
//               <div className={style.commentCards}>
//                 {comments
//                   .filter((comment) => comment.reviewID._id === selectedReviewId)
//                   .map((comment) => (
//                     <Card key={comment._id} className={style.commentCard}>
//                       <CardContent>
//                         <p>{comment.feedback}</p>
//                       </CardContent>
//                     </Card>
//                   ))}
//               </div>
//               {/* Add Comment Textarea */}
//               <textarea
//                 className={style.commentTextArea}
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 placeholder="Add a comment..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//               />
//               {/* Submit Button */}
//               <button className={style.submitButton} variant="contained" onClick={handleAddComment}>
//                 Add Comment
//               </button>
//             </div>
//             {/* Close Button */}
//             <button className={style.closee} onClick={handleCloseModal}>
//               Close
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </main>
//   );
// }

// export default Reviews;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import image from "../../assets/images/cleanse.jpg";
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

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [reviewsResponse, commentsResponse] = await Promise.all([
          axios.get("http://localhost:5000/reviews/"),
          axios.get("http://localhost:5000/comments/")
        ]);
        if (reviewsResponse && commentsResponse) {
          setReviews(reviewsResponse.data.map((review) => ({ ...review, selectedRating: 0 })));
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

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
      const response = await axios.post("http://localhost:5000/comments/create", {
        reviewID: selectedReviewId,
        feedback: newComment,
        userID: user._id,
      });
      if (response) {
        console.log("Comment added:", response.data);
        setComments([...comments, response.data]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.skinType.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <main className={style.container}>
      {/* Background Image */}
      <div className={style.top}>
        <img src={image} className={style.img} alt="background" />
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
                <img src={image} className={style.profileUser} alt="profile user" />
              )}
              <p className={style.name}>{rev?.userID?.name}</p>
            </div>
            <div className={style.topCenter}>
              <p className={style.name} style={{ fontWeight: "900", fontSize: "22px" }}>
                {rev.productName}
              </p>
              <p className={style.skinType}>{rev.skinType}</p>
            </div>
          </div>
          <div className={style.center}>
            <img src={`http://localhost:5000/images/${rev.image}`} className={style.posttt} alt="rev" />
          </div>
          <div className={style.bottom}>
            <p className={style.desc}>{rev.description}</p>
            <div className={style.rating}>
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
                <span style={{ fontWeight: "900", fontSize: "20px" }}>
                  ( {Math.round(rev.rate * 100) / 100} )
                </span>
                <StarIcon style={{ color: "yellow" }} /> Out Of 5
              </span>
              <button className={style.commentButton} onClick={() => handleOpenModal(rev._id)}>View Comments</button>
            </div>
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
                  .filter((comment) => comment.reviewID._id === selectedReviewId)
                  .map((comment) => (
                    <Card key={comment._id} className={style.commentCard}>
                      <CardContent>
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