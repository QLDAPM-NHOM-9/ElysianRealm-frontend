import React from 'react';
import { Link } from 'react-router-dom';
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
  const destinations = [
    { label: 'Hà Nội', path: '/tour-listing?q=Hà Nội' },
    { label: 'Đà Nẵng', path: '/tour-listing?q=Đà Nẵng' },
    { label: 'Hồ Chí Minh', path: '/tour-listing?q=Hồ Chí Minh' },
    { label: 'Đà Lạt', path: '/tour-listing?q=Đà Lạt' }
  ];
  const services = [
    { label: 'Đặt vé máy bay', path: '/flight-listing' },
    { label: 'Đặt tour du lịch', path: '/tour-listing' }
  ];

  const about = [
    { label: 'Về chúng tôi', path: '/about-us' },
    { label: 'Liên hệ', path: '/contact-us' }
  ];
  const support = [
    { label: 'Chính sách bảo mật', path: '/privacy' },
    { label: 'Điều khoản sử dụng', path: '/terms' }
  ];

  return (
    <footer className="bg-bg-primary pt-12">
      <div className="container mx-auto px-4">
        

        {/* 2. Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 py-16">
          {/* Cột Logo */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-8">
            <Logo />
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
