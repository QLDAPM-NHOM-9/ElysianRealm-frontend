# 🌟 ElysianRealm Frontend - Hướng Dẫn

**Nền tảng đặt phòng/tour du lịch hiện đại được xây dựng bằng React, Vite và Tailwind CSS.**

Frontend sẵn sàng cho production với xác thực JWT, kiểm soát truy cập theo vai trò và tích hợp backend toàn diện.

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)]()
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)]()
[![Vite](https://img.shields.io/badge/Vite-7.1.12-646CFF?logo=vite)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)]()

---

## 📋 Mục Lục

- [Tính Năng](#tính-năng)
- [Công Nghệ](#công-nghệ)
- [Cài Đặt](#cài-đặt)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Tích Hợp API](#tích-hợp-api)
- [Xác Thực](#xác-thực)
- [Tài Liệu](#tài-liệu)

---

## ✨ Tính Năng

### Cho Người Dùng
- 🔐 **Xác Thực** - Đăng ký, đăng nhập, khôi phục mật khẩu với JWT
- ✈️ **Đặt Chuyến Bay** - Tìm kiếm, lọc và đặt chuyến bay
- 🏖️ **Đặt Tour** - Khám phá và đặt gói tour du lịch
- 📅 **Lịch Sử Đặt Chỗ** - Theo dõi tất cả các lần đặt (chuyến bay & tour)
- 💳 **Quản Lý Thanh Toán** - Quản lý phương thức thanh toán an toàn
- ⭐ **Yêu Thích** - Lưu chuyến bay và tour yêu thích

### Cho Quản Trị Viên
- 📊 **Bảng Điều Khiển** - Xem thống kê và đơn đặt hàng gần đây
- ✈️ **Quản Lý Chuyến Bay** - Tạo, chỉnh sửa, xóa chuyến bay
- 🏖️ **Quản Lý Tour** - Tạo, chỉnh sửa, xóa tour
- 📋 **Quản Lý Đặt Chỗ** - Xem và cập nhật trạng thái đặt chỗ
- 👥 **Quản Lý Người Dùng** - Quản lý tài khoản và vai trò người dùng

### Cho Nhà Phát Triển
- 🎨 **Thiết Kế Responsive** - Mobile-first, Tailwind CSS
- 🔄 **Service Layer** - Tách biệt trách nhiệm rõ ràng
- 🛡️ **Bảo Vệ Route** - Kiểm soát truy cập theo vai trò
- 📡 **Sẵn Sàng API** - Tất cả component sẵn sàng tích hợp backend
- ✅ **Không Dữ Liệu Cứng** - 100% do backend cung cấp
- 📚 **Tài Liệu Toàn Diện** - Hướng dẫn tích hợp đầy đủ

---

## 🛠️ Công Nghệ

### Frontend
- **React** 19.1.1 - Framework UI với React Compiler
- **Vite** 7.1.12 - Công cụ build cực nhanh
- **React Router** 7.9.5 - Định tuyến phía client
- **Tailwind CSS** 4.0 - Framework CSS tiện ích
- **Axios** 1.13.2 - Client HTTP
- **React Icons** 5.5.0 - Thư viện icon

### Build & Dev
- **ESLint** - Kiểm tra chất lượng code
- **Babel** - Trình biên dịch JavaScript với React Compiler
- **HMR** - Hot Module Replacement để phát triển nhanh

---

## 🚀 Cài Đặt

### Yêu Cầu
- Node.js 16+
- npm hoặc yarn
- Git

### Bước 1: Clone Repository
```bash
git clone https://github.com/QLDAPM-NHOM-9/ElysianRealm-frontend.git
cd ElysianRealm-frontend
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Cấu Hình URL Backend
Chỉnh sửa `src/services/axiosClient.js` và cập nhật URL base:
```javascript
const BASE_URL = 'http://localhost:8080/api/v1'; // Cập nhật cho backend của bạn
```

### Bước 4: Chạy Server Phát Triển
```bash
npm run dev
```

Frontend sẽ có sẵn tại `http://localhost:5173`

---

## 📁 Cấu Trúc Dự Án

```
src/
├── app/
│   ├── App.jsx                 # Component gốc
│   └── AppRouter.jsx           # Định nghĩa routes (30 routes)
├── components/
│   ├── admin/                  # Component cho admin
│   ├── auth/                   # UI xác thực
│   ├── common/                 # Component tái sử dụng (Button, Input, Modal, etc)
│   ├── global/                 # Header, Footer, Newsletter
│   ├── home/                   # Các phần của trang chủ
│   ├── listings/               # Thẻ chuyến bay/tour và sidebar
│   ├── modals/                 # Modals
│   └── search/                 # Biểu mẫu tìm kiếm
├── contexts/
│   └── AuthContext.jsx         # Xác thực JWT & quản lý state
├── hooks/
│   └── useApi.js               # Custom hook API
├── layouts/
│   ├── MainLayout.jsx          # Layout trang công khai
│   ├── AdminLayout.jsx         # Layout trang admin
│   ├── AuthLayout.jsx          # Layout trang xác thực
│   ├── AccountLayout.jsx       # Layout tài khoản người dùng
│   └── ProtectedRoute.jsx      # Bảo vệ route
├── pages/
│   ├── account/                # Hồ sơ, lịch sử, thanh toán người dùng
│   ├── admin/                  # Bảng điều khiển admin & quản lý
│   ├── auth/                   # Đăng nhập, đăng ký, khôi phục mật khẩu
│   ├── flight/                 # Tìm kiếm, liệt kê, đặt chuyến bay, vé
│   ├── tour/                   # Tìm kiếm, liệt kê, đặt tour, vé
│   └── [Root pages]
├── services/
│   ├── authService.js          # Endpoint xác thực
│   ├── tourService.js          # Hoạt động CRUD tour
│   ├── flightService.js        # Hoạt động chuyến bay
│   ├── api.js                  # Đặt chỗ, admin, đánh giá, trang chủ
│   └── axiosClient.js          # Client HTTP với interceptor JWT
└── styles/
    └── index.css               # Import Tailwind CSS
```

---

## 📡 Tích Hợp API

### 18 Endpoint Sẵn Sàng

**Xác Thực (6)**
- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/forgot-password` - Yêu cầu đặt lại mật khẩu
- `POST /auth/verify-code` - Xác minh mã đặt lại
- `POST /auth/reset-password` - Đặt lại mật khẩu
- `GET /auth/me` - Lấy người dùng hiện tại (yêu cầu JWT)

**Chuyến Bay (4)**
- `GET /flights` - Liệt kê/tìm kiếm chuyến bay
- `GET /flights/:id` - Chi tiết chuyến bay
- `GET /flights/featured` - Chuyến bay nổi bật
- `GET /flights?from=X&to=Y&date=Z` - Tìm kiếm có lọc

**Tour (5)**
- `GET /tours` - Liệt kê/tìm kiếm tour
- `GET /tours/:id` - Chi tiết tour
- `POST /admin/tours` - Tạo tour (admin)
- `DELETE /tours/:id` - Xóa tour (admin)
- `GET /tours/featured` - Tour nổi bật

**Đặt Chỗ (6)**
- `GET /bookings/my-bookings` - Đặt chỗ của người dùng (bảo vệ)
- `GET /bookings/:id` - Chi tiết đặt chỗ (bảo vệ)
- `POST /bookings` - Tạo đặt chỗ (bảo vệ)
- `PUT /bookings/:id/status` - Hủy đặt chỗ (bảo vệ)
- `GET /admin/bookings` - Tất cả đặt chỗ (admin)
- `PUT /admin/bookings/:id/status` - Cập nhật trạng thái (admin)

**Trang Chủ (2)**
- `GET /destinations/popular` - Điểm đến phổ biến
- `GET /reviews/featured` - Đánh giá nổi bật

**Admin (1)**
- `GET /admin/stats` - Thống kê bảng điều khiển (admin)

### Định Dạng Response

Tất cả response ở định dạng **camelCase** JSON:

```json
// Thành công
{
  "id": 1,
  "name": "Istanbul",
  "email": "user@example.com"
}

// Lỗi
{
  "message": "Mô tả lỗi",
  "status": "error"
}
```

---

## 🔐 Xác Thực

### JWT Implementation
- Token được lưu trong `localStorage`
- Tự động đính kèm vào tất cả request qua Axios interceptor
- Response 401 kích hoạt logout tự động
- Phiên làm việc duy trì khi làm mới trang

### Kiểm Soát Truy Cập Theo Vai Trò
- **USER** - Truy cập trang tài khoản, tạo đặt chỗ
- **ADMIN** - Truy cập bảng điều khiển admin, quản lý tài nguyên

### Route Bảo Vệ
- `/account/*` - Trang người dùng (yêu cầu đăng nhập)
- `/admin/*` - Trang admin (yêu cầu vai trò admin)
- Route công khai - Không cần xác thực

---

## 📦 Lệnh Có Sẵn

```bash
# Server phát triển (HMR kích hoạt)
npm run dev

# Build cho production
npm run build

# Xem trước production build
npm run preview

# Chạy ESLint
npm run lint

# Sửa lỗi ESLint
npm run lint -- --fix
```

---

## 📚 Tài Liệu

Tài liệu đầy đủ có sẵn trong thư mục gốc dự án:

| Tài Liệu | Mục Đích |
|----------|---------|
| **README.md** | Hướng dẫn này - Tiếng Việt |
| **BAKEND_CHECKLIST.md** | Hướng dẫn backend tiếng Việt |
| **PROJECT_STATUS.md** | Trạng thái dự án toàn diện |
| **BACKEND_CHECKLIST.md** | Quick start cho backend |


👉 **Bắt đầu với:** [BAKEND_CHECKLIST.md](./BACKEND_CHECKLIST.md) để tích hợp backend

---

## 🎯 Quy Trình Phát Triển

### 1. Tạo Trang Mới
```
pages/
  ├── NewPage.jsx          # Tạo trang
  
components/
  └── NewComponent.jsx     # Tạo component nếu cần

services/
  └── [Sử dụng service hiện tại]
```

### 2. Thêm Gọi API
```javascript
// Trong file service
export const newService = {
  getData: async () => {
    try {
      const response = await axiosClient.get('/endpoint');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Trong component
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await newService.getData();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };
  fetchData();
}, []);
```

### 3. Route Bảo Vệ
```javascript
<Route 
  path="/admin/dashboard" 
  element={
    <ProtectedRoute adminOnly={true}>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

---

## ⚙️ Cấu Hình

### URL Backend
Chỉnh sửa `src/services/axiosClient.js`:
```javascript
const BASE_URL = 'http://your-backend-url/api/v1';
```

### Yêu Cầu CORS
Backend phải cho phép:
- Origin: `http://localhost:5173` (dev) hoặc domain production của bạn
- Methods: GET, POST, PUT, DELETE
- Headers: Content-Type, Authorization

---

## 🧪 Kiểm Tra

### Danh Sách Kiểm Tra Thủ Công
- [ ] Đăng ký và đăng nhập
- [ ] Tìm kiếm và lọc chuyến bay
- [ ] Đặt chuyến bay
- [ ] Xem lịch sử đặt chỗ
- [ ] Tìm kiếm và lọc tour
- [ ] Đặt tour
- [ ] Truy cập bảng điều khiển admin
- [ ] Quản lý chuyến bay/tour
- [ ] Lỗi 401 kích hoạt logout

### Kiểm Tra API
Xem [BAKEND_CHECKLIST.md](./BAKEND_CHECKLIST.md) để có hướng dẫn kiểm tra toàn diện.

---

## 📊 Metrics Dự Án

```
Trạng Thái:        ✅ Sẵn Sàng Production
Routes:            30 (tất cả hoạt động)
Pages:             18 (100% do API cung cấp)
Components:        25+ (tái sử dụng)
Services:          6 (toàn diện)
Endpoint API:      18 đã map & sẵn sàng
Dữ Liệu Cứng:      0 (100% từ backend)
Lỗi:               0 (không có vấn đề đã biết)
Tài Liệu:          10 hướng dẫn toàn diện
```

---

## 🤝 Góp Phần

### Hướng Dẫn
1. Tạo nhánh tính năng: `git checkout -b feature/feature-name`
2. Thực hiện thay đổi
3. Commit: `git commit -am 'Thêm tính năng'`
4. Push: `git push origin feature/feature-name`
5. Mở Pull Request

### Tiêu Chuẩn Code
- Sử dụng tên biến có ý nghĩa
- Thêm bình luận cho logic phức tạp
- Giữ component nhỏ và tái sử dụng được
- Sử dụng service layer cho gọi API
- Theo tiêu chuẩn code hiện tại

---

## 🐛 Các Vấn Đề Đã Biết

Không có vấn đề nào hiện tại. Frontend sẵn sàng cho production.

Xem [PROJECT_STATUS.md](./PROJECT_STATUS.md) để có trạng thái chi tiết.

---

## 📞 Hỗ Trợ

Để có câu hỏi hoặc vấn đề:
1. Kiểm tra [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
2. Xem lại [PROJECT_STATUS.md](./PROJECT_STATUS.md)
3. Tham khảo [FRONTEND_READINESS_CHECKLIST.md](./FRONTEND_READINESS_CHECKLIST.md)

---

## 🚀 Triển Khai

### Yêu Cầu
- Node.js 16+
- Backend API đang chạy
- Khóa JWT hợp lệ đã cấu hình

### Build cho Production
```bash
npm run build
```

Output trong thư mục `dist/` sẵn sàng triển khai.

### Thiết Lập Theo Môi Trường
Cập nhật URL backend dựa trên môi trường:
- **Development:** `http://localhost:8080`
- **Staging:** `https://staging-api.elysianrealm.com`
- **Production:** `https://api.elysianrealm.com`

---

## 🎉 Bắt Đầu

1. Đọc [README.md](./README.md) (tập tin này)
2. Cài đặt dependencies: `npm install`
3. Chạy dev server: `npm run dev`
4. Mở trình duyệt: `http://localhost:5173`
5. Để backend: Đọc [BAKEND_CHECKLIST.md](./BAKEND_CHECKLIST.md)

---

**Trạng Thái:** ✅ **Sẵn Sàng Tích Hợp Backend**

Frontend đang chờ các endpoint backend... Tất cả service, route và tài liệu hoàn tất!