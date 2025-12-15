import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Surface, Avatar, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, FileText, TrendingUp, Activity, LogOut, Bell } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { useAuth } from '../../context/AuthContext';

const screenWidth = Dimensions.get('window').width;

export default function AdminDashboardScreen({ navigation }) {
    const { logout, user } = useAuth();
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <Surface style={styles.statCard} elevation={0}>
            <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
                <Icon size={24} color={color} />
            </View>
            <Text variant="titleLarge" style={styles.statValue}>{value}</Text>
            <Text variant="bodySmall" style={styles.statTitle}>{title}</Text>
            {trend && <Text style={{ color: '#10b981', fontSize: 12, marginTop: 4 }}>+{trend}% this week</Text>}
        </Surface>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Text size={40} label="AD" style={{ backgroundColor: theme.colors.primary }} />
                    <View style={{ marginLeft: 12 }}>
                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Hello, Admin</Text>
                        <Text variant="bodySmall" style={{ color: '#64748b' }}>Welcome back</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <IconButton icon={() => <Bell size={24} color="#64748b" />} />
                    <IconButton icon={() => <LogOut size={24} color="#ef4444" />} onPress={logout} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Stats Grid */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Overview</Text>
                <View style={styles.statsGrid}>
                    <StatCard title="Total Users" value="1,234" icon={Users} color="#3b82f6" trend="12" />
                    <StatCard title="Active Reports" value="56" icon={FileText} color="#ef4444" trend="5" />
                    <StatCard title="CO2 Saved" value="12.5t" icon={TrendingUp} color="#10b981" />
                    <StatCard title="Engagement" value="89%" icon={Activity} color="#f59e0b" trend="8" />
                </View>

                {/* Main Curve Chart */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Impact Analytics</Text>
                <Surface style={styles.chartCard} elevation={0}>
                    <View style={styles.chartHeader}>
                        <View>
                            <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>18.4k</Text>
                            <Text variant="bodySmall" style={{ color: '#64748b' }}>Total Impact Score</Text>
                        </View>
                        <View style={{ backgroundColor: '#f1f5f9', padding: 5, borderRadius: 8 }}>
                            <Text style={{ fontSize: 12, color: '#64748b' }}>Weekly ▼</Text>
                        </View>
                    </View>

                    <LineChart
                        data={{
                            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                            datasets: [{ data: [20, 45, 28, 80, 99, 43, 85] }]
                        }}
                        width={screenWidth - 70}
                        height={180}
                        yAxisLabel=""
                        yAxisSuffix=""
                        withInnerLines={false}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                            style: { borderRadius: 16 },
                            propsForDots: { r: "5", strokeWidth: "2", stroke: "#10b981" }
                        }}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />
                </Surface>

                {/* Recent Activity List */}
                <View style={styles.rowHeader}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Recent Activity</Text>
                    <TouchableOpacity><Text style={{ color: theme.colors.primary }}>View All</Text></TouchableOpacity>
                </View>

                {/* Mock List Items directly here for dashboard view */}
                {[1, 2, 3].map((i) => (
                    <Surface key={i} style={styles.listCard} elevation={0}>
                        <Avatar.Icon size={40} icon="account" style={{ backgroundColor: '#f1f5f9' }} color="#64748b" />
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>New User Registration</Text>
                            <Text variant="bodySmall" style={{ color: '#64748b' }}>2 minutes ago</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: '#10b981', fontWeight: 'bold' }}>+ User</Text>
                    </Surface>
                ))}

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Pro Light Gray Background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#F5F7FA',
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 15,
        color: '#1e293b',
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        width: (screenWidth - 55) / 2, // 2 column grid with spacing
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 15,
        // Soft Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontWeight: '800',
        fontSize: 24,
        color: '#1e293b',
    },
    statTitle: {
        color: '#94a3b8',
        fontWeight: '500',
    },
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    }
});
