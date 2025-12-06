# 🔧 Checklist Backend - ElysianRealm

**Danh sách công việc cho Backend Team - Chỉ ghi những cần làm**

---

## 🎯 Tóm Tắt

Frontend sẵn sàng. Backend cần implement **18 endpoint API**.

- **Port:** 8080
- **Base URL:** `http://localhost:8080/api/v1`
- **Response:** camelCase JSON
- **Date:** YYYY-MM-DD format

---

## 📋 18 Endpoint Cần Implement

### 1️⃣ XÁC THỰC (6 endpoint)

- [ ] `POST /auth/login` - Đăng nhập
- [ ] `POST /auth/register` - Đăng ký
- [ ] `GET /auth/me` - Lấy user hiện tại (cần JWT)
- [ ] `POST /auth/forgot-password` - Quên mật khẩu
- [ ] `POST /auth/verify-code` - Xác minh mã
- [ ] `POST /auth/reset-password` - Đặt lại mật khẩu

### 2️⃣ CHUYẾN BAY (4 endpoint)

- [ ] `GET /flights` - Danh sách (q, from, to, date, sortBy)
- [ ] `GET /flights/:id` - Chi tiết
- [ ] `GET /flights/featured` - Nổi bật (tối đa 5)

### 3️⃣ TOUR (5 endpoint)

- [ ] `GET /tours` - Danh sách (q, location, sortBy)
- [ ] `GET /tours/:id` - Chi tiết
- [ ] `POST /admin/tours` - Tạo (chỉ admin)
- [ ] `DELETE /tours/:id` - Xóa (chỉ admin)
- [ ] `GET /tours/featured` - Nổi bật (tối đa 5)

### 4️⃣ ĐẶT CHỖ (6 endpoint)

- [ ] `GET /bookings/my-bookings` - Đặt chỗ của user (cần JWT)
- [ ] `GET /bookings/:id` - Chi tiết (cần JWT)
- [ ] `POST /bookings` - Tạo đặt chỗ (cần JWT)
- [ ] `PUT /bookings/:id/status` - Cập nhật status (cần JWT)
- [ ] `GET /admin/bookings` - Tất cả (chỉ admin)
- [ ] `PUT /admin/bookings/:id/status` - Cập nhật (chỉ admin)

### 5️⃣ TRANG CHỦ (2 endpoint)

- [ ] `GET /destinations/popular` - Điểm đến phổ biến
- [ ] `GET /reviews/featured` - Đánh giá nổi bật

### 6️⃣ ADMIN (1 endpoint)

- [ ] `GET /admin/stats` - Thống kê (chỉ admin)

---

## 🔐 Yêu Cầu Bảo Mật

- [ ] JWT token (24 giờ)
- [ ] Authorization: Bearer <token>
- [ ] Role: USER, ADMIN
- [ ] Hash mật khẩu (BCrypt)
- [ ] CORS: http://localhost:5173

---

## 📊 Database Entities

**User:** id, email, password, name, role, avatar, created_at

**Flight:** id, airline, from, to, departureTime, arrivalTime, availableSeats, price, logoUrl, flightNumber, duration, rating, reviewCount

**Tour:** id, title, location, price, description, image, rating, reviewCount, availableSeats, duration, tags, startDate, flightId (⭐ REQUIRED)

**Booking:** id, type, itemId, userId, status, date, guests, paymentMethod, totalPrice, bookingNumber, details, flightId (⭐ OPTIONAL - null nếu user không chọn kèm vé)

**Destination:** id, name, description, image, tags

**Review:** id, author, rating, text, avatar

---

## ✅ Danh Sách Kiểm Tra

### Phase 1: Setup
- [ ] Spring Boot project
- [ ] Database
- [ ] Port 8080

### Phase 2: Xác thực (6 endpoint)
- [ ] User entity & repository
- [ ] Login ✓
- [ ] Register ✓
- [ ] Get me ✓
- [ ] Forgot password ✓
- [ ] Reset password ✓

### Phase 3: Chuyến bay (4 endpoint)
- [ ] Flight entity
- [ ] List ✓
- [ ] Detail ✓
- [ ] Featured ✓

### Phase 4: Tour (5 endpoint) + Flight Link ⭐
- [ ] Tour entity: flightId (REQUIRED) - mỗi tour phải có flight
- [ ] List ✓
- [ ] Detail ✓ (return flight info từ flightId)
- [ ] Create ✓ (phải set flightId)
- [ ] Delete ✓
- [ ] Featured ✓

### Phase 5: Đặt chỗ (6 endpoint) + Flight Booking ⭐
- [ ] Booking entity: flightId (OPTIONAL)
- [ ] My bookings ✓
- [ ] Detail ✓
- [ ] Create ✓ (flightId có thể null nếu user không chọn kèm vé)
- [ ] Update status ✓
- [ ] Get all ✓

### Phase 6: Trang chủ & Admin (3 endpoint)
- [ ] Popular ✓
- [ ] Reviews ✓
- [ ] Stats ✓

### Phase 7: Test
- [ ] Mỗi endpoint
- [ ] JWT
- [ ] Admin access
- [ ] CORS
- [ ] Frontend integration

---

## 📌 Quan Trọng

✓ **Response:** `{ "id": 1, "name": "..." }`

✓ **Error:** `{ "message": "Error", "status": "error" }`

✓ **Date:** YYYY-MM-DD

✓ **camelCase:** departureTime, availableSeats, flightId

✓ **Hybrid Model - Tour + Flight:**
  - Mỗi Tour LUÔN có flightId (required)
  - Khi booking tour: user có thể chọn kèm vé hoặc không
  - Nếu chọn kèm vé: flightId được thêm vào booking
  - Nếu không chọn: flightId = null

✓ **Protected:** Cần Authorization header

✓ **Admin:** `/admin/*` chỉ ADMIN role

---

## 🎯 Bước Tiếp Theo

1. Tạo project
2. Setup database
3. Implement 18 endpoint
4. Test từng endpoint
5. Test với frontend
6. Deploy

---

**Frontend chờ bạn! 🚀**

Chi tiết xem BACKEND_QUICK_START.md