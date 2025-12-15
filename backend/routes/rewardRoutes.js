const express = require('express');
const router = express.Router();

const VOUCHERS = [
    { id: 1, title: 'Amazon Gift Card', cost: '1800 pts', value: 'RM 50', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { id: 2, title: 'Starbucks Coffee', cost: '500 pts', value: 'RM 15', icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png' },
    { id: 3, title: 'Grab Ride Promo', cost: '800 pts', value: 'RM 10', icon: 'https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png' },
    { id: 4, title: 'Adidas Voucher', cost: '10000 pts', value: 'RM 200', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
];

router.get('/', (req, res) => {
    res.json(VOUCHERS);
});

router.post('/redeem', (req, res) => {
    res.json({ success: true, message: 'Voucher redeemed successfully', remainingPoints: 19000 });
});

module.exports = router;
