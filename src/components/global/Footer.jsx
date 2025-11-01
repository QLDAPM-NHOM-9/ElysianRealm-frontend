import React from 'react';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter.jsx';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import logoIcon from '../../assets/icons/Elysia.png';
import logoText from '../../assets/icons/Elysian.png';

// Logo
const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    {/* THAY ĐỔI TẠI ĐÂY: w-10 h-10 -> w-15 h-15 */}
    <img src={logoIcon} alt="Elysian Realm Logo" className="w-15 h-15 rounded-full object-cover" />
    <img src={logoText} alt="Elysian Realm" className="h-15" />
  </Link>
);

// Component cột link
const FooterColumn = ({ title, links }) => (
  <div>
    <h5 className="font-bold text-text-primary mb-4">{title}</h5>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const destinations = ['Canada', 'Alaksa', 'France', 'Iceland'];
  const activities = ['Northern Lights', 'Cruising & sailing', 'Multi-activities', 'Kayaking'];
  const blogs = ['Bali Travel Guide', 'Sri Lanks Travel Guide', 'Peru Travel Guide', 'Bali Travel Guide'];
  const about = ['Our Story', 'Work with us'];
  const contact = ['Our Story', 'Work with us'];

  return (
    <footer className="bg-bg-primary pt-12">
      <div className="container mx-auto px-4">
        
        {/* 1. Newsletter */}
        <Newsletter />

        {/* 2. Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 py-16">
          {/* Cột Logo & Social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-8">
            <Logo />
            <div className="flex justify-between my-6 pr-13">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaFacebookF /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaYoutube /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaInstagram /></a>
            </div>
          </div>
          
          {/* Cột Links */}
          <FooterColumn title="Our Destinations" links={destinations} />
          <FooterColumn title="Our Activities" links={activities} />
          <FooterColumn title="Travel Blogs" links={blogs} />
          <FooterColumn title="About Us" links={about} />
          <FooterColumn title="Contact Us" links={contact} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;