import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Lấy đường dẫn hiện tại (pathname)
  const { pathname } = useLocation();

  useEffect(() => {
    // Mỗi khi pathname thay đổi, cuộn lên toạ độ (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Hook này chạy lại khi pathname thay đổi

  return null; // Component này không hiển thị giao diện gì cả
};

export default ScrollToTop;