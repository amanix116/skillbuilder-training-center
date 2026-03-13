const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    db.get('SELECT * FROM admins WHERE email = ?', [email], async (err, admin) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
      }

      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not set in environment variables');
        return res.status(500).json({ message: 'Server configuration error: JWT_SECRET not set' });
      }

      const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      res.json({ token, adminId: admin.id });
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { adminLogin };
