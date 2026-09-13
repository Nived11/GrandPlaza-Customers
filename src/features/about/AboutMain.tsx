import React from 'react';
import AboutHero from './components/AboutHero'; // നിന്റെ ഫയൽ പാത്ത് അനുസരിച്ച് മാറ്റുക

const AboutMain = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 🌟 First Section */}
      <AboutHero />
      
      {/* ബാക്കി സെക്ഷനുകൾ ഇതിനു താഴെയായി വിളിക്കാം */}
      {/* <OurVisionSection /> */}
      {/* <TeamSection /> */}
    </div>
  );
};

export default AboutMain;