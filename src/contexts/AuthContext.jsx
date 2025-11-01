import React, { createContext, useContext, useState } from 'react';

// 1. Tạo Context
const AuthContext = createContext(null);

// 2. Tạo Provider Component (Component Cha)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Ban đầu chưa đăng nhập

  // Dữ liệu người dùng giả (Mock user data)
  const mockUser = {
    name: 'Elysia',
    email: 'elysia@gmail.com',
    //... (thêm các thông tin khác nếu bạn muốn)
  };

  // Hàm đăng nhập
  const login = () => {
    // Trong tương lai, bạn sẽ gọi API ở đây
    // Hiện tại, chúng ta chỉ set dữ liệu giả
    setUser(mockUser);
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
  };

  // 3. Cung cấp 'user', 'login', 'logout' cho các component con
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Tạo một custom Hook (để dễ sử dụng)
export const useAuth = () => {
  return useContext(AuthContext);
};