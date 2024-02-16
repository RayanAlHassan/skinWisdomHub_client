import React from 'react'
import style from "./SearchForU.module.css"
import Searchfilter from '../Searchfilter/Searchfilter'
import Carousel from '../Caroucel/Carousel'
function SearchForU() {
  return (
    <main className={style.container}> {/* Apply the 'container' class */}
  {/* Apply the 'left' class */}
    <div className={style.right}>
      <div className={style.div}>
    {/* <Searchfilter/> */}
    <Carousel/>
      </div>
    </div>
  </main>
  )
}

export default SearchForU
