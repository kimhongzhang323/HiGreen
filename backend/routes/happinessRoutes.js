const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { calculateHappinessScore } = require('../utils/calculators');

router.post('/', authenticateToken, (req, res) => {
    const { answers, notes } = req.body;
    const userId = req.user.id;
    const score = calculateHappinessScore(answers);
    const date = new Date().toISOString();

    db.run("INSERT INTO happiness_logs (userId, score, date, notes) VALUES (?, ?, ?, ?)",
        [userId, score, date, notes],
        function (err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, score });
        }
    );
});

router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.all("SELECT * FROM happiness_logs WHERE userId = ? ORDER BY date DESC", [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
