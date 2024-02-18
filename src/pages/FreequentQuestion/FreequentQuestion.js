import React ,{useState, useEffect}from 'react'
import QuestionAndAnswer from '../../components/QuestionAndAbswer/QuestionAndAnswer'
import style from "./FreequentQuestion.module.css"
import bcg from "../../assets/images/bcg.png"
function FreequentQuestion() {
  const [showSlug, setShowSlug] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSlug(false), 3000); // Hide the slug after 3 seconds
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={style.container}>
       {/* <img
   src={bcg}
   alt="background sky"
   style={{
     marginBottom: "20px",
     height: "100vh",
     width: "100%",
     objectFit: "cover",
     position:"relative",
   }}
 /> */}
    <div className={style.top}>
 
 <img
   src={bcg}
   alt="background sky"
   style={{
     marginBottom: "20px",
     height: "100%",
     width: "100%",
     objectFit: "cover",
     position:"relative",
   }}
 />
 {/* <div    style={{
    background: "linear-gradient(141deg, #ccc 25%, #eee 40%, #ddd 55%)",

     marginBottom: "20px",
     height: "100%",
     width: "100%",
     objectFit: "cover",
     position:"relative",
   }}>

 </div> */}

{/* <h2 className={style.slugg}>
       FAQ-central
        </h2> */}
<h2 className={style.body}>
  <h2 className={style.div}>
       FAQ-central
        </h2>
{/* <div className={style.div}>Escape </div>  */}
<div className={style.div} > 
  <span className={style.span} >Escape into other' experiences</span>
</div>
</h2>


       

</div>
<div className={style.bottom}>
  <div className={style.card}>
  <QuestionAndAnswer/>
  </div>

</div>
  
    </div>
  )
}

export default FreequentQuestion
