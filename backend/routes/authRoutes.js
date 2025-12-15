const express = require('express');
const router = express.Router();

// Mock User Database
const users = [
    { email: 'admin', password: '123', role: 'admin', name: 'Administrator' },
    { email: 'test', password: '123', role: 'user', name: 'Kimmy' }
];

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            success: true,
            token: 'mock-jwt-token-123',
            user: { name: user.name, email: user.email, role: user.role }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

router.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    // Mock registration
    res.json({ success: true, message: 'User registered successfully' });
});

module.exports = router;
