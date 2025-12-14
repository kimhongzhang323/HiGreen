import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface, Button, Chip, useTheme } from 'react-native-paper';
import { Smile, Frown, Meh } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FACTORS = ['Traffic', 'Noise', 'Pollution', 'Safety', 'Greenery', 'Community'];

export default function HappinessSurveyScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [mood, setMood] = useState(null);
    const [selectedFactors, setSelectedFactors] = useState([]);

    // ... (toggleFactor unchanged)
    const toggleFactor = (factor) => {
        if (selectedFactors.includes(factor)) {
            setSelectedFactors(selectedFactors.filter(f => f !== factor));
        } else {
            setSelectedFactors([...selectedFactors, factor]);
        }
    };

    const handleSubmit = () => {
        if (!mood) {
            alert('Please select your mood');
            return;
        }
        alert('Thank you for your feedback!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor: theme.colors.secondary, paddingTop: insets.top }]}>
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: '#1f2937' }}>City Pulse</Text>
                <Text variant="bodyLarge" style={{ color: '#374151' }}>How are you feeling about your city today?</Text>
            </View>

            <Surface style={styles.content} elevation={4}>
                <Text variant="titleLarge" style={styles.question}>Rate your experience</Text>
                <View style={styles.moodContainer}>
                    <TouchableOpacity onPress={() => setMood('sad')} style={[styles.moodBtn, mood === 'sad' && styles.selectedMood]}>
                        <Frown size={50} color={mood === 'sad' ? '#fff' : '#ef4444'} />
                        <Text style={[styles.moodLabel, mood === 'sad' && { color: '#fff' }]}>Unhappy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMood('neutral')} style={[styles.moodBtn, mood === 'neutral' && styles.selectedMood]}>
                        <Meh size={50} color={mood === 'neutral' ? '#fff' : '#f59e0b'} />
                        <Text style={[styles.moodLabel, mood === 'neutral' && { color: '#fff' }]}>Neutral</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMood('happy')} style={[styles.moodBtn, mood === 'happy' && styles.selectedMood]}>
                        <Smile size={50} color={mood === 'happy' ? '#fff' : '#22c55e'} />
                        <Text style={[styles.moodLabel, mood === 'happy' && { color: '#fff' }]}>Happy</Text>
                    </TouchableOpacity>
                </View>

                <Text variant="titleMedium" style={styles.question}>What influenced your mood?</Text>
                <View style={styles.chipContainer}>
                    {FACTORS.map((factor) => (
                        <Chip
                            key={factor}
                            selected={selectedFactors.includes(factor)}
                            onPress={() => toggleFactor(factor)}
                            style={styles.chip}
                            showSelectedOverlay
                        >
                            {factor}
                        </Chip>
                    ))}
                </View>

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    contentStyle={{ height: 56 }}
                >
                    Submit Feedback
                </Button>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 200,
        justifyContent: 'center',
        padding: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    content: {
        flex: 1,
        marginTop: -40,
        marginHorizontal: 20,
        marginBottom: 40,
        borderRadius: 20,
        padding: 30,
        backgroundColor: '#fff',
    },
    question: {
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
    },
    moodBtn: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
    },
    selectedMood: {
        backgroundColor: '#333',
    },
    moodLabel: {
        marginTop: 5,
        fontWeight: 'bold',
        color: '#666',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 40,
    },
    chip: {
        backgroundColor: '#f3f4f6',
    },
    button: {
        borderRadius: 12,
    },
});
