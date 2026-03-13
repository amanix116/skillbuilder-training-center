const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'training_center.db');

const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
        return;
      }

      db.serialize(() => {
        console.log('Creating tables...');

        // Enable foreign keys
        db.run('PRAGMA foreign_keys = ON');

        // Admins table
        db.run(`
          CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Courses table
        db.run(`
          CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            duration TEXT,
            price REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Applications table
        db.run(`
          CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            course_id INTEGER,
            message TEXT,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
          )
        `);

        // Trainers table
        db.run(`
          CREATE TABLE IF NOT EXISTS trainers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT,
            photo TEXT,
            bio TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Contacts table
        db.run(`
          CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT,
            status TEXT DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, async (err) => {
          if (err) {
            console.error('Error creating tables:', err);
            db.close();
            reject(err);
            return;
          }

          console.log('Inserting sample data...');

          try {
            // Insert sample admin
            const hashedPassword = await bcrypt.hash('admin123', 10);
            db.run(
              'INSERT OR IGNORE INTO admins (email, password) VALUES (?, ?)',
              ['admin@trainingcenter.com', hashedPassword]
            );

            // Insert sample courses
            const courses = [
              {
                title: 'Web Development Fundamentals',
                description: 'Learn the basics of HTML, CSS, and JavaScript to build responsive websites.',
                duration: '8 weeks',
                price: 199.99
              },
              {
                title: 'React.js Advanced',
                description: 'Master React hooks, state management, and modern frontend architecture.',
                duration: '10 weeks',
                price: 249.99
              },
              {
                title: 'Node.js & Express',
                description: 'Build scalable backend applications with Node.js and Express framework.',
                duration: '8 weeks',
                price: 200.09
              },
              {
                title: 'Full Stack Development',
                description: 'Complete journey from frontend to backend with real-world projects.',
                duration: '16 weeks',
                price: 399.99
              },
              {
                title: 'UI/UX Design Principles',
                description: 'Learn design fundamentals, wireframing, prototyping, and user research.',
                duration: '6 weeks',
                price: 179.99
              }
            ];

            courses.forEach(course => {
              db.run(
                'INSERT OR IGNORE INTO courses (title, description, duration, price) VALUES (?, ?, ?, ?)',
                [course.title, course.description, course.duration, course.price]
              );
            });

            // Insert sample trainers
            const trainers = [
              { name: 'John Smith', role: 'Senior Web Developer', bio: 'Expert in full-stack web development with 10+ years experience' },
              { name: 'Sarah Johnson', role: 'UI/UX Designer', bio: 'Award-winning designer specializing in user-centered design' },
              { name: 'Mike Wilson', role: 'DevOps Engineer', bio: 'Cloud infrastructure and deployment specialist' },
              { name: 'Emily Davis', role: 'Full Stack Developer', bio: 'Passionate about building scalable web applications' },
              { name: 'Alex Chen', role: 'Data Science Lead', bio: 'Data scientist with expertise in machine learning' }
            ];

            trainers.forEach(trainer => {
              db.run(
                'INSERT OR IGNORE INTO trainers (name, role, bio) VALUES (?, ?, ?)',
                [trainer.name, trainer.role, trainer.bio]
              );
            });

            setTimeout(() => {
              console.log('Database initialized successfully!');
              console.log('Admin email: admin@trainingcenter.com');
              console.log('Admin password: admin123');

              db.close((err) => {
                if (err) {
                  console.error('Error closing database:', err);
                  reject(err);
                } else {
                  resolve();
                }
              });
            }, 1000);
          } catch (error) {
            console.error('Error during initialization:', error);
            db.close();
            reject(error);
          }
        });
      });
    });
  });
};

initializeDatabase().catch(err => {
  console.error('Initialization failed:', err);
  process.exit(1);
});
