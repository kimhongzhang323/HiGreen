const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// Get All Reports (Protected)
router.get('/', authenticateToken, (req, res) => {
    const status = req.query.status;
    let query = "SELECT * FROM reports ORDER BY id DESC";
    let params = [];

    if (status && status !== 'All') {
        query = "SELECT * FROM reports WHERE status = ? ORDER BY id DESC";
        params = [status];
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create Report (Protected)
router.post('/', authenticateToken, [
    body('type').notEmpty(),
    body('location').notEmpty(),
    body('description').isLength({ min: 10 })
], (req, res) => {

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { type, location, date, description, priority = 'P2' } = req.body;
    const userId = req.user.id;

    const stmt = db.prepare("INSERT INTO reports (type, location, date, status, priority, description, userId) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run([type, location, date, 'Pending', priority, description, userId], function (err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, id: this.lastID, message: 'Report submitted successfully' });
    });
    stmt.finalize();
});

// Resolve Report (Protected)
router.patch('/:id/resolve', authenticateToken, (req, res) => {
    db.run("UPDATE reports SET status = ? WHERE id = ?", ['Resolved', req.params.id], function (err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        if (this.changes === 0) return res.status(404).json({ success: false, message: 'Report not found' });
        res.json({ success: true, message: 'Report resolved' });
    });
});

module.exports = router;
