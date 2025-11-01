/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Quét tất cả các file .jsx trong src
  ],
  theme: {
    extend: {
      colors: {
        // === Bảng màu Elysian Realm MỚI ===
        
        // Màu Hồng/Tím chính (thay cho green)
        // Lấy từ màu hoa và bầu trời
        'brand-primary': '	#ff9fd9ff',
        'brand-secondary': '#ff6bc1ff', 
        'brand-pale': '#FDF2F8',     
        
        // Màu Chữ (thay cho màu đen/xám-lục)
        // Dùng màu tím đậm/xám lạnh để hợp với tông hồng
        'text-primary': '#444054',   // Tím than đậm (thay cho đen #112211)
        'text-secondary': '#6B7280', // Xám lạnh (gray-500)
        'text-tertiary': '#9CA3AF',  // Xám lạnh nhạt hơn (gray-400)

        // Màu Nền
        'bg-primary': '#FFFFFF',     // Trắng
        'bg-secondary': '#FAF7FB',   // Nền xám-tím rất nhạt (thay cho #FAFAFA)

        // Màu Viền
        'border-primary': '#E5E7EB', // Xám lạnh (gray-200)
        
        // === MÀU CŨ (Bạn có thể xóa đi) ===
        // 'brand-green': '#31B48E',
        // 'brand-green-light': '#C1F6E4',
        // 'brand-green-pale': '#F0FBF7',
      },
      fontFamily: {
        // Giữ nguyên font Inter
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    // Thêm plugin này để style form đẹp hơn
    require('@tailwindcss/forms'),
  ],
}