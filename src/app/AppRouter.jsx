import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ... (imports Layouts) ...
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import AccountLayout from '../layouts/AccountLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

// ... (imports Pages) ...
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.jsx';
import VerifyCodePage from '../pages/auth/VerifyCodePage.jsx';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage.jsx';
import RegisterPaymentPage from '../pages/auth/RegisterPaymentPage.jsx';
import AccountProfilePage from '../pages/account/AccountProfilePage.jsx';
import AccountHistoryPage from '../pages/account/AccountHistoryPage.jsx';
import AccountPaymentPage from '../pages/account/AccountPaymentPage.jsx';
import DashboardPage from '../pages/admin/DashboardPage.jsx';
import AdminUsersPage from '../pages/admin/AdminUsersPage.jsx';
import AdminBookingsPage from '../pages/admin/AdminBookingsPage.jsx';
import AdminFlightsPage from '../pages/admin/AdminFlightsPage.jsx';
import AdminHotelsPage from '../pages/admin/AdminHotelsPage.jsx';
import FlightListingPage from '../pages/flight/FlightListingPage.jsx';
import HotelListingPage from '../pages/hotel/HotelListingPage.jsx';
import FlightDetailPage from '../pages/flight/FlightDetailPage.jsx';

// --- THÊM TRANG MỚI ---
import FlightBookingPage from '../pages/flight/FlightBookingPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* === Các trang dùng MainLayout (Website chính) === */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        
        <Route path="flight-listing" element={<FlightListingPage />} />
        <Route path="hotel-listing" element={<HotelListingPage />} />
        
        <Route path="flight-detail/:id" element={<FlightDetailPage />} />

        {/* --- THÊM ROUTE MỚI --- */}
        <Route path="flight-booking" element={<FlightBookingPage />} />
        
        {/* <Route path="favourites" element={<FavouritesPage />} /> */}
      </Route>

      {/* ... (Auth, Account, Admin routes giữ nguyên) ... */}
      <Route element={<AuthLayout />}>{/*...*/}</Route>
      <Route path="/account" element={<AccountLayout />}>{/*...*/}</Route>
      <Route path="/admin" element={<AdminLayout />}>{/*...*/}</Route>
      
      {/* === Trang 404 (Không tìm thấy) === */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;