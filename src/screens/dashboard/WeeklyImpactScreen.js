import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Surface, useTheme, SegmentedButtons } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Leaf, Droplets, Zap, Wind } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

// Define dataset here to be accessible
const impactData = {
    CO2: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // 2 weeks
        data: [20, 45, 28, 80, 99, 43, 50, 55, 60, 40, 85, 90, 50, 60],
        color: '#22c55e',
        legend: "CO2 Saved (kg)"
    },
    Water: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [100, 150, 120, 180, 200, 160, 140, 110, 130, 140, 190, 210, 170, 150],
        color: '#3b82f6',
        legend: "Water Saved (L)"
    },
    Energy: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [30, 40, 35, 50, 60, 45, 40, 35, 45, 40, 55, 65, 50, 45],
        color: '#f59e0b',
        legend: "Energy Saved (kWh)"
    }
};

export default function WeeklyImpactScreen() {
    const theme = useTheme();
    const [selectedMetric, setSelectedMetric] = useState('CO2');
    const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });

    const currentData = impactData[selectedMetric];

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => currentData.color,
        strokeWidth: 2,
        barPercentage: 0.5,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff"
        }
    };

    const formattedData = {
        labels: currentData.labels,
        datasets: [
            {
                data: currentData.data,
                color: (opacity = 1) => currentData.color,
                strokeWidth: 2
            }
        ],
        legend: [currentData.legend]
    };

    const StatCard = ({ icon: Icon, title, value, unit, color, metricKey }) => {
        const isSelected = selectedMetric === metricKey;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => metricKey && setSelectedMetric(metricKey)}
                style={{ width: '48%', marginBottom: 15 }}
            >
                <Surface style={[styles.statCard, isSelected && { borderColor: color, borderWidth: 2, backgroundColor: '#fdfdfd' }]} elevation={isSelected ? 4 : 2}>
                    <View style={[styles.iconContainer, { backgroundColor: color }]}>
                        <Icon size={24} color="#fff" />
                    </View>
                    <View>
                        <Text variant="labelMedium" style={{ color: '#64748b' }}>{title}</Text>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{value} <Text variant="bodyMedium" style={{ color: '#94a3b8' }}>{unit}</Text></Text>
                    </View>
                </Surface>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.headerTitle}>Your Impact</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant="bodyLarge" style={styles.headerSubtitle}>Weekly detailed breakdown</Text>
                    <View style={{ width: 120 }}>
                        <SegmentedButtons
                            value={chartType}
                            onValueChange={setChartType}
                            buttons={[
                                { value: 'line', label: 'Line', icon: 'chart-line' },
                                { value: 'bar', label: 'Bar', icon: 'chart-bar' },
                            ]}
                            density="small"
                        />
                    </View>
                </View>
            </View>

            <Surface style={styles.chartCard} elevation={2}>
                <Text variant="titleMedium" style={styles.cardTitle}>{currentData.legend} Trend</Text>
                <Text style={{ fontSize: 12, color: '#aaa', marginBottom: 10 }}>Swipe left to see more history &uarr;</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {chartType === 'line' ? (
                        <LineChart
                            data={formattedData}
                            width={screenWidth * 2} // Double width for scrolling
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                            onDataPointClick={({ value, getColor }) => {
                                // Simple feedback alert for now as tooltip positioning can be complex
                                alert(`Value: ${value}`);
                            }}
                        />
                    ) : (
                        <BarChart
                            data={formattedData}
                            width={screenWidth * 2}
                            height={220}
                            chartConfig={chartConfig}
                            style={styles.chart}
                            yAxisLabel=""
                            yAxisSuffix=""
                        />
                    )}
                </ScrollView>
            </Surface>

            <Text variant="titleLarge" style={styles.sectionTitle}>Breakdown (Tap to View)</Text>

            <View style={styles.statsGrid}>
                <StatCard
                    icon={Leaf}
                    title="CO2 Saved"
                    value="365"
                    unit="kg"
                    color="#22c55e"
                    metricKey="CO2"
                />
                <StatCard
                    icon={Droplets}
                    title="Water Saved"
                    value="1,240"
                    unit="L"
                    color="#3b82f6"
                    metricKey="Water"
                />
                <StatCard
                    icon={Zap}
                    title="Energy Saved"
                    value="450"
                    unit="kWh"
                    color="#f59e0b"
                    metricKey="Energy"
                />
                <StatCard
                    icon={Wind}
                    title="Air Quality"
                    value="Good"
                    unit="AQI"
                    color="#14b8a6"
                // No graph for this yet
                />
            </View>

            <Surface style={styles.tipCard} elevation={1}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 5 }}>💡 Green Tip</Text>
                <Text variant="bodyMedium" style={{ color: '#475569' }}>
                    Switching to LED bulbs can save up to 150 kWh of energy per year!
                </Text>
            </Surface>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 20,
    },
    header: {
        marginTop: 10,
        marginBottom: 20,
    },
    headerTitle: {
        fontWeight: 'bold',
        color: '#1e293b',
    },
    headerSubtitle: {
        color: '#64748b',
    },
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 25,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start',
        color: '#333',
    },
    chart: {
        borderRadius: 16,
        paddingRight: 0,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1f2937',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        flex: 1, // fill width
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
    },
    iconContainer: {
        padding: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    tipCard: {
        backgroundColor: '#f0fdf4',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#bbf7d0',
    }
});
