# Chess Academy Backend

This is the backend server for the Chess Academy website. It provides APIs for managing students, testimonials, services, and academy updates.

## Features

- User authentication (admin)
- Contact form submissions
- Testimonial management
- Service catalog
- News and achievements updates
- Image upload support

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary (for image storage)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/chess_academy

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Admin Configuration (for initial setup)
   ADMIN_EMAIL=admin@chessacademy.com
   ADMIN_PASSWORD=your_secure_password_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Routes

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin profile
- `PUT /api/auth/updatedetails` - Update admin details
- `PUT /api/auth/updatepassword` - Update admin password

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/:id` - Get single contact (admin only)
- `PUT /api/contact/:id` - Update contact status (admin only)
- `DELETE /api/contact/:id` - Delete contact (admin only)

### Testimonials
- `POST /api/testimonial` - Submit testimonial
- `GET /api/testimonial` - Get all approved testimonials
- `GET /api/testimonial/:id` - Get single testimonial
- `PUT /api/testimonial/:id` - Update testimonial (admin only)
- `DELETE /api/testimonial/:id` - Delete testimonial (admin only)
- `PUT /api/testimonial/:id/photo` - Upload testimonial photo (admin only)

### Services
- `POST /api/service` - Create service (admin only)
- `GET /api/service` - Get all active services
- `GET /api/service/:id` - Get single service
- `PUT /api/service/:id` - Update service (admin only)
- `DELETE /api/service/:id` - Delete service (admin only)
- `PUT /api/service/:id/image` - Upload service image (admin only)

### Updates
- `POST /api/update` - Create update (admin only)
- `GET /api/update` - Get all published updates
- `GET /api/update/:id` - Get single update
- `PUT /api/update/:id` - Update update content (admin only)
- `DELETE /api/update/:id` - Delete update (admin only)
- `PUT /api/update/:id/image` - Upload update image (admin only)

## Error Handling

The API uses a centralized error handling middleware that:
- Handles Mongoose validation errors
- Handles duplicate key errors
- Handles cast errors (invalid IDs)
- Returns appropriate HTTP status codes and error messages

## Image Upload

Images are stored in Cloudinary. The upload middleware:
- Limits file size to 5MB
- Accepts only image files
- Optimizes images for web use
- Stores images in organized folders

## Security

- JWT authentication for admin routes
- Password hashing using bcrypt
- CORS enabled
- Request body sanitization
- Protected routes for admin operations
- Secure file upload handling

## Development

To start the development server with hot reload:
```bash
npm run dev
```

## Production

To start the production server:
```bash
npm start
``` 