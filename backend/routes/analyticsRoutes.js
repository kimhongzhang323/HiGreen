const express = require('express');
const router = express.Router();

router.get('/transport', (req, res) => {
    res.json({
        evTollPass: 8450,
        dailyRiders: 45200,
        ridershipChart: {
            labels: ["Bus", "MRT", "LRT", "EV"],
            data: [450, 890, 620, 310]
        },
        stations: [
            { name: "KL Sentral (Hub)", type: "train", count: 12500, total: 15000 },
            { name: "Pasar Seni (LRT)", type: "lrt", count: 8900, total: 15000 },
            { name: "Bukit Bintang (MRT)", type: "train", count: 7500, total: 15000 },
            { name: "Mid Valley (Bus)", type: "bus", count: 5200, total: 15000 }
        ]
    });
});

router.get('/dashboard', (req, res) => {
    res.json({
        stats: {
            users: "1,234",
            activeReports: 56,
            co2Saved: "12.5t",
            engagement: "89%"
        },
        impactChart: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: [20, 45, 28, 80, 99, 43, 85]
        }
    });
});

module.exports = router;
