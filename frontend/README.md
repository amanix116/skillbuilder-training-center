# Digital Training Center - Frontend

React + Vite frontend for the Digital Training Center website.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure API URL

The API URL is configured in `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Change this if your backend is running on a different URL.

### 3. Start Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

### 4. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Features

### Public Pages
- **Home**: Hero section, featured courses, testimonials
- **Courses**: All available courses with details
- **About**: Mission, vision, values, trainers
- **Apply**: Application form for courses
- **Contact**: Contact form and information

### Admin Features
- **Admin Login**: Secure admin authentication
- **Dashboard**: Overview with statistics
- **Manage Courses**: Add, edit, delete courses
- **View Applications**: See all student applications
- **Manage Trainers**: Add, edit, delete trainers
- **View Messages**: See contact form submissions

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── *.css
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── About.jsx
│   │   ├── Apply.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── *.css
│   ├── services/       # API services
│   │   └── api.js      # Axios API client
│   ├── App.jsx         # Main App component
│   ├── App.css
│   ├── index.css       # Global styles
│   └── main.jsx        # React entry point
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tsconfig.json       # TypeScript config (for Vite)
└── package.json        # Dependencies
```

## Styling

- **Plain CSS** (no Tailwind or CSS framework)
- **Color Scheme**: Blue/Dark education theme
  - Primary: `#2a5298`
  - Secondary: `#1e3c72`
  - Accent: `#4db8ff`
- **Responsive**: Mobile-first design
- **Professional**: Card-based layout with hover effects

## Authentication

- Admin login stores JWT token in localStorage
- Token automatically added to API requests
- Protected routes redirect to login if no token

## Responsive Design

All pages are fully responsive:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (<768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Vite for fast bundling
- React functional components
- Lazy loading ready
- Optimized CSS and assets

## Development Workflow

1. Make changes to components
2. Vite automatically reloads
3. Check browser for updates
4. Build when ready for production

## Deployment

### Build for production:
```bash
npm run build
```

### Deploy the dist folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Notes

- Ensure backend is running before starting frontend
- API calls fail gracefully with error messages
- localStorage is used for authentication tokens
- All forms have validation and success feedback

## Troubleshooting

**CORS errors:**
- Ensure backend has CORS enabled
- Check VITE_API_URL is correct

**API connection issues:**
- Verify backend is running on port 5000
- Check network tab in browser DevTools

**Build errors:**
- Delete node_modules and package-lock.json
- Run npm install again
