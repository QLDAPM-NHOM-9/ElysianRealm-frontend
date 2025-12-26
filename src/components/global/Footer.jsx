import React from 'react';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter.jsx';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import logoIcon from '../../assets/icons/Elysia.png'; 
import logoText from '../../assets/icons/Elysian.png'; 

// Logo
const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src={logoIcon} alt="Elysian Realm Logo" className="w-15 h-15 rounded-full object-cover" />
    <img src={logoText} alt="Elysian Realm" className="h-12" />
  </Link>
);

// Component cột link
const FooterColumn = ({ title, links }) => (
  <div>
    <h5 className="font-bold text-text-primary mb-4">{title}</h5>
    <ul className="space-y-3">
      {/* SỬA LỖI TẠI ĐÂY: Thêm tham số 'index' và dùng key={index} */}
      {links.map((link, index) => (
        <li key={index}> 
          {/* Kiểm tra nếu link là object hay string */}
          {typeof link === 'object' ? (
            <Link to={link.path} className="text-text-secondary hover:text-text-primary text-sm">
              {link.label}
            </Link>
          ) : (
            <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
              {link}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const destinations = ['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh', 'Đà Lạt'];
  const services = ['Đặt vé máy bay', 'Đặt tour du lịch', 'Khách sạn', 'Cho thuê xe'];

  const about = [
    { label: 'Về chúng tôi', path: '/about-us' },
    { label: 'Liên hệ', path: '/contact-us' }
  ];
  const support = [
    { label: 'Trợ giúp', path: '/help' },
    { label: 'Chính sách bảo mật', path: '/privacy' },
    { label: 'Điều khoản sử dụng', path: '/terms' }
  ];

  return (
    <footer className="bg-bg-primary pt-12">
      <div className="container mx-auto px-4">
        

        {/* 2. Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 py-16">
          {/* Cột Logo & Social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-8">
            <Logo />
            <div className="flex justify-between my-6">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaFacebookF /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaTwitter /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaYoutube /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:bg-gray-200"><FaInstagram /></a>
            </div>
          </div>
          
          {/* Cột Links */}
          <FooterColumn title="Điểm đến nổi bật" links={destinations} />
          <FooterColumn title="Dịch vụ của chúng tôi" links={services} />
          <FooterColumn title="Về chúng tôi" links={about} />
          <FooterColumn title="Hỗ trợ" links={support} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
