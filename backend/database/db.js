const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'higreen.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT,
            name TEXT,
            points INTEGER DEFAULT 0
        )`);

        // Reports Table
        db.run(`CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            location TEXT,
            date TEXT,
            status TEXT,
            priority TEXT,
            description TEXT,
            userId INTEGER,
            FOREIGN KEY(userId) REFERENCES users(id)
        )`);

        // Content Table
        db.run(`CREATE TABLE IF NOT EXISTS content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            date TEXT,
            views INTEGER,
            status TEXT,
            type TEXT
        )`);

        // Rewards Table
        db.run(`CREATE TABLE IF NOT EXISTS rewards(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            cost TEXT,
            value TEXT,
            icon TEXT
        )`);

        // Seed Rewards (if empty)
        db.get("SELECT count(*) as count FROM rewards", (err, row) => {
            if (row.count === 0) {
                const vouchers = [
                    ['Amazon Gift Card', '1800 pts', 'RM 50', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'],
                    ['Starbucks Coffee', '500 pts', 'RM 15', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png']
                ];
                const stmt = db.prepare("INSERT INTO rewards (title, cost, value, icon) VALUES (?, ?, ?, ?)");
                vouchers.forEach(v => stmt.run(v));
                stmt.finalize();
                console.log("Rewards seeded.");
            }
        });
        db.get("SELECT * FROM users WHERE email = ?", ['admin'], (err, row) => {
            if (!row) {
                const hashedPassword = bcrypt.hashSync('123', 10);
                db.run('INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)',
                    ['admin', hashedPassword, 'admin', 'Administrator']);
                console.log("Admin account created.");
            }
        });

        // Seed Normal User (if not exists)
        db.get("SELECT * FROM users WHERE email = ?", ['test'], (err, row) => {
            if (!row) {
                const hashedPassword = bcrypt.hashSync('123', 10);
                db.run('INSERT INTO users (email, password, role, name, points) VALUES (?, ?, ?, ?, ?)',
                    ['test', hashedPassword, 'user', 'Kimmy', 20525]);
                console.log("Test user account created.");
            }
        });
    });
}

module.exports = db;
