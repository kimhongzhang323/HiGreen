import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Surface, useTheme, ProgressBar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Car, Bus, Train, Zap, MapPin, ChevronDown } from 'lucide-react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AdminTransportScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const StatBox = ({ title, value, icon: Icon, color }) => (
        <Surface style={styles.statBox} elevation={0}>
            <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
                <Icon size={20} color={color} />
            </View>
            <View>
                <Text variant="titleLarge" style={{ fontWeight: 'bold', color: '#1e293b' }}>{value}</Text>
                <Text variant="bodySmall" style={{ color: '#64748b' }}>{title}</Text>
            </View>
        </Surface>
    );

    const TransportStation = ({ name, type, count, total }) => (
        <View style={styles.stationRow}>
            <View style={styles.stationIcon}>
                {type === 'bus' && <Bus size={18} color="#3b82f6" />}
                {type === 'train' && <Train size={18} color="#a855f7" />}
                {type === 'lrt' && <Train size={18} color="#ec4899" />}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={{ fontWeight: '600', color: '#1e293b' }}>{name}</Text>
                    <Text style={{ fontWeight: 'bold', color: '#1e293b' }}>{count.toLocaleString()}</Text>
                </View>
                <ProgressBar progress={count / total} color={type === 'bus' ? '#3b82f6' : type === 'train' ? '#a855f7' : '#ec4899'} style={{ height: 6, borderRadius: 3, backgroundColor: '#f1f5f9' }} />
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: '#1e293b' }}>Transport Analytics</Text>
                <Text variant="bodyMedium" style={{ color: '#64748b' }}>Public Transport & EV Toll Tracking</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Top Stats */}
                <View style={styles.statsRow}>
                    <StatBox title="EV Toll Pass" value="8,450" icon={Zap} color="#10b981" />
                    <StatBox title="Daily Riders" value="45.2k" icon={Bus} color="#3b82f6" />
                </View>

                {/* Ridership Chart */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Ridership Overview</Text>
                <Surface style={styles.chartCard} elevation={0}>
                    <BarChart
                        data={{
                            labels: ["Bus", "MRT", "LRT", "EV"],
                            datasets: [{ data: [450, 890, 620, 310] }]
                        }}
                        width={screenWidth - 70}
                        height={220}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                            barPercentage: 0.7,
                            decimalPlaces: 0,
                        }}
                        style={{ borderRadius: 16 }}
                        fromZero
                        showValuesOnTopOfBars
                    />
                </Surface>

                {/* Deep Dive Section */}
                <View style={styles.rowHeader}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>High Traffic Zones</Text>
                    <TouchableOpacity><Text style={{ color: theme.colors.primary }}>Filter</Text></TouchableOpacity>
                </View>

                <Surface style={styles.listCard} elevation={0}>
                    <TransportStation name="KL Sentral (Hub)" type="train" count={12500} total={15000} />
                    <View style={styles.divider} />
                    <TransportStation name="Pasar Seni (LRT)" type="lrt" count={8900} total={15000} />
                    <View style={styles.divider} />
                    <TransportStation name="Bukit Bintang (MRT)" type="train" count={7500} total={15000} />
                    <View style={styles.divider} />
                    <TransportStation name="Mid Valley (Bus)" type="bus" count={5200} total={15000} />
                </Surface>

                <Text variant="titleMedium" style={[styles.sectionTitle, { marginTop: 20 }]}>Toll Usage (EV vs ICE)</Text>
                <Surface style={styles.listCard} elevation={0}>
                    <View style={styles.tollRow}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Duta Toll Plaza</Text>
                            <Text style={{ color: '#64748b', fontSize: 12 }}>North-South Expressway</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#10b981', fontWeight: 'bold' }}>245 EV</Text>
                            <Text style={{ color: '#94a3b8', fontSize: 12 }}>1,200 Total</Text>
                        </View>
                    </View>
                </Surface>

                <View style={{ height: 30 }} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        width: (screenWidth - 55) / 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 15,
        color: '#1e293b',
    },
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    listCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    stationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    stationIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginVertical: 12,
    },
    tollRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
