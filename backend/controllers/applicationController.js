const db = require('../db');

const getApplications = async (req, res) => {
  try {
    db.all(`
      SELECT a.*, c.title as course_title 
      FROM applications a 
      LEFT JOIN courses c ON a.course_id = c.id 
      ORDER BY a.created_at DESC
    `, (err, applications) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.json(applications);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createApplication = async (req, res) => {
  try {
    const { full_name, email, phone, course_id, message } = req.body;

    if (!full_name || !email || !phone || !course_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    db.run(
      'INSERT INTO applications (full_name, email, phone, course_id, message) VALUES (?, ?, ?, ?, ?)',
      [full_name, email, phone, course_id, message || ''],
      function(err) {
        if (err) {
          return res.status(500).json({ message: 'Server error', error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Application submitted successfully' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getApplications, createApplication };
