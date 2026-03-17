# SkillBuilder Training Center

Node.js + Express backend for the SkillBuilder Training Center website.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Update the `.env` file with your MySQL credentials:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=training_center_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### 3. Initialize Database

Run the initialization script to create database and tables:

```bash
node initDatabase.js
```

This will create:
- Database: `training_center_db`
- Tables: admins, courses, applications, trainers, contacts
- Sample data including an admin account

**Default Admin Credentials:**
- Email: admin@trainingcenter.com
- Password: admin123

### 4. Start the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (requires authentication)
- `PUT /api/courses/:id` - Update course (requires authentication)
- `DELETE /api/courses/:id` - Delete course (requires authentication)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get all applications (requires authentication)

### Trainers
- `GET /api/trainers` - Get all trainers
- `POST /api/trainers` - Create trainer (requires authentication)
- `PUT /api/trainers/:id` - Update trainer (requires authentication)
- `DELETE /api/trainers/:id` - Delete trainer (requires authentication)

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all messages (requires authentication)

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
backend/
├── controllers/      # Request handlers
├── routes/          # API routes
├── middleware/      # Authentication middleware
├── db.js            # Database connection
├── server.js        # Main server file
├── initDatabase.js  # Database initialization script
└── package.json
```

## Database Schema

### admins
- id (INT, PK, AI)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)

### courses
- id (INT, PK, AI)
- title (VARCHAR)
- description (TEXT)
- duration (VARCHAR)
- price (DECIMAL)

### applications
- id (INT, PK, AI)
- full_name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- course_id (INT, FK)
- message (TEXT)
- created_at (TIMESTAMP)

### trainers
- id (INT, PK, AI)
- name (VARCHAR)
- role (VARCHAR)
- photo (LONGTEXT)

### contacts
- id (INT, PK, AI)
- name (VARCHAR)
- email (VARCHAR)
- message (TEXT)
- created_at (TIMESTAMP)

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for admin authentication
- CORS enabled for frontend communication
- Protected routes for admin operations

## Notes

- Change the JWT_SECRET in production
- Use environment variables for sensitive data
- Ensure MySQL is running before starting the server
- Default admin password should be changed after first login
