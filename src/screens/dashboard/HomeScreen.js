import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, AlertTriangle, Bus, Wind, Map, Smile } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const screenWidth = Dimensions.get('window').width;

const QuickAction = ({ icon: Icon, label, color, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.actionItem}>
        <Surface style={styles.actionIcon} elevation={2}>
            <Icon size={28} color={color} />
        </Surface>
        <Text variant="labelMedium" style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

const DailyStreakCard = ({ theme }) => (
    <Surface style={styles.streakCard} elevation={2}>
        <View style={styles.streakHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.text }}>Daily Streak</Text>
                <View style={styles.fireBadge}>
                    <Text style={{ fontSize: 12 }}>🔥 7 Days</Text>
                </View>
            </View>
            <Text variant="bodySmall" style={{ color: '#64748b' }}>Level 5 Recycler</Text>
        </View>
        <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '70%', backgroundColor: theme.colors.primary }]} />
        </View>
        <Text style={styles.streakSub}>You're on fire! Keep it up to earn x2 points.</Text>
    </Surface>
);

export default function HomeScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => theme.colors.primary,
        strokeWidth: 2,
        decimalPlaces: 0,
    };

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 50],
                color: (opacity = 1) => theme.colors.primary,
                strokeWidth: 2
            }
        ],
        legend: ["CO2 Saved (kg)"]
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar style="light" />
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                style={[styles.header, { paddingTop: insets.top + 20 }]}
            >
                <View style={styles.headerContent}>
                    <View>
                        <Text variant="titleMedium" style={{ color: 'rgba(255,255,255,0.8)' }}>Good Morning,</Text>
                        <Text variant="headlineMedium" style={{ color: '#fff', fontWeight: 'bold' }}>Kimmy</Text>
                    </View>
                    <View style={styles.pointsContainer}>
                        <Leaf size={20} color="#FFD700" />
                        <Text style={styles.pointsText}>850 Pts</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Impact Summary - Moved out of Header with negative margin */}
            {/* Impact Summary - Moved out of Header with negative margin */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('WeeklyImpact')}>
                <Surface style={styles.impactCard} elevation={4}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 10 }}>
                        <Text variant="titleMedium" style={styles.cardTitle}>Your Weekly Impact</Text>
                        <Leaf size={20} color={theme.colors.primary} />
                    </View>
                    <LineChart
                        data={data}
                        width={screenWidth - 60}
                        height={180}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />
                </Surface>
            </TouchableOpacity>

            {/* NEW: Gamification Gap Filler */}
            <View style={styles.section}>
                <DailyStreakCard theme={theme} />
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
                <Text variant="titleLarge" style={styles.sectionTitle}>Smart City Services</Text>
                <View style={styles.grid}>
                    <QuickAction
                        icon={AlertTriangle}
                        label="Report Issue"
                        color="#ef4444"
                        onPress={() => navigation.navigate('ReportIssue')}
                    />
                    <QuickAction
                        icon={Map}
                        label="Green Map"
                        color="#22c55e"
                        onPress={() => navigation.navigate('GreenMap')}
                    />
                    <QuickAction
                        icon={Bus}
                        label="Transport"
                        color="#3b82f6"
                        onPress={() => navigation.navigate('Transport')}
                    />
                    <QuickAction
                        icon={Wind}
                        label="Air Quality"
                        color="#14b8a6"
                        onPress={() => navigation.navigate('AirQuality')}
                    />
                    <QuickAction
                        icon={AlertTriangle}
                        label="SOS Alert"
                        color="#ef4444"
                        onPress={() => navigation.navigate('SOS')}
                    />
                    <QuickAction
                        icon={Smile}
                        label="Happiness"
                        color="#f59e0b"
                        onPress={() => navigation.navigate('Happiness')}
                    />
                    <QuickAction
                        icon={Leaf}
                        label="My Impact"
                        color={theme.colors.primary}
                        onPress={() => navigation.navigate('MyReports')}
                    />
                </View>
            </View>

            {/* News Carousel */}
            <View style={styles.section}>
                <Text variant="titleLarge" style={styles.sectionTitle}>Latest Updates</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                    {/* News Item 1 */}
                    <TouchableOpacity onPress={() => navigation.navigate('TaskCompletion')} activeOpacity={0.9}>
                        <Surface style={styles.newsCard} elevation={2}>
                            <Image source={require('../../../assets/environmental-protection.jpg')} style={styles.newsImage} />
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.newsOverlay}>
                                <Text style={styles.newsTitle}>Environmental Protection</Text>
                                <Text style={styles.newsSubtitle}>Global initiatives for 2024.</Text>
                            </LinearGradient>
                        </Surface>
                    </TouchableOpacity>

                    {/* News Item 2 */}
                    <TouchableOpacity activeOpacity={0.9} style={{ marginLeft: 15 }}>
                        <Surface style={styles.newsCard} elevation={2}>
                            <Image source={require('../../../assets/GettyImages-907686588-0103ab828f954ffba31c8153745dd27e.jpg')} style={styles.newsImage} />
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.newsOverlay}>
                                <Text style={styles.newsTitle}>Sustainable Living</Text>
                                <Text style={styles.newsSubtitle}>Tips for a greener lifestyle.</Text>
                            </LinearGradient>
                        </Surface>
                    </TouchableOpacity>

                    {/* News Item 3 */}
                    <TouchableOpacity activeOpacity={0.9} style={{ marginLeft: 15 }}>
                        <Surface style={styles.newsCard} elevation={2}>
                            <Image source={require('../../../assets/Going-Green-in-the-Workplace-How-to-Contribute.jpg')} style={styles.newsImage} />
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.newsOverlay}>
                                <Text style={styles.newsTitle}>Going Green</Text>
                                <Text style={styles.newsSubtitle}>How to contribute at work.</Text>
                            </LinearGradient>
                        </Surface>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 100, // Increased to prevent text overlap
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    // ...
    impactCard: {
        marginTop: -60, // Slight overlap
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
        color: '#333',
    },
    chart: {
        borderRadius: 16,
        paddingRight: 0,
        paddingLeft: 0,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1f2937',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,
    },
    actionIcon: {
        width: 55,
        height: 55,
        borderRadius: 18, // Soft square
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#fff', // White buttons for clearer look
    },
    actionLabel: {
        textAlign: 'center',
        fontSize: 12,
        color: '#4b5563',
        fontWeight: '600',
    },
    // News Carousel
    newsCard: {
        width: 280,
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    newsImage: {
        width: '100%',
        height: '100%',
    },
    newsOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        justifyContent: 'flex-end',
        padding: 15,
    },
    newsTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    newsSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        marginTop: 2,
    },
    // Streak Card Styles
    streakCard: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
    },
    streakHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    fireBadge: {
        backgroundColor: '#fef3c7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 10,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    streakSub: {
        fontSize: 12,
        color: '#64748b',
    },
});
