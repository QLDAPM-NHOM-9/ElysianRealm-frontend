import React from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../../assets/icons/Elysia.png';

// Logo Component
const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src={logoIcon} alt="Elysian Realm Logo" className="w-15 h-15 rounded-full object-cover" />
    <span className="text-2xl font-bold text-text-primary">Elysian Realm</span>
  </Link>
);

const AuthHeader = () => {
  return (
    <header className="absolute top-0 left-0 w-full py-6 px-4">
      <div className="container mx-auto">
        <Logo />
      </div>
    </header>
  );
};

export default AuthHeader;