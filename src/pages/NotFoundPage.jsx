import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import { FiHome } from 'react-icons/fi';
import logoIcon from '../assets/icons/Elysia.png'; 
import notFoundVideo from '../assets/videos/NotFound.mp4'; 

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    // Container chính
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
      
      {/* --- VIDEO BACKGROUND --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src={notFoundVideo} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    

      {/* --- NỘI DUNG (z-10) --- */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo lơ lửng */}
        <img 
          src={logoIcon}
          alt="Elysian Realm Logo"
          className="w-48 h-48 mb-8 animate-float"
        />

        {/* --- TRẢ LẠI MÀU CHỮ GỐC --- */}
        <h1 className="text-9xl font-bold text-brand-primary animate-pulse">
          404
        </h1>
        
        <h2 className="text-4xl font-bold text-text-primary mt-4 mb-2 font-serif">
          Lạc Lối Giữa Cõi Mộng?
        </h2>
        <p className="text-lg text-text-secondary mb-8 max-w-md">Cõi mộng này tuy rộng lớn, nhưng vô tình bạn đã dừng chân giữa nơi không thuộc về giấc mơ.</p>

        <Button 
          variant="primary" 
          className="flex items-center gap-2 text-lg hover:scale-115 transition duration-400"
          onClick={() => navigate('/')} 
        >
          <FiHome />
          Quay về Elysian Realm
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;