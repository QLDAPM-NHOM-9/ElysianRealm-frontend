import React from 'react';
import HeroContent from '../components/home/HeroContent.jsx';
import InteractiveSection from '../components/home/InteractiveSection.jsx';
import heroImageUrl from '../assets/images/Homepage.jpg';

const HomePage = () => {
  return (
    <>
      {/* === HERO SECTION === */}
      <section
        className="h-[550px] w-full bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        {/* <div className="absolute inset-0 bg-black/30" /> */}

        <div className="container mx-auto px-4 z-10">
          <HeroContent />
        </div>
      </section>

      {/* === Interactive Section (Quick Actions & Featured Destinations) === */}
      <InteractiveSection />

    </>
  );
};

export default HomePage;
