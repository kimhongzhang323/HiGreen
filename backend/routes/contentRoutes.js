const express = require('express');
const router = express.Router();

const mockNews = [
    { id: '1', title: 'New Recycling Initiative', date: '2023-11-20', views: 1205, status: 'Published', type: 'News' },
    { id: '2', title: 'City Park Cleanup', date: '2023-11-18', views: 890, status: 'Published', type: 'News' },
];

const mockActivities = [
    { id: '3', title: 'Tree Planting Day', date: '2023-12-01', participants: 45, status: 'Upcoming', type: 'Activity' },
    { id: '4', title: 'Eco-Workshop', date: '2023-12-05', participants: 20, status: 'Draft', type: 'Activity' },
];

router.get('/', (req, res) => {
    const type = req.query.type; // 'news' or 'activities'
    if (type === 'activities') return res.json(mockActivities);
    res.json(mockNews);
});

router.post('/', (req, res) => {
    res.json({ success: true, message: 'Content created' });
});

module.exports = router;
