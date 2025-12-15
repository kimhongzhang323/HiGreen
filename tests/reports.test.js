const assert = require('assert');

// Mock Report Validation Logic (simplified from backend)
function validateReport(report) {
    const validPriorities = ['P0', 'P1', 'P2'];
    const validStatuses = ['Pending', 'Resolved'];

    if (!report.type || !report.location || !report.description) {
        return { success: false, error: 'Missing fields' };
    }
    if (!validPriorities.includes(report.priority)) {
        return { success: false, error: 'Invalid priority' };
    }
    // New reports must start as Pending
    if (report.status && report.status !== 'Pending') {
        return { success: false, error: 'New reports must be Pending' };
    }
    return { success: true };
}

console.log("Running Reports Logic Tests...\n");

try {
    // 1. Valid Report
    const r1 = validateReport({ type: 'Pothole', location: 'Main St', description: 'Big hole', priority: 'P2', status: 'Pending' });
    assert.strictEqual(r1.success, true, "Valid report should pass");
    console.log("✅ Valid Report: PASS");

    // 2. Invalid Priority
    const r2 = validateReport({ type: 'Fire', location: 'Park', description: 'Fire!', priority: 'P5' });
    assert.strictEqual(r2.success, false, "Invalid priority should fail");
    console.log("✅ Invalid Priority: PASS");

    // 3. Missing Fields
    const r3 = validateReport({ type: 'Pothole' }); // Missing location/desc
    assert.strictEqual(r3.success, false, "Missing fields should fail");
    console.log("✅ Missing Fields: PASS");

    console.log("\nALL REPORTS TESTS PASSED.");
} catch (e) {
    console.error("\n❌ TEST FAILED:", e.message);
    process.exit(1);
}
