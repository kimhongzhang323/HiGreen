function calculateCarbonSaved(mode, distanceKm) {
    // Baseline: Car emits ~0.2 kg CO2 per km
    // Bus: ~0.08, Train: ~0.04, Bike/Walk: 0
    const carEmission = 0.2;
    let modeEmission = 0.2;

    if (!mode) return 0;

    switch (mode.toLowerCase()) {
        case 'bus': modeEmission = 0.08; break;
        case 'train':
        case 'mrt':
        case 'lrt': modeEmission = 0.04; break;
        case 'bicycle':
        case 'walk': modeEmission = 0; break;
        case 'carpool': modeEmission = 0.1; break;
        default: modeEmission = 0.2; // Assume car if unknown
    }

    const savedPerKm = carEmission - modeEmission;
    // Return formatted to 2 decimal places as number
    return parseFloat(Math.max(0, savedPerKm * distanceKm).toFixed(2));
}

function calculateHappinessScore(answers) {
    if (!Array.isArray(answers) || answers.length === 0) return 0;

    // Ensure all answers are numbers 1-5
    const validAnswers = answers.filter(a => typeof a === 'number' && a >= 1 && a <= 5);

    if (validAnswers.length === 0) return 0;

    const sum = validAnswers.reduce((a, b) => a + b, 0);
    return parseFloat((sum / validAnswers.length).toFixed(1));
}

module.exports = { calculateCarbonSaved, calculateHappinessScore };
