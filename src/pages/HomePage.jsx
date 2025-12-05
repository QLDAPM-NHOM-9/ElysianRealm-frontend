import React from 'react';
import SearchTabs from '../components/search/SearchTabs.jsx';
import PopularDestinations from '../components/home/PopularDestinations.jsx'; 
import CtaBlocks from '../components/home/CtaBlocks.jsx'; 
import Reviews from '../components/home/Reviews.jsx'; 
import heroImageUrl from '../assets/images/Homepage.jpg'; 

const HomePage = () => {
  return (
    <>
      {/* === HERO SECTION === */}
      <section 
        // THAY ĐỔI h-[550px] THÀNH h-[730px]
        className="h-[730px] w-full bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }} 
      >
        {/* <div className="absolute inset-0 bg-black/30" /> */}
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg font-serif">
            LIVE AND TRAVEL
          </h1>
          <p className="text-xl md:text-2xl text-white font-light drop-shadow-md mb-12">
            Khám phá thiên đường và cõi mộng trong từng hành trình
          </p>
          <SearchTabs />
        </div>
      </section>

      {/* === Plan your perfect trip === */}
      <PopularDestinations />

      {/* === CTA Blocks (Flights / Tours) === */}
      <CtaBlocks />

    </>
  );
};

export default HomePage;