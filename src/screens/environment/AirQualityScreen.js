import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Wind, MapPin, CloudRain, Thermometer } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AQICircle = ({ value, level }) => {
    const theme = useTheme();
    let color = '#22c55e'; // Good
    if (value > 50) color = '#f59e0b'; // Moderate
    if (value > 100) color = '#ef4444'; // Unhealthy

    return (
        <View style={[styles.aqiContainer, { borderColor: color }]}>
            <Text variant="displayMedium" style={{ color: color, fontWeight: 'bold' }}>{value}</Text>
            <Text variant="titleMedium" style={{ color: color }}>{level}</Text>
        </View>
    );
};

const SensorCard = ({ location, value }) => (
    <Surface style={styles.sensorCard} elevation={1}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MapPin size={16} color="#666" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{location}</Text>
        </View>
        <Text style={{ fontWeight: 'bold', color: value > 50 ? '#f59e0b' : '#22c55e' }}>{value} AQI</Text>
    </Surface>
);

export default function AirQualityScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: '#fff', paddingTop: insets.top + 10 }]}>
                <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 5 }}>Air Quality</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MapPin size={16} color={theme.colors.primary} />
                    <Text style={{ marginLeft: 5, color: '#555' }}>Kuala Lumpur, Malaysia</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Main AQI */}
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <AQICircle value={42} level="Good" />
                    <Text style={{ marginTop: 10, color: '#666', textAlign: 'center' }}>
                        Air quality is satisfactory, and air pollution poses little or no risk.
                    </Text>
                </View>

                {/* Details Grid */}
                <View style={styles.grid}>
                    <Surface style={styles.detailCard} elevation={2}>
                        <Wind size={24} color={theme.colors.primary} />
                        <Text style={styles.detailValue}>12 µg/m³</Text>
                        <Text style={styles.detailLabel}>PM2.5</Text>
                    </Surface>
                    <Surface style={styles.detailCard} elevation={2}>
                        <CloudRain size={24} color="#3b82f6" />
                        <Text style={styles.detailValue}>65%</Text>
                        <Text style={styles.detailLabel}>Humidity</Text>
                    </Surface>
                    <Surface style={styles.detailCard} elevation={2}>
                        <Thermometer size={24} color="#ef4444" />
                        <Text style={styles.detailValue}>28°C</Text>
                        <Text style={styles.detailLabel}>Temp</Text>
                    </Surface>
                </View>

                {/* Nearby Sensors */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Nearby Sensors</Text>
                <SensorCard location="KLCC Park" value={35} />
                <SensorCard location="Bukit Bintang" value={58} />
                <SensorCard location="Bangsar" value={28} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    aqiContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    detailCard: {
        width: '30%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    detailValue: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8,
    },
    detailLabel: {
        fontSize: 12,
        color: '#666',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    sensorCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
});
