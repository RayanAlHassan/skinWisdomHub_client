import React ,{useState, useEffect}from 'react'
import QuestionAndAnswer from '../../components/QuestionAndAbswer/QuestionAndAnswer'
import style from "./FreequentQuestion.module.css"
import bcg from "../../assets/images/bcg.png"

function FreequentQuestion() {
  const [showSlug, setShowSlug] = useState(true);

  useEffect(() => {
    const hasAnimationPlayed = localStorage.getItem('animationPlayed');
    if (hasAnimationPlayed) {
      setShowSlug(false); // Hide the slug if animation has played before
    } else {
      const timeout = setTimeout(() => {
        setShowSlug(false); // Hide the slug after 3 seconds
        localStorage.setItem('animationPlayed', 'true'); // Set the flag indicating animation has played
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <img
          src={bcg}
          alt="background sky"
          style={{
            marginBottom: '20px',
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            position: 'relative',
          }}
        />
                <div className={style.heroBackgrd}></div>

        <div></div>
        <h2 className={style.body}>
          <h2 className={style.div}>FAQ-central</h2>
          <div className={style.div}>
            <span className={style.span}>Escape into other' experiences</span>
          </div>
        </h2>
      </div>
      <div className={style.bottom}>
        <div className={style.card}>
          <QuestionAndAnswer />
        </div>
      </div>
    </div>
  );
}

export default FreequentQuestion;