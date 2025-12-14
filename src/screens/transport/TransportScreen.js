import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, ProgressBar, Button, useTheme, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bus, Zap, MapPin, Clock, Battery, Gauge } from 'lucide-react-native';

const rapidKLImage = require('../../../assets/rapidKL.png');
const teslaImage = require('../../../assets/tesla.jpg');

export default function TransportScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.primary, paddingTop: insets.top + 20 }]}>
                <Text variant="headlineMedium" style={styles.headerTitle}>My Transport</Text>
                <Text style={styles.headerSub}>Green Commute Tracker</Text>
            </View>

            <View style={styles.content}>
                {/* 1. Public Transport Section */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Public Transport Link</Text>
                <Surface style={styles.card} elevation={2}>
                    <View style={styles.providerHeader}>
                        <Image source={rapidKLImage} style={styles.providerLogo} resizeMode="contain" />
                        <View style={{ marginLeft: 15, flex: 1 }}>
                            <Text style={styles.providerName}>RapidKL</Text>
                            <Text style={styles.providerStatus}>● Auto-Linked</Text>
                        </View>
                        <Text style={styles.cardId}>MyRapid •••• 8821</Text>
                    </View>

                    <Divider style={{ marginVertical: 15 }} />

                    <Text style={styles.tripLabel}>LAST TRIP - TODAY, 8:45 AM</Text>
                    <View style={styles.tripContainer}>
                        <View style={styles.tripLeft}>
                            <Bus size={24} color={theme.colors.primary} />
                            <View style={styles.lineIndicator} />
                        </View>
                        <View style={styles.tripRight}>
                            <View style={styles.stopItem}>
                                <Text style={styles.stopName}>Pasar Seni (MRT)</Text>
                                <Text style={styles.stopTime}>Tap On • 8:45 AM</Text>
                            </View>
                            <View style={{ height: 20 }} />
                            <View style={styles.stopItem}>
                                <Text style={styles.stopName}>KLCC</Text>
                                <Text style={styles.stopTime}>Tap Off • 9:02 AM</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tripStats}>
                        <View style={styles.statChip}>
                            <Clock size={14} color="#666" />
                            <Text style={styles.statText}>17 mins</Text>
                        </View>
                        <View style={styles.statChip}>
                            <MapPin size={14} color="#666" />
                            <Text style={styles.statText}>4.2 km</Text>
                        </View>
                        {/* CO2 Saved Highlight */}
                        <View style={[styles.statChip, { backgroundColor: '#dcfce7' }]}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#15803d' }}>0.8kg CO2 Saved</Text>
                        </View>
                    </View>
                </Surface>

                {/* 2. EV Vehicle Section */}
                <Text variant="titleMedium" style={styles.sectionTitle}>My EV Vehicle</Text>
                <Surface style={[styles.card, { padding: 0, overflow: 'hidden' }]} elevation={2}>
                    <Image source={teslaImage} style={styles.vehicleImage} resizeMode="cover" />

                    <View style={styles.vehicleInfo}>
                        <View style={styles.vehicleHeader}>
                            <View>
                                <Text style={styles.vehicleName}>Tesla Model 3</Text>
                                <Text style={styles.vehiclePlate}>WB 1234 G</Text>
                            </View>
                            <Surface style={styles.batteryBadge} elevation={0}>
                                <Zap size={16} color="#eab308" fill="#eab308" />
                                <Text style={styles.batteryText}>72%</Text>
                            </Surface>
                        </View>

                        {/* Battery Bar */}
                        <ProgressBar progress={0.72} color="#10b981" style={styles.batteryBar} />
                        <Text style={styles.rangeText}>~320 km range remaining</Text>

                        <Divider style={{ marginVertical: 15 }} />

                        <View style={styles.vehicleStatsRow}>
                            <View style={styles.vStat}>
                                <Gauge size={24} color="#64748b" />
                                <Text style={styles.vStatValue}>14,203</Text>
                                <Text style={styles.vStatLabel}>Total km</Text>
                            </View>
                            <View style={styles.verticalDivider} />
                            <View style={styles.vStat}>
                                <Battery size={24} color="#64748b" />
                                <Text style={styles.vStatValue}>24 kWh</Text>
                                <Text style={styles.vStatLabel}>Last Charge</Text>
                            </View>
                        </View>
                    </View>
                </Surface>

                <View style={{ height: 100 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    headerSub: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        marginTop: 5,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 5,
        gap: 8,
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: '#334155',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 24,
        marginBottom: 25,
        shadowColor: '#64748b',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    providerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    providerLogo: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f8fafc',
    },
    providerName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#0f172a',
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10b981',
        marginRight: 6,
    },
    providerStatus: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    cardId: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '600',
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tripLabel: {
        fontSize: 11,
        color: '#94a3b8',
        fontWeight: 'bold',
        marginBottom: 15,
        letterSpacing: 0.5,
    },
    tripContainer: {
        flexDirection: 'row',
    },
    tripTimeline: {
        alignItems: 'center',
        marginRight: 15,
        width: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#cbd5e1',
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 2,
    },
    line: {
        width: 2,
        height: 30,
        backgroundColor: '#e2e8f0',
        marginVertical: 2,
    },
    tripDetails: {
        flex: 1,
    },
    stopItem: {
        justifyContent: 'center',
        height: 20, // Align with dot
    },
    stopName: {
        fontWeight: 'bold',
        color: '#334155',
        fontSize: 14,
    },
    stopTime: {
        fontSize: 12,
        color: '#94a3b8',
    },
    tripStats: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 10,
    },
    statChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
    },
    statText: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '600',
    },
    // EV Styles
    vehicleImage: {
        width: '100%',
        height: 200,
    },
    vehicleInfo: {
        padding: 20,
    },
    vehicleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    vehicleName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    vehiclePlate: {
        color: '#64748b',
        fontSize: 14,
        marginTop: 2,
        backgroundColor: '#f1f5f9',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: 'hidden',
    },
    batteryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fef9c3',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    batteryText: {
        fontWeight: 'bold',
        color: '#a16207',
        fontSize: 13,
    },
    batteryBar: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e2e8f0',
    },
    rangeText: {
        marginTop: 8,
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
        fontWeight: '500',
    },
    vehicleStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    vStat: {
        alignItems: 'center',
    },
    vStatValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    vStatLabel: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 2,
    },
    verticalDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#e2e8f0',
    }
});
