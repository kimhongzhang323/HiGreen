const assert = require('assert');

// Mock of the Backend Logic (from authRoutes.js)
const users = [
    { email: 'admin', password: '123', role: 'admin', name: 'Administrator' },
    { email: 'test', password: '123', role: 'user', name: 'Kimmy' }
];

function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        return { success: true, user: { role: user.role } };
    }
    return { success: false };
}

// TEST SUITE
console.log("Running Authentication Tests...\n");

try {
    // 1. Valid Admin Login
    const result1 = login('admin', '123');
    assert.strictEqual(result1.success, true, "Admin login should succeed");
    assert.strictEqual(result1.user.role, 'admin', "Admin role should be returned");
    console.log("✅ Admin Login: PASS");

    // 2. Valid User Login
    const result2 = login('test', '123');
    assert.strictEqual(result2.success, true, "User login should succeed");
    assert.strictEqual(result2.user.role, 'user', "User role should be returned");
    console.log("✅ User Login: PASS");

    // 3. Invalid Password
    const result3 = login('admin', 'wrongpass');
    assert.strictEqual(result3.success, false, "Invalid password should fail");
    console.log("✅ Invalid Password: PASS");

    // 4. Unknown User
    const result4 = login('unknown', '123');
    assert.strictEqual(result4.success, false, "Unknown user should fail");
    console.log("✅ Unknown User: PASS");

    console.log("\nALL TESTS PASSED WITH 0 FAILURES.");

} catch (e) {
    console.error("\n❌ TEST FAILED:", e.message);
    process.exit(1);
}
