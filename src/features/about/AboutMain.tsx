import React from 'react';
import AboutHero from './components/AboutHero';
import AboutJourney from './components/AboutJourney' 
import AboutTimeline from './components/AboutTimeline';


const AboutMain = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 🌟 First Section */}
      <AboutHero />
      
      <AboutJourney />

      <AboutTimeline />
    </div>
  );
};

export default AboutMain;