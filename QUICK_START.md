# 🚀 Digital Training Center - QUICK START GUIDE

## ⚡ Installation & Setup (5 Minutes)

### Prerequisites
- Node.js v14+ installed
- MySQL Server running
- Two terminal windows

---

## 🔧 Backend Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Database
Open `backend/.env` and update with your MySQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=training_center_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### Step 3: Initialize Database
```bash
node initDatabase.js
```

**This creates:**
- Database: `training_center_db`
- 5 tables with relationships
- Sample courses and trainers
- Admin account

### Step 4: Start Backend Server
```bash
npm run dev
```

✅ **Backend running on**: http://localhost:5000

---

## 🎨 Frontend Setup

### Step 1: Install Dependencies (new terminal)
```bash
cd frontend
npm install
```

### Step 2: Start Frontend Server
```bash
npm run dev
```

✅ **Frontend running on**: http://localhost:5173

---

## 🌐 Access the Application

### Public Pages
- **Home**: http://localhost:5173
- **Courses**: http://localhost:5173/courses
- **About**: http://localhost:5173/about
- **Apply**: http://localhost:5173/apply
- **Contact**: http://localhost:5173/contact

### Admin Portal
- **Login**: http://localhost:5173/admin/login
- **Dashboard**: http://localhost:5173/admin/dashboard

---

## 🔐 Admin Credentials

```
Email:    admin@trainingcenter.com
Password: admin123
```

⚠️ **Change in production!**

---

## 📋 Features to Test

### Student Features:
1. ✅ Browse courses on home page
2. ✅ View all courses on courses page
3. ✅ Read about trainers on about page
4. ✅ Apply for a course
5. ✅ Send a contact message

### Admin Features:
1. ✅ Login with admin credentials
2. ✅ View dashboard statistics
3. ✅ Add/edit/delete courses
4. ✅ View student applications
5. ✅ View contact messages
6. ✅ Manage trainers

---

## 📁 Project Structure

```
website/
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── pages/          # 7 page components
│   │   ├── components/     # Navbar, Footer
│   │   └── services/       # API client
│   └── package.json
│
└── backend/                # Node.js + Express
    ├── controllers/        # API logic
    ├── routes/            # Endpoints
    ├── middleware/        # Auth
    ├── server.js
    ├── db.js
    └── package.json
```

---

## 🔌 API Endpoints

**Authentication:**
```
POST /api/admin/login
```

**Courses:**
```
GET    /api/courses
POST   /api/courses (admin)
PUT    /api/courses/:id (admin)
DELETE /api/courses/:id (admin)
```

**Applications:**
```
POST /api/applications
GET  /api/applications (admin)
```

**Trainers:**
```
GET    /api/trainers
POST   /api/trainers (admin)
PUT    /api/trainers/:id (admin)
DELETE /api/trainers/:id (admin)
```

**Contacts:**
```
POST /api/contacts
GET  /api/contacts (admin)
```

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change PORT in backend/.env
PORT=3000
```

**Database connection error:**
1. Ensure MySQL is running
2. Check credentials in `.env`
3. Run `node initDatabase.js` again

**CORS errors:**
1. Backend must be running
2. Check API URL in frontend `.env`

**Module not found:**
```bash
cd backend (or frontend)
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Sample Data

Database initialized with:
- 1 Admin account
- 5 Courses
- 5 Trainers
- Ready to use!

---

## 🎨 Customization

**Change theme colors** in CSS:
- Primary: `#2a5298`
- Secondary: `#1e3c72`
- Accent: `#4db8ff`

**Update company info:**
- Footer: `frontend/src/components/Footer.jsx`
- Contact: `frontend/src/pages/Contact.jsx`

---

## 📦 Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

**Backend:**
```bash
# Set env variables on host
npm install
npm start
```

---

## 📚 Documentation

- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Full Project: `README.md`

---

## ✨ Key Features

✅ Professional UI/UX
✅ JWT Authentication  
✅ Full Admin Dashboard
✅ Course Management
✅ Student Applications
✅ Trainer Management
✅ Contact Forms
✅ Responsive Design

---

## 🚀 You're Ready!

1. Start backend: `npm run dev`
2. Start frontend: `npm run dev`
3. Open http://localhost:5173
4. Login with admin credentials
5. Start managing!

**Enjoy! 🎉**
