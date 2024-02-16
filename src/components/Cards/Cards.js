import React from 'react'
import styles from "./Cards.module.css"
import image from "../../assets/images/rose.jpeg"

const data= [
    {
        id:1,
        img:image,
        desc:"rayan al hassan cute"
    },
    {
        id:2,
        img:image,
        desc:"rayan al hassan cute"

    },
    {
        id:3,
        img:image,
        desc:"rayan al hassan cute"

    },
    {
        id:4,
        img:image,
        desc:"rayan al hassan cute"

    },
    {
        id:5,
        img:image,
        desc:"rayan al hassan cute"

    },
    {
        id:6,
        img:image,
        desc:"rayan al hassan cute"

    },
    {
        id:7,
        img:image,
        desc:"rayan al hassan cute"

    },
    {
        id:8,
        img:image,
        desc:"rayan al hassan cute"

    }
]

const Cards = () => {
  return (
    <div className={styles.container}>
        {data.map((item)=>(
            <div key={item.id} className={styles.card}>
            <img className={styles.img} src={item.img} />
            <p className={styles.desc}>{item.desc}</p>
            </div>
        ))}
       
      
    </div>
  )
}

export default Cards
