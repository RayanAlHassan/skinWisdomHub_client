import React from 'react'
import style from "./ForYou.module.css"
import Searchfilter from '../../components/Searchfilter/Searchfilter'
import bcg from "../../assets/images/backgrd.jpg"
import Cards from '../../components/Cards/Cards'
function ForYou() {
  return (
    <main className={style.container}>
      <div className={style.top}>
      <img src={bcg} alt='background sky'style={{marginBottom:"20px", height:"100%",width:"100%", objectFit:"cover"}}/>
      <div className={style.filter}>
    <Searchfilter/>
    </div> 
      </div>
      <div className={style.bottom}>
        <div style={{height:"4rem"}}>
    <h1 className={style.header}>Find Your Skin's Perfect Fit</h1> 
    </div>
    
    <div className={style.card}>
    <Cards />
    </div>
    </div>
    {/* <button className={style.discover}>search</button> */}
   
    {/* <Searchfilter/> */}
    </main>
  )
}

export default ForYou
