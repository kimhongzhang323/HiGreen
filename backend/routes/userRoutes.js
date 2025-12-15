const express = require('express');
const router = express.Router();

const mockProfile = {
    name: 'Kimmy',
    email: 'kimmy@higreen.com',
    points: 20525,
    co2Saved: 58,
    reports: 12,
    badges: [
        { id: 1, name: 'Eco Starter', icon: 'leaf', color: '#10b981' },
        { id: 2, name: 'Super Recycler', icon: 'recycle', color: '#3b82f6' },
        { id: 3, name: 'City Walker', icon: 'walk', color: '#f59e0b' },
    ]
};

const checkInStatus = [
    { day: 'Mon', amount: 10, status: 'claimed' },
    { day: 'Tue', amount: 10, status: 'claimed' },
    { day: 'Wed', amount: 20, status: 'claimed' },
    { day: 'Thu', amount: 10, status: 'missed' },
    { day: 'Fri', amount: 50, status: 'today' },
    { day: 'Sat', amount: 10, status: 'upcoming' },
    { day: 'Sun', amount: 100, status: 'upcoming' },
];

router.get('/profile', (req, res) => {
    res.json(mockProfile);
});

router.get('/checkin', (req, res) => {
    res.json(checkInStatus);
});

router.post('/checkin', (req, res) => {
    res.json({ success: true, pointsAdded: 50, message: 'Checked in successfully!' });
});

module.exports = router;
