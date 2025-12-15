const express = require('express');
const router = express.Router();

let mockReports = [
    {
        id: '1', type: 'Illegal Dumping', location: 'Central Park North',
        date: '2023-11-15', status: 'Pending', priority: 'P0',
        description: 'Large pile of chemical waste near playground.'
    },
    {
        id: '2', type: 'Broken Streetlamp', location: '5th Avenue',
        date: '2023-11-14', status: 'Resolved', priority: 'P2',
        description: 'Light flickering on corner.'
    },
    {
        id: '3', type: 'Pothole', location: 'Main St',
        date: '2023-11-12', status: 'Pending', priority: 'P1',
        description: 'Deep pothole causing traffic slowdown.'
    },
    {
        id: '5', type: 'Fallen Tree', location: 'River Road',
        date: '2023-11-16', status: 'Pending', priority: 'P0',
        description: 'Blocking two lanes of traffic.'
    },
];

router.get('/', (req, res) => {
    // Basic filter
    const status = req.query.status;
    if (status && status !== 'All') {
        const filtered = mockReports.filter(r => r.status === status);
        return res.json(filtered);
    }
    res.json(mockReports);
});

router.post('/', (req, res) => {
    const newReport = { id: Date.now().toString(), status: 'Pending', priority: 'P2', ...req.body };
    mockReports.unshift(newReport);
    res.json({ success: true, report: newReport });
});

router.patch('/:id/resolve', (req, res) => {
    const report = mockReports.find(r => r.id === req.params.id);
    if (report) {
        report.status = 'Resolved';
        res.json({ success: true, report });
    } else {
        res.status(404).json({ success: false, message: 'Report not found' });
    }
});

module.exports = router;
