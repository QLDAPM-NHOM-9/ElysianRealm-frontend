import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ... (imports Layouts) ...
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import AccountLayout from '../layouts/AccountLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import ProtectedRoute from '../layouts/ProtectedRoute.jsx'; // Import ProtectedRoute

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
import FlightSearchPage from '../pages/flight/FlightSearchPage.jsx';
import HotelSearchPage from '../pages/hotel/HotelSearchPage.jsx';
import FlightListingPage from '../pages/flight/FlightListingPage.jsx';
import HotelListingPage from '../pages/hotel/HotelListingPage.jsx';
import FlightDetailPage from '../pages/flight/FlightDetailPage.jsx';
import FlightBookingPage from '../pages/flight/FlightBookingPage.jsx';
import HotelDetailPage from '../pages/hotel/HotelDetailPage.jsx';
import HotelBookingPage from '../pages/hotel/HotelBookingPage.jsx';
import FlightTicketPage from '../pages/flight/FlightTicketPage.jsx';
import HotelTicketPage from '../pages/hotel/HotelTicketPage.jsx';

// --- THÊM TRANG MỚI ---
import FavouritesPage from '../pages/FavouritesPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx'; // <-- THÊM TRANG 404

const AppRouter = () => {
  return (
    <Routes>
      {/* === Các trang dùng MainLayout (Công khai) === */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        
        <Route path="flights" element={<FlightSearchPage />} />
        <Route path="hotels" element={<HotelSearchPage />} />
        
        <Route path="flight-listing" element={<FlightListingPage />} />
        <Route path="hotel-listing" element={<HotelListingPage />} />
        
        <Route path="flight-detail/:id" element={<FlightDetailPage />} />
        <Route path="hotel-detail/:id" element={<HotelDetailPage />} />

        <Route path="flight-booking" element={<FlightBookingPage />} />
        <Route path="hotel-booking" element={<HotelBookingPage />} />
        
        <Route path="flight-ticket/:id" element={<FlightTicketPage />} />
        <Route path="hotel-ticket/:id" element={<HotelTicketPage />} />
      </Route>

      {/* === Các trang dùng AuthLayout (Công khai) === */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="verify-code" element={<VerifyCodePage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="register-payment" element={<RegisterPaymentPage />} />
      </Route>

      {/* === Các trang được bảo vệ === */}
      <Route element={<ProtectedRoute />}>
        
        {/* Trang Favourites (cũng dùng MainLayout nhưng cần đăng nhập) */}
        <Route path="/" element={<MainLayout />}>
          <Route path="favourites" element={<FavouritesPage />} />
        </Route>

        {/* Trang Account */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<AccountProfilePage />} />
          <Route path="history" element={<AccountHistoryPage />} />
          <Route path="payment" element={<AccountPaymentPage />} />
        </Route>

        {/* Trang Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="flights" element={<AdminFlightsPage />} />
          <Route path="hotels" element={<AdminHotelsPage />} />
        </Route>
        
      </Route>
      
      {/* === Trang 404 (Không tìm thấy) === */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;