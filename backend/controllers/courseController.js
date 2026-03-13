const db = require('../db');

const getCourses = async (req, res) => {
  try {
    db.all('SELECT * FROM courses', (err, courses) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.json(courses);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;

    if (!title || !description || !duration || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    db.run(
      'INSERT INTO courses (title, description, duration, price) VALUES (?, ?, ?, ?)',
      [title, description, duration, price],
      function(err) {
        if (err) {
          return res.status(500).json({ message: 'Server error', error: err.message });
        }
        res.status(201).json({ id: this.lastID, title, description, duration, price });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, price } = req.body;

    db.run(
      'UPDATE courses SET title = ?, description = ?, duration = ?, price = ? WHERE id = ?',
      [title, description, duration, price, id],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Server error', error: err.message });
        }
        res.json({ message: 'Course updated successfully' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    db.run('DELETE FROM courses WHERE id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.json({ message: 'Course deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
