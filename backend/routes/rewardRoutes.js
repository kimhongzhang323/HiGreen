const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    db.all("SELECT * FROM rewards", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/redeem', authenticateToken, (req, res) => {
    // In a real app, strict transaction logic here.
    const userId = req.user.id;
    db.get("SELECT points FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) return res.status(500).json({ success: false });
        // Assume cost is passed or looked up. For demo, just deduct 500.
        const newPoints = row.points - 500;

        db.run("UPDATE users SET points = ? WHERE id = ?", [newPoints, userId], (err) => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true, message: 'Voucher redeemed successfully', remainingPoints: newPoints });
        });
    });
});

module.exports = router;
