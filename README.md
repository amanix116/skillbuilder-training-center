# Digital Training Center - Full Stack Project

A complete Digital Training Center website built with React, Node.js, Express, and MySQL.

## Project Overview

This is a professional digital training platform that allows:
- Students to browse courses and apply online
- Admin to manage courses, trainers, applications, and messages
- Professional, responsive design with modern UI

## Tech Stack

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Plain CSS (Blue/Dark theme)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **CORS**: Enabled

## Quick Start

### Prerequisites
- Node.js v14+
- MySQL Server
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Configure `.env` file with your MySQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=training_center_db
JWT_SECRET=your_secret_key
```

3. Initialize database:
```bash
node initDatabase.js
```

4. Start backend:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start frontend:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Admin Login

**Default Admin Credentials:**
- Email: `admin@trainingcenter.com`
- Password: `admin123`

⚠️ **Change these credentials in production!**

## Features

### Public Features
- ✅ Home page with hero, courses, testimonials
- ✅ Browse all courses
- ✅ About page with trainers
- ✅ Apply for courses
- ✅ Contact form
- ✅ Responsive design
- ✅ Professional UI/UX

### Admin Features
- ✅ Secure login with JWT
- ✅ Dashboard with statistics
- ✅ Manage courses (CRUD)
- ✅ View student applications
- ✅ Manage trainers (CRUD)
- ✅ View contact messages
- ✅ Authentication middleware

## API Documentation

### Authentication
```
POST /api/admin/login
```

### Courses
```
GET    /api/courses              # Get all courses
POST   /api/courses              # Create course (admin)
PUT    /api/courses/:id          # Update course (admin)
DELETE /api/courses/:id          # Delete course (admin)
```

### Applications
```
POST /api/applications           # Submit application
GET  /api/applications           # Get applications (admin)
```

### Trainers
```
GET    /api/trainers             # Get all trainers
POST   /api/trainers             # Create trainer (admin)
PUT    /api/trainers/:id         # Update trainer (admin)
DELETE /api/trainers/:id         # Delete trainer (admin)
```

### Contacts
```
POST /api/contacts               # Submit contact message
GET  /api/contacts               # Get messages (admin)
```

## Project Structure

```
website/
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   └── package.json
│
└── backend/
    ├── controllers/           # Business logic
    ├── routes/               # API routes
    ├── middleware/           # Auth middleware
    ├── db.js                # Database config
    ├── server.js            # Main server
    ├── initDatabase.js      # DB setup
    └── package.json
```

## Database Schema

### admins
- id, email, password (hashed)

### courses
- id, title, description, duration, price

### applications
- id, full_name, email, phone, course_id, message, created_at

### trainers
- id, name, role, photo

### contacts
- id, name, email, message, created_at

## Development

### Running in Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:** (Node.js compatible, run with `npm start`)
```bash
# Backend runs as-is, optimize as needed
```

**Frontend:**
```bash
cd frontend
npm run build
```

Outputs to `frontend/dist/`

## Security Features

- ✅ JWT authentication for admin routes
- ✅ Password hashing with bcryptjs
- ✅ Protected API endpoints
- ✅ CORS enabled
- ✅ Environment variables for secrets
- ✅ Input validation

## Performance

- ✅ Vite for fast frontend builds
- ✅ React functional components
- ✅ Optimized CSS
- ✅ Connection pooling (MySQL)
- ✅ Error handling middleware

## Deployment

### Backend Deployment
1. Set environment variables on hosting
2. Ensure MySQL is accessible
3. Install dependencies: `npm install`
4. Start: `npm start`

### Frontend Deployment
1. Build: `npm run build`
2. Deploy `dist/` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

## Troubleshooting

### Backend Issues
- Check MySQL is running
- Verify `.env` file configuration
- Check port 5000 availability
- Review server logs

### Frontend Issues
- Clear node_modules and reinstall
- Check VITE_API_URL configuration
- Verify backend is running
- Check browser console for errors

## Sample Data

The initialization script creates:
- 1 admin account
- 5 sample courses
- 5 sample trainers
- Helpful for development and testing

## Customization

### Change Color Theme
Edit in CSS files:
- Primary: `#2a5298`
- Secondary: `#1e3c72`
- Accent: `#4db8ff`

### Add More Courses
Use admin dashboard to add courses dynamically

### Modify Database
Update table schemas in `initDatabase.js`

## License

This project is provided as-is for educational purposes.

## Support

For issues or questions, review:
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`

## Next Steps

1. Install dependencies (backend & frontend)
2. Initialize database
3. Start backend server
4. Start frontend server
5. Login to admin with demo credentials
6. Start managing your training center!

Enjoy building! 🚀
