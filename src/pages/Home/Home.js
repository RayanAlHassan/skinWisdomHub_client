import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import AboutUs from '../../components/AboutUs/AboutUs'
import SearchForU from '../../components/SearchForU/SearchForU'
import ProductSection from '../../components/productSection/ProductSection'
import Testimonial from '../../components/Testimonial/Testimonial'
import { useContext } from 'react'
function Home() {
  return (
    <main 
    // style={{width:"100vw"}}
    >
   

<HeroSection/>
<ProductSection/>
<Testimonial/>
<AboutUs/>
    </main>
  )
}

export default Home
