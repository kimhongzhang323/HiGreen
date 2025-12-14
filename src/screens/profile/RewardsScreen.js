import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Surface, Button, ProgressBar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Award, Gift, Star } from 'lucide-react-native';

const BADGES = [
    { id: 1, name: 'Eco Starter', icon: 'leaf', color: '#10b981' },
    { id: 2, name: 'Super Recycler', icon: 'recycle', color: '#3b82f6' },
    { id: 3, name: 'City Walker', icon: 'walk', color: '#f59e0b' },
];

const VOUCHERS = [
    { id: 1, title: 'Free Coffee', cost: '500 pts', issuer: 'Green Cafe' },
    { id: 2, title: '10% Off Grocery', cost: '1200 pts', issuer: 'EcoMart' },
];

export default function RewardsScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 20, backgroundColor: theme.colors.primary }]}>
                <View style={styles.pointsHeader}>
                    <Text style={styles.pointsLabel}>Available Points</Text>
                    <Text style={styles.pointsValue}>850</Text>
                </View>
            </View>

            <ScrollView style={styles.content}>
                <Text variant="titleMedium" style={styles.sectionTitle}>Your Badges</Text>
                <View style={styles.badgesRow}>
                    {BADGES.map(badge => (
                        <View key={badge.id} style={styles.badgeItem}>
                            <View style={[styles.badgeCircle, { backgroundColor: badge.color + '20' }]}>
                                <Award size={32} color={badge.color} />
                            </View>
                            <Text style={styles.badgeName}>{badge.name}</Text>
                        </View>
                    ))}
                </View>

                <Text variant="titleMedium" style={styles.sectionTitle}>Redeem Rewards</Text>
                {VOUCHERS.map(voucher => (
                    <Surface key={voucher.id} style={styles.voucherCard} elevation={2}>
                        <View style={styles.voucherIcon}>
                            <Gift size={24} color={theme.colors.primary} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text style={styles.voucherTitle}>{voucher.title}</Text>
                            <Text style={styles.voucherIssuer}>{voucher.issuer}</Text>
                        </View>
                        <Button mode="outlined" onPress={() => console.log('Redeem')}>
                            {voucher.cost}
                        </Button>
                    </Surface>
                ))}
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
        padding: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    pointsLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
    },
    pointsValue: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
    },
    badgesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    badgeItem: {
        alignItems: 'center',
    },
    badgeCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    badgeName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#64748b',
    },
    voucherCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
    },
    voucherIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#f0fdf4',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voucherTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    voucherIssuer: {
        color: '#64748b',
        fontSize: 12,
    },
});
