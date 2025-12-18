#!/usr/bin/env node

/**
 * Test Flight Creation Script
 * This script generates and creates multiple test flights for development purposes.
 * Run with: node create-test-flights.js [count]
 */

// Define test flight data
const generateFlights = (count = 10) => {
  const airlines = [
    "Vietnam Airlines",
    "VietJet Air",
    "Bamboo Airways",
    "Pacific Airlines",
    "Jetstar Pacific"
  ];

  const locations = [
    "Hà Nội (HAN)",
    "Hồ Chí Minh (SGN)",
    "Đà Nẵng (DAD)",
    "Nha Trang (CXR)",
    "Phú Quốc (PQC)",
    "Đà Lạt (DLI)",
    "Huế (HUI)",
    "Quy Nhơn (UIH)",
    "Cần Thơ (VCA)"
  ];

  const flights = [];

  for (let i = 0; i < count; i++) {
    // Select random from/to locations (different from each other)
    let from, to;
    do {
      from = locations[Math.floor(Math.random() * locations.length)];
      to = locations[Math.floor(Math.random() * locations.length)];
    } while (from === to);

    const airline = airlines[Math.floor(Math.random() * airlines.length)];

    // Generate random future departure time (next 30 days)
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30) + 1);
    departureDate.setHours(Math.floor(Math.random() * 24)); // Random hour
    departureDate.setMinutes(Math.floor(Math.random() * 4) * 15); // 0, 15, 30, 45 minutes

    const departureTime = departureDate.toISOString();

    // Calculate arrival time (duration between 1-5 hours)
    const durationHours = Math.floor(Math.random() * 5) + 1;
    const arrivalDate = new Date(departureDate.getTime() + durationHours * 60 * 60 * 1000);
    const arrivalTime = arrivalDate.toISOString();

    // Generate flight number
    const flightNumber = `${airline.substring(0, 2).toUpperCase()}${String(100 + i).padStart(3, '0')}`;

    // Random price between 500,000 - 3,000,000 VND
    const price = Math.floor(Math.random() * 2500000) + 500000;

    flights.push({
      airline: airline,
      from: from,
      to: to,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      price: price,
      availableSeats: Math.floor(Math.random() * 100) + 20, // 20-120 seats
      logoUrl: `https://picsum.photos/100/50?random=${i + 500}`,
      flightNumber: flightNumber,
      duration: durationHours * 60, // Duration in minutes
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0 rating
      reviewCount: Math.floor(Math.random() * 50) + 1, // 1-50 reviews
      isFeatured: Math.random() < 0.3 // 30% chance of being featured
    });
  }

  return flights;
};

// Create flights via HTTP API using bulk endpoint
const createFlights = async (flights) => {
  const baseURL = 'http://localhost:8080/api/v1';
  // IMPORTANT: Replace this with your actual admin JWT token
  // To get it: Login as admin in the frontend, open DevTools, go to Application/Storage > Local Storage, find auth_token
  const adminToken = process.env.ADMIN_JWT_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc2NTc5NTkxNH0.pD-GLdLbg7rKKYbCxWE5WQfFKiu9HaeLCuDdiuFyU7A';

  try {
    console.log(`\n✈️  Creating ${flights.length} flights via bulk endpoint...`);

    const response = await fetch(`${baseURL}/admin/flights/bulk`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flights)
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      try {
        const data = await response.json();
        console.log(`✅ Bulk creation successful!`);
        console.log(`📊 Results: ${data.successCount}/${data.totalCount} flights created successfully`);
        console.log(`❌ Failed: ${data.failureCount} flights`);

        return {
          success: true,
          results: data.data || [],
          successCount: data.successCount || 0,
          failureCount: data.failureCount || 0,
          totalCount: data.totalCount || flights.length
        };
      } catch (jsonError) {
        console.error(`❌ JSON parse error:`, jsonError);
        const textResponse = await response.text();
        console.error(`Raw response:`, textResponse);
        return {
          success: false,
          error: `JSON parse error: ${jsonError.message}`
        };
      }
    } else {
      const error = await response.text();
      console.error(`❌ Failed: ${response.status} - ${error}`);
      return {
        success: false,
        error: `${response.status}: ${error}`
      };
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
};

// Main execution
const main = async () => {
  const count = parseInt(process.argv[2]) || 20;

  console.log(`🛫 Generating ${count} test flights...`);

  // Check if backend is running
  try {
    const response = await fetch('http://localhost:8080/api/v1/admin/flights', {
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

  const flights = generateFlights(count);
  console.log(`🎯 Generated ${flights.length} flights for testing.`);
  console.log('\n🚀 Creating flights via API...\n');

  const results = await createFlights(flights);

  if (results.success) {
    console.log(`\n✅ Complete! Created ${results.successCount}/${results.totalCount} flights successfully.`);
    console.log(`❌ Failed: ${results.failureCount} flights`);
  } else {
    console.log(`\n❌ Bulk creation failed: ${results.error}`);
  }

  console.log('\n🎉 Test flights creation completed!');
};

// Run the script
main().catch(console.error);
