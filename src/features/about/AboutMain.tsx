import React from 'react';
import AboutHero from './components/AboutHero';
import AboutJourney from './components/AboutJourney' 
import AboutTimeline from './components/AboutTimeline';
import AboutFounder from './components/AboutFounder';
import AboutVision from './components/AboutVision';
import AboutConclusion from './components/AboutConclusion';


const AboutMain = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 🌟 First Section */}
      <AboutHero />
      
      <AboutJourney />

      <AboutTimeline />

      <AboutFounder />

      <AboutVision />
      <AboutConclusion/>
    </div>
  );
};

export default AboutMain;