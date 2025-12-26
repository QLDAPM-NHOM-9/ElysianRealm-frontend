#!/usr/bin/env node

/**
 * Test Reviews Creation Script
 * This script generates and creates multiple test reviews for development purposes.
 * Run with: node create-test-reviews.js [count]
 */

// Define test review data
const generateReviews = (count = 15) => {
  const reviewTexts = [
    "Trải nghiệm tuyệt vời! Hướng dẫn viên rất chuyên nghiệp và thân thiện. Chuyến đi rất đáng nhớ.",
    "Dịch vụ tốt, giá cả hợp lý. Nơi ở sạch sẽ và thoải mái. Sẽ quay lại lần sau.",
    "Thật sự ấn tượng với cảnh quan và văn hóa địa phương. Khuyến khích mọi người nên thử.",
    "Chuyến đi hoàn hảo từ đầu đến cuối. Mọi thứ đều được sắp xếp chu đáo và chuyên nghiệp.",
    "Trải nghiệm khó quên với những người dân địa phương thân thiện và ẩm thực tuyệt vời.",
    "Tour được tổ chức rất tốt, đúng lịch trình. Hài lòng với dịch vụ và chất lượng.",
    "Một chuyến đi đáng nhớ với nhiều hoạt động thú vị và khám phá mới mẻ.",
    "Dịch vụ khách hàng xuất sắc, luôn hỗ trợ kịp thời. Rất hài lòng với trải nghiệm.",
    "Cảnh quan tuyệt đẹp, con người thân thiện. Đây là chuyến đi tốt nhất tôi từng có.",
    "Mọi thứ đều vượt quá mong đợi. Từ chỗ ở đến các hoạt động đều rất chất lượng.",
    "Chuyến đi tuyệt vời với nhiều kỷ niệm đẹp. Sẽ giới thiệu cho bạn bè và người thân.",
    "Tổ chức chuyên nghiệp, an toàn và đầy đủ tiện nghi. Rất đáng để trải nghiệm.",
    "Trải nghiệm văn hóa sâu sắc và khám phá thiên nhiên tuyệt vời. Thật sự đáng tiền.",
    "Hướng dẫn viên nhiệt tình, kiến thức sâu rộng. Chuyến đi rất ý nghĩa và bổ ích.",
    "Dịch vụ hoàn hảo, từ khâu chuẩn bị đến kết thúc chuyến đi. Rất hài lòng!"
  ];

  const authors = [
    "Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E",
    "Đỗ Thị F", "Bùi Văn G", "Vũ Thị H", "Đinh Văn I", "Ngô Thị K"
  ];

  const locations = [
    "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Nha Trang", "Đà Lạt",
    "Sapa", "Hội An", "Phong Nha", "Cần Thơ", "Hạ Long"
  ];

  const reviews = [];
  for (let i = 0; i < count; i++) {
    const isTour = Math.random() > 0.3; // 70% tours, 30% flights
    const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
    const author = authors[Math.floor(Math.random() * authors.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const text = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];

    reviews.push({
      type: isTour ? "TOUR" : "FLIGHT",
      itemId: Math.floor(Math.random() * 20) + 1, // Assume IDs 1-20 exist
      rating: rating,
      text: text,
      author: author,
      avatar: `https://picsum.photos/100/100?random=${i + 500}`,
      location: location,
      title: isTour ? `Tour du lịch ${location}` : `Chuyến bay đến ${location}`,
      img: `https://picsum.photos/600/400?random=${i + 600}`
    });
  }

  return reviews;
};

// Create reviews via HTTP API
const createReviews = async (reviews) => {
  const baseURL = 'http://localhost:8080/api/v1';
  // IMPORTANT: Replace this with your actual user JWT token (not admin)
  // To get it: Login as a regular user in the frontend, open DevTools, go to Application/Storage > Local Storage, find auth_token
  const userToken = process.env.USER_JWT_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJleHAiOjE3NjU3OTU5MTR9._placeholder_token_replace_with_real_one';

  const results = [];

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    try {
      console.log(`\n🔄 Creating review ${i + 1}/${reviews.length}: ${review.title} (${review.rating}⭐)`);

      const response = await fetch(`${baseURL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          data: review
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success: Created review with ID ${data.data?.id || 'unknown'}`);
        results.push({ success: true, id: data.data?.id, title: review.title });
      } else {
        const error = await response.text();
        console.error(`❌ Failed: ${response.status} - ${error}`);
        results.push({ success: false, title: review.title, error: `${response.status}: ${error}` });
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      results.push({ success: false, title: review.title, error: error.message });
    }

    // Delay between requests to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return results;
};

// Main execution
const main = async () => {
  const count = parseInt(process.argv[2]) || 15;
  const specificTourId = process.argv[3] ? parseInt(process.argv[3]) : null; // Optional specific tour ID

  console.log(`⭐ Generating ${count} test reviews...`);
  if (specificTourId) {
    console.log(`🎯 Creating reviews for tour ID: ${specificTourId}`);
  }

  // Check if backend is running
  try {
    const response = await fetch('http://localhost:8080/api/v1/reviews/featured', {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Backend not accessible');
  } catch (error) {
    console.error('❌ Backend server not running. Please start the backend server.');
    process.exit(1);
  }

  const reviews = generateReviews(count);
  console.log(`🎯 Generated ${reviews.length} reviews for testing.`);
  console.log('\n📤 Creating reviews via API...\n');

  const results = await createReviews(reviews);

  const successCount = results.filter(r => r.success).length;
  const failureCount = results.length - successCount;

  console.log(`\n✅ Complete! Created ${successCount} reviews, ${failureCount} failed.`);

  if (failureCount > 0) {
    console.log('\n❌ Failed reviews:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.title}: ${r.error}`);
    });
  }

  console.log('\n🎉 Test reviews are now ready in your database!');
  console.log('Note: Some reviews may fail if the referenced tour/flight IDs do not exist.');
  console.log('Make sure to create tours and flights first, or update the itemId values accordingly.');
};

// Run the script
main().catch(console.error);
