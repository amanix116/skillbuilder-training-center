const db = require('../db');

const getContacts = async (req, res) => {
  try {
    db.all('SELECT * FROM contacts ORDER BY created_at DESC', (err, contacts) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.json(contacts);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    db.run(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message],
      function(err) {
        if (err) {
          return res.status(500).json({ message: 'Server error', error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Message sent successfully' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getContacts, createContact };
