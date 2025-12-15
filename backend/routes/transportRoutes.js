const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { calculateCarbonSaved } = require('../utils/calculators');

router.post('/log', authenticateToken, (req, res) => {
    const { mode, distance } = req.body;
    const userId = req.user.id;

    if (!mode || distance === undefined) return res.status(400).json({ success: false, message: 'Missing fields' });

    const distVal = parseFloat(distance);
    const co2Saved = calculateCarbonSaved(mode, distVal);
    const date = new Date().toISOString();

    db.run("INSERT INTO transport_logs (userId, mode, distance, co2_saved, date) VALUES (?, ?, ?, ?, ?)",
        [userId, mode, distVal, co2Saved, date],
        function (err) {
            if (err) return res.status(500).json({ success: false, message: err.message });

            // Also update user total points (e.g., 10 pts per kg saved + 5 base)
            const pointsEarned = Math.floor(co2Saved * 10) + 5;

            db.run("UPDATE users SET points = points + ? WHERE id = ?", [pointsEarned, userId]);

            res.json({ success: true, co2Saved, pointsEarned });
        }
    );
});

router.get('/history', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.all("SELECT * FROM transport_logs WHERE userId = ? ORDER BY date DESC", [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
