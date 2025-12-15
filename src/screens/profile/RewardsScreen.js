import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Text, Surface, Button, useTheme, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, Clock, CheckCircle } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

const VOUCHERS = [
    { id: 1, title: 'Amazon Gift Card', cost: '1800 pts', value: 'RM 50', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { id: 2, title: 'Starbucks Coffee', cost: '500 pts', value: 'RM 15', icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png' },
    { id: 3, title: 'Grab Ride Promo', cost: '800 pts', value: 'RM 10', icon: 'https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png' },
    { id: 4, title: 'Adidas Voucher', cost: '10000 pts', value: 'RM 200', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
];

const CHECK_IN_DAYS = [
    { day: 'Mon', amount: 10, status: 'claimed' },
    { day: 'Tue', amount: 10, status: 'claimed' },
    { day: 'Wed', amount: 20, status: 'claimed' },
    { day: 'Thu', amount: 10, status: 'missed' },
    { day: 'Fri', amount: 50, status: 'today' }, // Today
    { day: 'Sat', amount: 10, status: 'upcoming' },
    { day: 'Sun', amount: 100, status: 'upcoming' },
];

export default function RewardsScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('Redeem');

    const LoyaltyCard = () => (
        <LinearGradient
            colors={['#4f46e5', '#7c3aed']} // Indigo to Violet gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loyaltyCard}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>Loyalty Card</Text>
                <View style={styles.goldBadge}>
                    <Text style={styles.goldText}>🥇 Gold</Text>
                </View>
            </View>

            <View style={styles.pointsContainer}>
                <Text style={styles.pointsLabel}>Current Points</Text>
                <Text style={styles.pointsValue}>20,525</Text>
            </View>

            <Text style={styles.expiryText}>Expiry 06/26</Text>

            {/* Background Decor */}
            <View style={styles.cardDecorCircle} />
        </LinearGradient>
    );

    const DailyCheckIn = () => (
        <Surface style={styles.checkInCard} elevation={0}>
            <View style={styles.checkInHeader}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: '#1e293b' }}>Daily Check-in</Text>
                <Text style={{ color: '#64748b', fontSize: 12 }}>Streak: 3 Days 🔥</Text>
            </View>
            <View style={styles.daysRow}>
                {CHECK_IN_DAYS.map((item, index) => (
                    <View key={index} style={styles.dayItem}>
                        <View style={[
                            styles.dayCircle,
                            item.status === 'claimed' && styles.dayClaimed,
                            item.status === 'today' && styles.dayToday,
                            item.status === 'missed' && styles.dayMissed
                        ]}>
                            {item.status === 'claimed' ? <CheckCircle size={14} color="#fff" /> :
                                item.status === 'today' ? <Text style={{ fontWeight: 'bold', color: '#fff' }}>+{item.amount}</Text> :
                                    <Text style={{ fontSize: 10, color: '#64748b' }}>+{item.amount}</Text>
                            }
                        </View>
                        <Text style={[styles.dayText, item.status === 'today' && { fontWeight: 'bold', color: theme.colors.primary }]}>{item.day}</Text>
                    </View>
                ))}
            </View>
            <Button mode="contained" style={styles.claimBtn} labelStyle={{ fontWeight: 'bold' }}>
                Check In (+50 Pts)
            </Button>
        </Surface>
    );

    const RedeemList = () => (
        <View>
            <Text variant="titleMedium" style={styles.sectionTitle}>Entertainment & Food</Text>
            {VOUCHERS.map(item => (
                <Surface key={item.id} style={styles.voucherItem} elevation={0}>
                    {/* Placeholder for Logo */}
                    <View style={styles.logoBox}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#334155' }}>{item.title.charAt(0)}</Text>
                    </View>

                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', color: '#1e293b', fontSize: 15 }}>{item.title}</Text>
                        <Text style={{ color: '#64748b', fontSize: 12 }}>Value: {item.value}</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <View style={styles.coinIcon} />
                            <Text style={{ fontWeight: 'bold', color: '#f59e0b' }}>{item.cost}</Text>
                        </View>
                        {/* <Button mode="text" compact textColor={theme.colors.primary}>Redeem</Button> */}
                    </View>
                </Surface>
            ))}
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.screenHeader}>
                <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#1e293b' }}>Hi Kimmy</Text>
                <Text variant="bodyMedium" style={{ color: '#64748b' }}>Welcome to HiGreen Rewards</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <LoyaltyCard />

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {['Earn', 'Redeem', 'History'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {activeTab === 'Earn' && <DailyCheckIn />}

                {activeTab === 'Redeem' && (
                    <>
                        <DailyCheckIn />
                        <View style={{ height: 20 }} />
                        <RedeemList />
                    </>
                )}

                {activeTab === 'History' && (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Clock size={40} color="#cbd5e1" />
                        <Text style={{ marginTop: 10, color: '#94a3b8' }}>No recent history</Text>
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    screenHeader: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    loyaltyCard: {
        borderRadius: 20,
        padding: 24,
        height: 180,
        marginBottom: 25,
        shadowColor: "#4f46e5",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '600',
    },
    goldBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    goldText: {
        color: '#fcd34d',
        fontWeight: 'bold',
        fontSize: 12,
    },
    pointsContainer: {
        marginTop: 10,
    },
    pointsLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        marginBottom: 4,
    },
    pointsValue: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    expiryText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        textAlign: 'right',
    },
    cardDecorCircle: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 4,
    },
    tabBtn: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 25,
    },
    activeTabBtn: {
        backgroundColor: '#eff6ff', // Light blue bg
    },
    tabText: {
        color: '#94a3b8',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    checkInCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    checkInHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dayItem: {
        alignItems: 'center',
    },
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    dayClaimed: {
        backgroundColor: '#10b981', // Green
    },
    dayToday: {
        backgroundColor: '#3b82f6', // Blue
        borderWidth: 2,
        borderColor: '#bfdbfe',
        shadowColor: "#3b82f6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    dayMissed: {
        backgroundColor: '#fee2e2', // Red tint
    },
    dayText: {
        fontSize: 10,
        color: '#94a3b8',
    },
    claimBtn: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 15,
    },
    voucherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    logoBox: {
        width: 50,
        height: 50,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinIcon: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#f59e0b',
        marginRight: 6,
    }
});
