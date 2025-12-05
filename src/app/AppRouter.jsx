import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- Import Layouts ---
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import AccountLayout from '../layouts/AccountLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import ProtectedRoute from '../layouts/ProtectedRoute.jsx';

// --- Import Pages ---
import HomePage from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AboutUsPage from '../pages/AboutUsPage.jsx';
import ContactUsPage from '../pages/ContactUsPage.jsx';
import FavouritesPage from '../pages/FavouritesPage.jsx';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.jsx';
import VerifyCodePage from '../pages/auth/VerifyCodePage.jsx';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage.jsx';
import RegisterPaymentPage from '../pages/auth/RegisterPaymentPage.jsx';

// Account Pages
import AccountProfilePage from '../pages/account/AccountProfilePage.jsx';
import AccountHistoryPage from '../pages/account/AccountHistoryPage.jsx';
import AccountPaymentPage from '../pages/account/AccountPaymentPage.jsx';

// Admin Pages
import DashboardPage from '../pages/admin/DashboardPage.jsx';
import AdminUsersPage from '../pages/admin/AdminUsersPage.jsx';
import AdminBookingsPage from '../pages/admin/AdminBookingsPage.jsx';
import AdminFlightsPage from '../pages/admin/AdminFlightsPage.jsx';
import AdminToursPage from '../pages/admin/AdminToursPage.jsx'; // <-- ĐÃ SỬA: Dùng AdminToursPage

// Flight Pages
import FlightSearchPage from '../pages/flight/FlightSearchPage.jsx';
import FlightListingPage from '../pages/flight/FlightListingPage.jsx';
import FlightDetailPage from '../pages/flight/FlightDetailPage.jsx';
import FlightBookingPage from '../pages/flight/FlightBookingPage.jsx';
import FlightTicketPage from '../pages/flight/FlightTicketPage.jsx';

// Tour Pages
import TourSearchPage from '../pages/tour/TourSearchPage.jsx';
import TourListingPage from '../pages/tour/TourListingPage.jsx';
import TourDetailPage from '../pages/tour/TourDetailPage.jsx';
import TourBookingPage from '../pages/tour/TourBookingPage.jsx';
import TourTicketPage from '../pages/tour/TourTicketPage.jsx';


const AppRouter = () => {
  return (
    <Routes>
      {/* === Public Routes (MainLayout) === */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        
        {/* --- FLIGHT ROUTES --- */}
        <Route path="flights" element={<FlightSearchPage />} />
        <Route path="flight-listing" element={<FlightListingPage />} />
        <Route path="flight-detail/:id" element={<FlightDetailPage />} />
        <Route path="flight-booking" element={<FlightBookingPage />} />
        <Route path="flight-ticket/:id" element={<FlightTicketPage />} />

        {/* --- TOUR ROUTES (ĐÃ CẬP NHẬT) --- */}
        <Route path="tours" element={<TourSearchPage />} />
        <Route path="tour-listing" element={<TourListingPage />} />
        <Route path="tour-detail/:id" element={<TourDetailPage />} />
        <Route path="tour-booking" element={<TourBookingPage />} />
        <Route path="tour-ticket/:id" element={<TourTicketPage />} />

        {/* --- FOOTER PAGES --- */}
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
      </Route>

      {/* === Auth Routes === */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="verify-code" element={<VerifyCodePage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="register-payment" element={<RegisterPaymentPage />} />
      </Route>

      {/* === Protected Routes === */}
      {/* === Protected Routes === */}
      <Route element={<ProtectedRoute adminOnly={false} />}>
        {/* Favourites (Cần đăng nhập) */}
        <Route path="/" element={<MainLayout />}>
          <Route path="favourites" element={<FavouritesPage />} />
        </Route>

        {/* Account Routes */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<AccountProfilePage />} />
          <Route path="history" element={<AccountHistoryPage />} />
          <Route path="payment" element={<AccountPaymentPage />} />
        </Route>
      </Route>

      {/* === Admin Routes (Admin only) === */}
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="flights" element={<AdminFlightsPage />} />
          <Route path="tours" element={<AdminToursPage />} />
        </Route>
      </Route>

      {/* === 404 Page === */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;