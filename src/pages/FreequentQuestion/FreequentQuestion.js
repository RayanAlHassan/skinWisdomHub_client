import React from 'react'
import QuestionAndAnswer from '../../components/QuestionAndAbswer/QuestionAndAnswer'
import style from "./FreequentQuestion.module.css"
import bcg from "../../assets/images/bcg.png"
function FreequentQuestion() {
  return (
    <div className={style.container}>
    <div className={style.top}>
 
 <img
   src={bcg}
   alt="background sky"
   style={{
     marginBottom: "20px",
     height: "100%",
     width: "100%",
     objectFit: "cover",
   }}
 />


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
