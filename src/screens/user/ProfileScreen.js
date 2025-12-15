import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Surface, Avatar, Button, useTheme, Switch } from 'react-native-paper';
import { User, Settings, LogOut, Award, CreditCard, ChevronRight, Shield, FileText, HelpCircle, Bell, Moon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { logout } = useAuth();
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [notificationsIds, setNotificationsIds] = React.useState(true);

    const MenuItem = ({ icon: Icon, title, subtitle, onPress, color = '#64748b', isSwitch, switchValue, onSwitchChange }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={isSwitch ? () => onSwitchChange(!switchValue) : onPress}
            disabled={isSwitch}
        >
            <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                <Icon size={20} color={color} />
            </View>
            <View style={styles.menuText}>
                <Text style={styles.menuTitle}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
            {isSwitch ? (
                <Switch value={switchValue} onValueChange={onSwitchChange} color={theme.colors.primary} />
            ) : (
                <ChevronRight size={20} color="#cbd5e1" />
            )}
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Profile Header */}
                <View style={styles.header}>
                    <Surface style={styles.avatarContainer} elevation={2}>
                        <Avatar.Text size={80} label="K" style={{ backgroundColor: theme.colors.primary }} />
                        <View style={styles.onlineBadge} />
                    </Surface>
                    <Text variant="headlineSmall" style={styles.userName}>Kimmy</Text>
                    <Text variant="bodyMedium" style={styles.userEmail}>kimmy@higreen.com</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>850</Text>
                            <Text style={styles.statLabel}>Points</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Reports</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: '#10b981' }]}>58kg</Text>
                            <Text style={styles.statLabel}>CO2 Saved</Text>
                        </View>
                    </View>
                </View>

                {/* Account Section */}
                <SectionHeader title="Account" />
                <Surface style={styles.sectionCard} elevation={0}>
                    <MenuItem
                        icon={User}
                        title="Edit Profile"
                        subtitle="Personal details and address"
                        onPress={() => navigation.navigate('EditProfile')}
                        color="#3b82f6"
                    />
                    <View style={styles.divider} />
                    <MenuItem
                        icon={Award}
                        title="My Rewards"
                        subtitle="Vouchers and eco-points"
                        onPress={() => navigation.navigate('Rewards')}
                        color="#f59e0b"
                    />
                    <View style={styles.divider} />
                    <MenuItem
                        icon={CreditCard}
                        title="Payment Methods"
                        subtitle="Linked cards and wallets"
                        onPress={() => navigation.navigate('PaymentMethods')}
                        color="#8b5cf6"
                    />
                </Surface>

                {/* Preferences Section */}
                <SectionHeader title="Preferences" />
                <Surface style={styles.sectionCard} elevation={0}>
                    <MenuItem
                        icon={Bell}
                        title="Push Notifications"
                        isSwitch
                        switchValue={notificationsIds}
                        onSwitchChange={setNotificationsIds}
                        color="#ec4899"
                    />
                    <View style={styles.divider} />
                    <MenuItem
                        icon={Moon}
                        title="Dark Mode"
                        isSwitch
                        switchValue={isDarkMode}
                        onSwitchChange={setIsDarkMode}
                        color="#64748b"
                    />
                </Surface>

                {/* Legal Section */}
                <SectionHeader title="Legal & Support" />
                <Surface style={styles.sectionCard} elevation={0}>
                    <MenuItem
                        icon={FileText}
                        title="Terms of Service"
                        onPress={() => navigation.navigate('Legal', { type: 'terms' })}
                        color="#64748b"
                    />
                    <View style={styles.divider} />
                    <MenuItem
                        icon={Shield}
                        title="Privacy Policy"
                        onPress={() => navigation.navigate('Legal', { type: 'privacy' })}
                        color="#64748b"
                    />
                    <View style={styles.divider} />
                    <MenuItem
                        icon={HelpCircle}
                        title="Help & Support"
                        onPress={() => navigation.navigate('Legal', { type: 'help' })}
                        color="#64748b"
                    />
                </Surface>

                <Button
                    mode="outlined"
                    onPress={logout}
                    style={styles.logoutBtn}
                    textColor="#ef4444"
                    icon={() => <LogOut size={18} color="#ef4444" />}
                >
                    Log Out
                </Button>

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
    scrollContent: {
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    avatarContainer: {
        marginBottom: 15,
        borderRadius: 40,
        padding: 4,
        backgroundColor: '#fff',
    },
    onlineBadge: {
        position: 'absolute',
        right: 0,
        bottom: 5,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#10b981',
        borderWidth: 2,
        borderColor: '#fff',
    },
    userName: {
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    userEmail: {
        color: '#64748b',
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        width: '100%',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: '80%',
        backgroundColor: '#f1f5f9',
        alignSelf: 'center',
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#94a3b8',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 0,
        marginBottom: 10,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuText: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1e293b',
    },
    menuSubtitle: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginLeft: 68,
    },
    logoutBtn: {
        borderColor: '#fee2e2',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#fef2f2',
        borderWidth: 0,
    }
});
