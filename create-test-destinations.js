#!/usr/bin/env node

/**
 * Test Destinations Creation Script
 * This script generates and creates multiple test destinations for development purposes.
 * Run with: node create-test-destinations.js [count]
 */

// Define test destination data
const generateDestinations = (count = 10) => {
  const destinations = [
    { name: "Hà Nội, Việt Nam", description: "Thủ đô nghìn năm văn hiến với phố cổ, đền chùa và văn hóa truyền thống", tags: "Văn hóa, Lịch sử, Ẩm thực", popularity: 95 },
    { name: "Hồ Chí Minh, Việt Nam", description: "Thành phố sôi động với kiến trúc hiện đại và cuộc sống đô thị", tags: "Đô thị, Mua sắm, Văn hóa", popularity: 90 },
    { name: "Đà Nẵng, Việt Nam", description: "Thành phố biển với bãi biển đẹp và núi non hùng vĩ", tags: "Biển, Du lịch, Thắng cảnh", popularity: 88 },
    { name: "Nha Trang, Việt Nam", description: "Thiên đường biển đảo với nước biển trong xanh và hải sản tươi ngon", tags: "Biển, Lặn, Nghỉ dưỡng", popularity: 85 },
    { name: "Đà Lạt, Việt Nam", description: "Thành phố ngàn hoa với khí hậu mát lạnh và kiến trúc Pháp", tags: "Núi, Hoa, Văn hóa", popularity: 82 },
    { name: "Sapa, Việt Nam", description: "Vùng núi cao với ruộng bậc thang và bản làng dân tộc", tags: "Núi, Văn hóa, Trekking", popularity: 80 },
    { name: "Hội An, Việt Nam", description: "Phố cổ với kiến trúc cổ xưa và đèn lồng lung linh", tags: "Lịch sử, Văn hóa, Biển", popularity: 78 },
    { name: "Phong Nha, Việt Nam", description: "Hang động kỳ quan với hệ thống động hang lớn nhất thế giới", tags: "Hang động, Thắng cảnh, Khám phá", popularity: 75 },
    { name: "Cần Thơ, Việt Nam", description: "Thủ phủ miền Tây với chợ nổi và vườn cây ăn trái", tags: "Sông nước, Ẩm thực, Văn hóa", popularity: 72 },
    { name: "Hạ Long, Việt Nam", description: "Vịnh biển với hàng nghìn đảo đá vôi kỳ ảo", tags: "Biển, Thắng cảnh, Du thuyền", popularity: 70 },
    { name: "Phú Quốc, Việt Nam", description: "Đảo ngọc với bãi biển đẹp và hải sản phong phú", tags: "Biển, Nghỉ dưỡng, Ẩm thực", popularity: 68 },
    { name: "Biển Ba, Việt Nam", description: "Biển xanh ngắt ngưòi với cát trắng và nước trong veo", tags: "Biển, Lặn, Thắng cảnh", popularity: 65 }
  ];

  const result = [];
  for (let i = 0; i < Math.min(count, destinations.length); i++) {
    const dest = destinations[i];
    result.push({
      name: dest.name,
      description: dest.description,
      image: `https://picsum.photos/400/300?random=${i + 200}`,
      tags: dest.tags,
      popularity: dest.popularity
    });
  }

  return result;
};

// Create destinations via HTTP API
const createDestinations = async (destinations) => {
  const baseURL = 'http://localhost:8080/api/v1';
  // IMPORTANT: Replace this with your actual admin JWT token
  // To get it: Login as admin in the frontend, open DevTools, go to Application/Storage > Local Storage, find auth_token
  const adminToken = process.env.ADMIN_JWT_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc2NTc5NTkxNH0.pD-GLdLbg7rKKYbCxWE5WQfFKiu9HaeLCuDdiuFyU7A';

  const results = [];

  for (let i = 0; i < destinations.length; i++) {
    const destination = destinations[i];
    try {
      console.log(`\n🔄 Creating destination ${i + 1}/${destinations.length}: ${destination.name}`);

      const response = await fetch(`${baseURL}/admin/destinations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          data: destination
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success: Created destination with ID ${data.data?.id || 'unknown'}`);
        results.push({ success: true, id: data.data?.id, name: destination.name });
      } else {
        const error = await response.text();
        console.error(`❌ Failed: ${response.status} - ${error}`);
        results.push({ success: false, name: destination.name, error: `${response.status}: ${error}` });
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      results.push({ success: false, name: destination.name, error: error.message });
    }

    // Delay between requests to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return results;
};

// Main execution
const main = async () => {
  const count = parseInt(process.argv[2]) || 12;

  console.log(`🏕️  Generating ${count} test destinations...`);

  // Check if backend is running
  try {
    const response = await fetch('http://localhost:8080/api/v1/admin/destinations', {
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

  const destinations = generateDestinations(count);
  console.log(`🎯 Generated ${destinations.length} destinations for testing.`);
  console.log('\n📤 Creating destinations via API...\n');

  const results = await createDestinations(destinations);

  const successCount = results.filter(r => r.success).length;
  const failureCount = results.length - successCount;

  console.log(`\n✅ Complete! Created ${successCount} destinations, ${failureCount} failed.`);

  if (failureCount > 0) {
    console.log('\n❌ Failed destinations:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
  }

  console.log('\n🎉 Test destinations are now ready in your database!');
};

// Run the script
main().catch(console.error);
