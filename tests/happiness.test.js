const assert = require('assert');
const { calculateHappinessScore } = require('../backend/utils/calculators');

console.log('Running Happiness Logic Tests...\n');

try {
    // Test 1: Average calculation
    const score1 = calculateHappinessScore([3, 4, 5, 3]); // 15 / 4 = 3.75 -> 3.8 (rounded 1 decimal)
    assert.strictEqual(score1, 3.8, 'Average should be correct');
    console.log('✅ Average Calculation: PASS');

    // Test 2: Empty input
    const score2 = calculateHappinessScore([]);
    assert.strictEqual(score2, 0, 'Empty array should return 0');
    console.log('✅ Empty Input: PASS');

    // Test 3: Invalid input filtering
    const score3 = calculateHappinessScore([5, 'happy', null, 5]); // Should only count 5, 5 -> 5.0
    assert.strictEqual(score3, 5.0, 'Should filter invalid inputs');
    console.log('✅ Filter Invalid Input: PASS');

    console.log('\nALL HAPPINESS TESTS PASSED.');
} catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    process.exit(1);
}
