const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
  try {
    const { type, q } = req.query;
    let sql = 'SELECT * FROM clinics';
    const params = [];

    if (type) {
      sql += ' WHERE type = ?';
      params.push(type);
    } else if (q) {
      sql += ' WHERE name LIKE ? OR type LIKE ? OR nurse_name LIKE ?';
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    const [rows] = await db.query(sql, params);
    res.json({ success: true, count: rows.length, clinics: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clinics WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Clínica não encontrada' });
    res.json({ success: true, clinic: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ success: false, message: 'query é obrigatória' });

    const like = `%${query}%`;
    const [rows] = await db.query(
      'SELECT * FROM clinics WHERE name LIKE ? OR type LIKE ? OR nurse_name LIKE ?',
      [like, like, like]
    );

    res.json({ success: true, count: rows.length, clinics: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

module.exports = router;

