'use client '

import React from 'react'
import HeroSection from '../../Component/Home/heroSection.jsx';
import Business from '../../Component/Home/BusinessImpact.jsx';
import Array from '../../Component/Home/Array.jsx';
import TrustedBrands from '../../Component/Home/TrustedBrands.jsx';
const page = () => {
  return (
    <div>
      <HeroSection />
      <Business />
      <Array />
      <TrustedBrands />
    </div>
  )
}

export default page
