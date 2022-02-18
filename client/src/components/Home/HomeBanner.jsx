
import React from 'react';
import './Home.css';
import bannerImage from "../../components/images/woman-with-drill.png";


const HomeBanner = () => {

  return( 
      <div className="banner-wrapper">
        <div className="mobile-hero"></div>
        <img src={bannerImage} alt="man with a drill"></img> 
          <div className="overlay">
          <span className="site-header">No drill?</span>
          <span className="site-header">No problem.</span>
          <span className="site-tagline">Local lending and borrowing made easy.</span>
          </div>
      </div>
  )
}


export default HomeBanner;

