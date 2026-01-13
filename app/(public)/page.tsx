import React from 'react'
import FirstSection from '@/components/sections/FirstSection'
import SecondSection from '@/components/sections/SecondSection'
import WhyUs from '@/components/sections/ThirdSection'
import Footer from '@/components/wayhouse/Footer'
import NavBar from '@/components/nav/NavBar'

export default function page() {
  return (
    <div className=''>
      <FirstSection/>
      <SecondSection/>
      <WhyUs/>
      <Footer/>
    </div>
  )
}
