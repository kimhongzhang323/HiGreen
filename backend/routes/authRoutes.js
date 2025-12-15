const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const { SECRET_KEY } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// Login Route
router.post('/login',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 3 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
            if (err) return res.status(500).json({ success: false, message: 'Database error' });
            if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) return res.status(401).json({ success: false, message: 'Invalid credentials' });

            // Generate Token
            const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

            res.json({
                success: true,
                token,
                user: { name: user.name, email: user.email, role: user.role, points: user.points }
            });
        });
    }
);

router.post('/register', (req, res) => {
    // In a real app, this would also hash password and insert into DB.
    // For MVP/Demo purposes, we rely on the seeded users (Admin/Kimmy).
    res.status(501).json({ success: false, message: 'Registration disabled for demo.' });
});

module.exports = router;
