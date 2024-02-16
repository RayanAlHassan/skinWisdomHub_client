import React from 'react'
import style from "./ForYou.module.css"
import Searchfilter from '../../components/Searchfilter/Searchfilter'

function ForYou() {
  return (
    <main className={style.container}> 
    <h1>Find Your Skin's Perfect Fit</h1>
    <Searchfilter/>
    </main>
  )
}

export default ForYou
