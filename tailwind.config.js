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
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        
        // --- THÊM DÒNG NÀY ---
        'brand': ['Quicksand', 'serif'] // Đặt tên là 'brand'
      },
      keyframes: {
        // Animation lơ lửng (đã có)
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-50px) rotate(3deg)' },
        },
        // Animation phát sáng (MỚI)
        glow: {
          '0%, 100%': { 
            // 1. Dùng filter: drop-shadow để glow theo hình dạng logo
            // 2. Dùng màu #EC4899 (brand-primary) của bạn
            filter: 'drop-shadow(0 0 5px rgba(236, 72, 153, 0.2))' 
          },
          '50%': { 
            filter: 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.9))' 
          },
        }
      },
      animation: {
        // Giữ nguyên 2 animation cũ
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        
        // --- THÊM ANIMATION MỚI (GỘP CẢ HAI) ---
        'float-glow': 'float 6s ease-in-out infinite, glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [
    // Thêm plugin này để style form đẹp hơn
    require('@tailwindcss/forms'),
  ],
}