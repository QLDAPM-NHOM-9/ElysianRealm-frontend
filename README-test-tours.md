# Test Tours Creator

A utility script to generate and bulk create test tours for development and testing purposes.

## Features

- Generates realistic Vietnamese tourism tours
- Randomizes locations, descriptions, and prices
- Creates tours with galleries and itineraries
- Uses Lorem Picsum for placeholder images
- Batch creation with progress tracking

## Prerequisites

1. **Backend Server Running**: Make sure your Spring Boot backend is running on `http://localhost:8080`
2. **Admin Authentication**: You need a valid admin JWT token

## Getting an Admin Token

1. **Login as Admin**:
   - Go to your frontend application
   - Login with admin credentials
   - Open browser developer tools (F12)

2. **Get JWT Token**:
   - Go to the Application/Storage tab
   - Look at Local Storage or Session Storage
   - Find the key `auth_token` or similar (contains JWT token starting with "eyJ...")
   - Copy the token value

3. **Update the Script**:
   - Open `create-test-tours.js`
   - Find the line with `adminToken`
   - Replace with your actual JWT token

## Usage

### Generate 20 Default Tours
```bash
cd Frontend
node create-test-tours.js
```

### Generate Custom Number of Tours
```bash
cd Frontend
node create-test-tours.js 50  # Creates 50 tours
```

### Using Environment Variable for Token
```bash
cd Frontend
ADMIN_JWT_TOKEN="your_jwt_token_here" node create-test-tours.js 30
```

### Options

- First argument: Number of tours to create (default: 20)
- The script will show progress for each tour creation
- Automatic delays prevent server overload

## Sample Tours Generated

The script creates tours with:

- **Locations**: Major Vietnamese destinations (Hanoi, HCMC, Danang, etc.)
- **Prices**: Random VND 1,000,000 - 6,000,000
- **Durations**: 2-6 days and 1-5 nights
- **Features**: Detailed descriptions, itineraries, image galleries
- **Start Dates**: Random future dates within next 60 days

## Output

```
🏕️  Generating 20 test tours...
🎯 Generated 20 tours for testing.

📤 Creating tours via API...

🔄 Creating tour 1/20: Tour trọn gói khám phá Đà Nẵng, Việt Nam
✅ Success: Created tour with ID 123
🔄 Creating tour 2/20: Tour mạo hiểm khám phá Nha Trang, Việt Nam
✅ Success: Created tour with ID 124
...

✅ Complete! Created 20 tours, 0 failed.
🎉 Test tours are now ready in your database!
```

## Troubleshooting

### Backend Not Running
```
❌ Backend server not running or authentication issues.
```
**Solution**: Start your backend server first.

### Authentication Failed
```
❌ Backend not accessible or authentication failed
```
**Solutions**:
- Check JWT token is valid and not expired
- Ensure you're using an admin JWT token
- Verify the token format (should start with "eyJ...")

### Token Expired
- Admin tokens expire after 24 hours (86400 seconds)
- Get a new token by logging in again

## Notes

- The script includes rate limiting (300ms delays) to prevent server overload
- All images use Lorem Picsum service for stable development testing
- Tours are created with realistic Vietnamese content in Vietnamese language
- Created tours can be viewed, edited, or deleted through the admin panel

## Example Usage in Code

If you want to use the generation logic programmatically:

```javascript
import { generateTestTours, createBulkTours } from './src/services/tourService.js';

const tours = generateTestTours(10); // Generate 10 tours
const results = await createBulkTours(tours); // Create via API
