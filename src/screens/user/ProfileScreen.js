import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Avatar, List, Button, useTheme, Divider } from 'react-native-paper';
import { User, Settings, LogOut, Award, CreditCard } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor: theme.colors.surface, paddingTop: insets.top + 10 }]}>
                <Avatar.Icon size={80} icon="account" style={{ backgroundColor: theme.colors.primary }} />
                <Text variant="headlineSmall" style={{ marginTop: 10, fontWeight: 'bold' }}>John Doe</Text>
                <Text variant="bodyMedium" style={{ color: '#666' }}>Citizen • Kuala Lumpur</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold', color: theme.colors.primary }}>850</Text>
                        <Text variant="labelSmall">Points</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statItem}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold', color: theme.colors.secondary }}>12</Text>
                        <Text variant="labelSmall">Reports</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statItem}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold', color: '#10b981' }}>58kg</Text>
                        <Text variant="labelSmall">CO2 Saved</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content}>
                <List.Section>
                    <List.Subheader>Account</List.Subheader>
                    <List.Item
                        title="Edit Profile"
                        onPress={() => navigation.navigate('EditProfile')}
                        left={props => <List.Icon {...props} icon={() => <User size={24} color="#555" />} />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                    />
                    <Divider />
                    <List.Item
                        title="Rewards"
                        onPress={() => navigation.navigate('Rewards')}
                        left={props => <List.Icon {...props} icon={() => <Award size={24} color="#555" />} />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                    />
                    <Divider />
                    <List.Item
                        title="Payment Methods"
                        onPress={() => navigation.navigate('PaymentMethods')}
                        left={props => <List.Icon {...props} icon={() => <CreditCard size={24} color="#555" />} />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                    />
                </List.Section>

                <List.Section>
                    <List.Subheader>Settings</List.Subheader>
                    <List.Item
                        title="Notifications"
                        left={props => <List.Icon {...props} icon="bell-outline" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                    />
                    <List.Item
                        title="Language"
                        description="English"
                        left={props => <List.Icon {...props} icon="translate" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                    />
                </List.Section>

                <View style={{ padding: 20 }}>
                    <Button
                        mode="outlined"
                        textColor="#ef4444"
                        style={{ borderColor: '#ef4444' }}
                        icon={() => <LogOut size={20} color="#ef4444" />}
                        onPress={() => alert('Logged Out')}
                    >
                        Log Out
                    </Button>
                </View>
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
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: 20,
        width: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: '#ddd',
    },
    content: {
        flex: 1,
    },
});
