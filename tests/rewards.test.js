const assert = require('assert');

// Mock Rewards Logic
function redeemVoucher(userPoints, voucherCost) {
    if (userPoints < voucherCost) {
        return { success: false, error: 'Insufficient points' };
    }
    return { success: true, remainingPoints: userPoints - voucherCost };
}

console.log("Running Rewards Logic Tests...\n");

try {
    // 1. Successful Redemption
    const result1 = redeemVoucher(2000, 500);
    assert.strictEqual(result1.success, true, "Redemption should succeed");
    assert.strictEqual(result1.remainingPoints, 1500, "Points should be deducted correctly");
    console.log("✅ Successful Redemption: PASS");

    // 2. Insufficient Points
    const result2 = redeemVoucher(100, 500);
    assert.strictEqual(result2.success, false, "Should fail if points are low");
    console.log("✅ Insufficient Points: PASS");

    // 3. Exact Points
    const result3 = redeemVoucher(500, 500);
    assert.strictEqual(result3.success, true, "Exact points should succeed");
    assert.strictEqual(result3.remainingPoints, 0, "Remaining points should be 0");
    console.log("✅ Exact Points: PASS");

    console.log("\nALL REWARDS TESTS PASSED.");
} catch (e) {
    console.error("\n❌ TEST FAILED:", e.message);
    process.exit(1);
}
