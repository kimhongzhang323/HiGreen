const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    const type = req.query.type; // 'news' or 'activities' (stored as 'News' or 'Activity' in DB)
    let query = "SELECT * FROM content";
    let params = [];

    if (type) {
        // Simple mapping if needed, or just match case insensitive
        let dbType = type === 'news' ? 'News' : 'Activity';
        query = "SELECT * FROM content WHERE type = ?";
        params = [dbType];
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/', authenticateToken, (req, res) => {
    const { title, date, type } = req.body;
    db.run("INSERT INTO content (title, date, views, status, type) VALUES (?, ?, 0, 'Published', ?)",
        [title, date, type],
        function (err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, message: 'Content created' });
        }
    );
});

module.exports = router;
