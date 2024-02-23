import React from "react";
import image from "../../assets/images/cleanse.jpg";
import style from "./Reviews.module.css";
function Reviews() {
  return (
    <main className={style.container}>
      <div className={style.top}>
        <img src={image} className={style.img}></img>
      </div>
      <div className={style.bottom}>
        <div className={style.post}>
        <div className={style.postTop}>
        <div className={style.topLeft}>
            <img src={image} className={style.profileUser} alt="profile user"/>
            <p className={style.name}> name here</p>
          </div>
          <div className={style.topCenter}>
            <p className={style.name}> product name</p>
          </div>
          <div className={style.topRight}>
            <p className={style.name}> Skin type</p>
          </div>
        </div>
          <div className={style.center}>
            <img src={image} className={style.posttt} alt="profile user"/>
            
          </div>
          <div className={style.bottom}>
            <p className={style.desc}> descriptopnnnn mmmmmmmm</p>
          </div>
        </div>

        {/* /////////// */}
        <div className={style.post}>
        <div className={style.postTop}>
        <div className={style.topLeft}>
            <img src={image} className={style.profileUser} alt="profile user"/>
            <p className={style.name}> name here</p>
          </div>
          <div className={style.topCenter}>
            <p className={style.name}> product name</p>
          </div>
          <div className={style.topRight}>
            <p className={style.name}> Skin type</p>
          </div>
        </div>
          <div className={style.center}>
            <img src={image} className={style.posttt} alt="profile user"/>
            
          </div>
          <div className={style.bottom}>
            <p className={style.desc}> descriptopnnnn mmmmmmmm</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Reviews;
