# 🎓 Digital Training Center - Complete Installation & Setup Guide

## 📋 Overview

This guide will walk you through setting up the complete Digital Training Center platform in **less than 10 minutes**.

**What you'll have after setup:**
- ✅ Running frontend (React + Vite)
- ✅ Running backend (Node.js + Express)
- ✅ MySQL database with sample data
- ✅ Admin dashboard access
- ✅ Full student application system

---

## ⚙️ Prerequisites

Before starting, ensure you have:

### Required Software
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MySQL Server** ([Download](https://dev.mysql.com/downloads/mysql/))
- **Git** (optional, for version control)
- **Code Editor** (VS Code recommended)

### Verify Installation
```bash
node --version      # Should show v14 or higher
npm --version       # Should show 6.0 or higher
mysql --version     # Should show MySQL version
```

### System Requirements
- Windows / Mac / Linux
- 500MB free disk space
- 4GB RAM minimum

---

## 🔧 Step 1: Backend Setup (3 minutes)

### 1.1 Navigate to Backend Directory
```bash
cd e:\website\backend
```

### 1.2 Install Dependencies
```bash
npm install
```

**What it installs:**
- express (web framework)
- mysql2 (database driver)
- cors (cross-origin handling)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- dotenv (environment config)

**Wait for completion** (~30-60 seconds)

### 1.3 Configure Database

Open `e:\website\backend\.env` in your code editor:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=training_center_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

**Update if needed:**
- `DB_USER`: Your MySQL username (usually `root`)
- `DB_PASSWORD`: Your MySQL password (leave empty if no password)

### 1.4 Initialize Database

```bash
node initDatabase.js
```

**Expected output:**
```
Creating database...
Creating tables...
Inserting sample data...
Database initialized successfully!
Admin email: admin@trainingcenter.com
Admin password: admin123
```

✅ **Database is ready!**

### 1.5 Start Backend Server

```bash
npm run dev
```

**Expected output:**
```
Server running on port 5000
```

✅ **Leave this terminal open and running**

---

## 🎨 Step 2: Frontend Setup (3 minutes)

**Open a NEW terminal window (keep backend running in the first one)**

### 2.1 Navigate to Frontend Directory
```bash
cd e:\website\frontend
```

### 2.2 Install Dependencies
```bash
npm install
```

**Wait for completion** (~60 seconds)

### 2.3 Verify API Configuration

Check `e:\website\frontend\.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

✅ **Already configured correctly**

### 2.4 Start Frontend Server

```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.8  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

✅ **Frontend is running!**

---

## 🌐 Step 3: Access the Application

### 3.1 Open Your Browser

Visit: **http://localhost:5173**

✅ **You should see the Digital Training Center home page**

### 3.2 Explore Public Pages

Click on the navigation menu to visit:
- ✅ **Home** - Hero section, featured courses
- ✅ **Courses** - All available courses
- ✅ **About** - Training center info and trainers
- ✅ **Apply** - Apply for a course
- ✅ **Contact** - Contact form

### 3.3 Test Student Features

**Try applying for a course:**
1. Go to **Apply** page
2. Fill in the form:
   - Full Name: Your Name
   - Email: your@email.com
   - Phone: 555-1234
   - Course: Select any course
   - Message: Optional
3. Click **Submit Application**
4. See success message ✅

---

## 🔐 Step 4: Admin Dashboard Access

### 4.1 Go to Admin Login

Click **Admin** in the top-right navbar or visit:
**http://localhost:5173/admin/login**

### 4.2 Login with Demo Credentials

```
Email:    admin@trainingcenter.com
Password: admin123
```

### 4.3 Access Dashboard

After login, you'll see the admin dashboard with:
- 📊 Statistics (courses, applications, trainers, messages)
- 📚 Course management
- 📋 View applications
- 👨‍🏫 Trainer management
- 💬 View contact messages

---

## ✨ Step 5: Admin Features Testing

### 5.1 Add a New Course

1. Click **📚 Courses** in admin nav
2. Fill in the form:
   - Title: "Advanced Python"
   - Description: "Master Python programming"
   - Duration: "10 weeks"
   - Price: "299.99"
3. Click **Add Course**
4. See it in the courses list ✅

### 5.2 Add a New Trainer

1. Click **👨‍🏫 Trainers** in admin nav
2. Fill in:
   - Name: "Jane Doe"
   - Role: "Senior Developer"
3. Click **Add Trainer**
4. See it in trainers list ✅

### 5.3 View Applications

1. Click **📋 Applications**
2. See all student applications
3. Shows: Name, Email, Phone, Course, Date

### 5.4 View Contact Messages

1. Click **💬 Messages**
2. See all contact form submissions
3. Shows: Name, Email, Message, Date

---

## 📊 API Testing (Optional)

### Test Endpoints with Postman or cURL

**Get all courses:**
```bash
curl http://localhost:5000/api/courses
```

**Login as admin:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trainingcenter.com","password":"admin123"}'
```

---

## 🐛 Troubleshooting

### Issue: Backend won't start

**Error:** `Port 5000 already in use`
```bash
# Change port in backend/.env
PORT=3000
```

**Error:** `Cannot connect to MySQL`
```bash
# Check MySQL is running
# Verify credentials in .env
# Run: node initDatabase.js again
```

### Issue: Frontend won't load

**Error:** `Cannot GET /`
```bash
# Ensure backend is running on port 5000
# Check VITE_API_URL in frontend/.env
```

**Error:** `CORS error in console`
```bash
# Backend not running
# Check network connection
# Verify API URL
```

### Issue: Database not created

**Error:** `Table doesn't exist`
```bash
# Run: node initDatabase.js
# Check MySQL is running
# Verify credentials
```

### Issue: Module not found

**Error:** `Cannot find module 'express'`
```bash
# Run: npm install
# Delete node_modules and package-lock.json
# Run npm install again
```

---

## 📁 Project Structure Reference

```
website/
├── backend/
│   ├── controllers/       (5 files - API logic)
│   ├── routes/           (5 files - endpoints)
│   ├── middleware/       (auth.js)
│   ├── server.js         (main server)
│   ├── db.js             (database config)
│   ├── initDatabase.js   (setup script)
│   ├── package.json
│   └── .env              (configuration)
│
└── frontend/
    ├── src/
    │   ├── pages/        (7 page files)
    │   ├── components/   (2 components)
    │   ├── services/     (api.js)
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── .env              (configuration)
```

---

## 🎯 Sample Data

The database comes pre-loaded with:

**5 Sample Courses:**
- Web Development Fundamentals
- React.js Advanced
- Node.js & Express
- Full Stack Development
- UI/UX Design Principles

**5 Sample Trainers:**
- John Smith (Senior Web Developer)
- Sarah Johnson (UI/UX Designer)
- Mike Wilson (DevOps Engineer)
- Emily Davis (Full Stack Developer)
- Alex Chen (Data Science Lead)

**1 Admin Account:**
- Email: admin@trainingcenter.com
- Password: admin123

---

## 🔄 Development Workflow

### During Development

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Auto-reloads on file changes
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Hot module reloading
```

### Making Changes

1. Edit files in `backend/` or `frontend/`
2. Changes auto-reload in browser
3. No need to restart servers

### Testing Changes

- Backend: Visit API endpoints directly
- Frontend: Refresh browser
- Check browser console for errors

---

## 📦 Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Creates optimized build in `dist/` folder

### Deploy Frontend
1. Copy `dist/` folder contents
2. Upload to hosting (Vercel, Netlify, etc.)
3. Configure backend URL in production

### Deploy Backend
1. Set environment variables on server
2. Run: `npm install && npm start`
3. Ensure MySQL is accessible

---

## ✅ Verification Checklist

After setup, verify everything works:

### Backend ✅
- [ ] Backend running on http://localhost:5000
- [ ] Health check: `curl http://localhost:5000/api/health`
- [ ] Can see courses: `curl http://localhost:5000/api/courses`

### Frontend ✅
- [ ] Frontend running on http://localhost:5173
- [ ] Home page loads
- [ ] Navigation links work
- [ ] Navbar shows "Admin" button

### Database ✅
- [ ] Database created: `training_center_db`
- [ ] Tables created (5 tables)
- [ ] Sample data loaded

### Admin Features ✅
- [ ] Can login with demo credentials
- [ ] Dashboard shows statistics
- [ ] Can view courses
- [ ] Can view trainers
- [ ] Can add new course

### Student Features ✅
- [ ] Can browse courses
- [ ] Can apply for course
- [ ] Can send contact message
- [ ] Can view about page
- [ ] Responsive on mobile

---

## 🚀 Next Steps

1. ✅ Customize courses in admin
2. ✅ Add your own trainers
3. ✅ Change admin password
4. ✅ Update footer contact info
5. ✅ Change theme colors if desired
6. ✅ Deploy to production

---

## 📚 Additional Resources

- **Backend Docs**: `backend/README.md`
- **Frontend Docs**: `frontend/README.md`
- **Project Overview**: `README.md`
- **Quick Reference**: `QUICK_START.md`

---

## 💬 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the README files
3. Check browser console (F12) for errors
4. Verify all prerequisites are installed

---

## 🎉 You're Ready!

Your Digital Training Center is now fully set up and running.

**Visit:** http://localhost:5173

**Admin login:** http://localhost:5173/admin/login

**Enjoy building! 🚀**

---

**Last Updated:** December 26, 2024
**Project:** Digital Training Center
**Version:** 1.0.0
