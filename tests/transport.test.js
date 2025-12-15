const assert = require('assert');
const { calculateCarbonSaved } = require('../backend/utils/calculators');

console.log('Running Transport Logic Tests...\n');

try {
    // Test 1: Bus vs Car (0.2 - 0.08 = 0.12 * 10km = 1.2kg)
    const saved1 = calculateCarbonSaved('bus', 10);
    assert.strictEqual(saved1, 1.2, 'Bus savings incorrect');
    console.log('✅ Bus Savings: PASS');

    // Test 2: Walk vs Car (0.2 - 0 = 0.2 * 5km = 1.0kg)
    const saved2 = calculateCarbonSaved('walk', 5);
    assert.strictEqual(saved2, 1.0, 'Walking savings incorrect');
    console.log('✅ Walking Savings: PASS');

    // Test 3: Train vs Car (0.2 - 0.04 = 0.16 * 100km = 16.0kg)
    const saved3 = calculateCarbonSaved('train', 100);
    assert.strictEqual(saved3, 16.0, 'Train savings incorrect');
    console.log('✅ Train Savings: PASS');

    // Test 4: Unknown mode (assumed car) -> 0 savings
    const saved4 = calculateCarbonSaved('spaceship', 10);
    assert.strictEqual(saved4, 0, 'Unknown mode should save 0');
    console.log('✅ Unknown Mode: PASS');

    console.log('\nALL TRANSPORT TESTS PASSED.');
} catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    process.exit(1);
}
