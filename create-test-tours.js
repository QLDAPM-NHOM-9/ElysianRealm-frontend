#!/usr/bin/env node

/**
 * Test Tour Creation Script
 * This script generates and creates multiple test tours for development purposes.
 * Run with: node create-test-tours.js [count]
 */

// Define test tour data
const generateTours = (count = 10) => {
  const locations = [
    "Ha Nội, Việt Nam",
    "Hồ Chí Minh, Việt Nam",
    "Đà Nẵng, Việt Nam",
    "Nha Trang, Việt Nam",
    "Đà Lạt, Việt Nam",
    "Sapa, Việt Nam",
    "Hội An, Việt Nam",
    "Phong Nha, Việt Nam",
    "Cần Thơ, Việt Nam",
    "Hạ Long, Việt Nam",
    "Phú Quốc, Việt Nam",
    "Biển Ba, Việt Nam"
  ];

  const destinations = [
    "Núi rừng miền Bắc",
    "Du lịch biển miền Trung",
    "Khám phá Tây Nguyên",
    "Tham quan miền Tây sông nước",
    "Trải nghiệm phố cổ",
    "Thắng cảnh đẹp"
  ];

  const tourTypes = [
    "Tour trọn gói",
    "Tour mạo hiểm",
    "Tour văn hóa",
    "Tour ốc đảo",
    "Tour kết hợp"
  ];

  const tours = [];

  for (let i = 0; i < count; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const tourType = tourTypes[Math.floor(Math.random() * tourTypes.length)];
    const dayCount = Math.floor(Math.random() * 5) + 2; // 2-6 days

    // Random future date (next 60 days)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60) + 1);
    const dateString = startDate.toISOString().split('T')[0];

    tours.push({
      title: `${tourType} khám phá ${location}`,
      location: location,
      price: Math.floor(Math.random() * 5000000) + 1000000, // VND 1M-6M
      description: `${tourType} độc đáo đến ${destination} tại ${location}. Chương trình ${dayCount} ngày ${dayCount - 1} đêm với đầy đủ hoạt động thú vị, trải nghiệm văn hóa địa phương và thưởng thức ẩm thực đặc sắc. Giá tour bao gồm: vận chuyển, khách sạn, bữa ăn, hướng dẫn viên và các dịch vụ khác.`,
      imageUrl: `https://picsum.photos/800/600?random=${i + 100}`,
      duration: `${dayCount} ngày ${dayCount - 1} đêm`,
      gallery: [
        `https://picsum.photos/400/300?random=${i + 200}`,
        `https://picsum.photos/400/300?random=${i + 300}`,
        `https://picsum.photos/400/300?random=${i + 400}`
      ],
      startDate: dateString,
      itinerary: [
        `Ngày 1: Xuất phát từ thành phố, nhận phòng khách sạn tại ${location}`,
        `Ngày 2: Tham quan các điểm nổi tiếng, trải nghiệm hoạt động địa phương`,
        `Ngày 3: Học hỏi văn hóa, thử ẩm thực đặc trưng vùng miền`,
        `Ngày 4: Tham gia hoạt động team building, ghi lại kỷ niệm`,
        `Ngày ${dayCount}: Trả phòng, trở về với bao kỷ niệm đáng nhớ`
      ]
    });
  }

  return tours;
};

// Create tours via HTTP API
const createTours = async (tours) => {
  const baseURL = 'http://localhost:8080/api/v1';
  // IMPORTANT: Replace this with your actual admin JWT token
  // To get it: Login as admin in the frontend, open DevTools, go to Application/Storage > Local Storage, find auth_token
  const adminToken = process.env.ADMIN_JWT_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc2NTc5NTkxNH0.pD-GLdLbg7rKKYbCxWE5WQfFKiu9HaeLCuDdiuFyU7A';

  const results = [];

  for (let i = 0; i < tours.length; i++) {
    const tour = tours[i];
    try {
      console.log(`\n🔄 Creating tour ${i + 1}/${tours.length}: ${tour.title}`);

      const response = await fetch(`${baseURL}/admin/tours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(tour)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success: Created tour with ID ${data.data?.id || 'unknown'}`);
        results.push({ success: true, id: data.data?.id, title: tour.title });
      } else {
        const error = await response.text();
        console.error(`❌ Failed: ${response.status} - ${error}`);
        results.push({ success: false, title: tour.title, error: `${response.status}: ${error}` });
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      results.push({ success: false, title: tour.title, error: error.message });
    }

    // Delay between requests to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return results;
};

// Main execution
const main = async () => {
  const count = parseInt(process.argv[2]) || 20;

  console.log(`🏕️  Generating ${count} test tours...`);

  // Check if backend is running
  try {
    const response = await fetch('http://localhost:8080/api/v1/admin/tours', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczNDIyMjM5MywiZXhwIjoxNzM0MzA4NzkyLCJyb2xlcyI6IlJPTEVfQURNSU4ifQ.PCmgzoJGQHkLjCMtz_I8%2BhEAAdxgLkNTwMEobbv4grpuzPqfXvYdBO0uk2NjgxnKbdUtmmAmIozEryuKwDP_A'
      }
    });
    if (!response.ok) throw new Error('Backend not accessible or authentication failed');
  } catch (error) {
    console.error('❌ Backend server not running or authentication issues. Please start the backend server and ensure admin authentication.');
    console.error('For authentication, you might need to login as admin and get the JWT token first.');
    process.exit(1);
  }

  const tours = generateTours(count);
  console.log(`🎯 Generated ${tours.length} tours for testing.`);
  console.log('\n📤 Creating tours via API...\n');

  const results = await createTours(tours);

  const successCount = results.filter(r => r.success).length;
  const failureCount = results.length - successCount;

  console.log(`\n✅ Complete! Created ${successCount} tours, ${failureCount} failed.`);

  if (failureCount > 0) {
    console.log('\n❌ Failed tours:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.title}: ${r.error}`);
    });
  }

  console.log('\n🎉 Test tours are now ready in your database!');
};

// Run the script
main().catch(console.error);
