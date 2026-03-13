const db = require('../db');

const getTrainers = async (req, res) => {
  try {
    db.all('SELECT * FROM trainers', (err, trainers) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.json(trainers);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTrainer = async (req, res) => {
  try {
    const { name, role, photo } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: 'Name and role are required' });
    }

    db.run(
      'INSERT INTO trainers (name, role, photo) VALUES (?, ?, ?)',
      [name, role, photo || null],
      function(err) {
        if (err) {
          return res.status(500).json({ message: 'Server error', error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, role, photo });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, photo } = req.body;

    db.run(
      'UPDATE trainers SET name = ?, role = ?, photo = ? WHERE id = ?',
      [name, role, photo, id],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Server error', error: err.message });
        }
        res.json({ message: 'Trainer updated successfully' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;

    db.run('DELETE FROM trainers WHERE id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.json({ message: 'Trainer deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getTrainers, createTrainer, updateTrainer, deleteTrainer };
