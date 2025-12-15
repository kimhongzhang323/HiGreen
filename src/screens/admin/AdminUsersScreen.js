import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Surface, Avatar, IconButton, useTheme, Searchbar } from 'react-native-paper';
import { MoreVertical, UserX, CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mockUsers = [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', status: 'Active', role: 'User' },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', status: 'Reported', role: 'User' },
    { id: '3', name: 'Charlie Lee', email: 'charlie@example.com', status: 'Banned', role: 'User' },
    { id: '4', name: 'David Kim', email: 'david@example.com', status: 'Active', role: 'Moderator' },
];

export default function AdminUsersScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const UserItem = ({ item }) => (
        <Surface style={styles.userItem} elevation={0}>
            <Avatar.Text size={40} label={item.name[0]} style={{ backgroundColor: item.status === 'Banned' ? '#94a3b8' : theme.colors.primary }} />
            <View style={{ flex: 1, marginLeft: 15 }}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: '#1e293b' }}>{item.name}</Text>
                <Text variant="bodySmall" style={{ color: '#64748b' }}>{item.email}</Text>
                <View style={[styles.badge,
                item.status === 'Active' ? { backgroundColor: '#dcfce7' } :
                    item.status === 'Banned' ? { backgroundColor: '#f1f5f9' } : { backgroundColor: '#fee2e2' }
                ]}>
                    <Text style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: item.status === 'Active' ? '#166534' : item.status === 'Banned' ? '#64748b' : '#991b1b'
                    }}>
                        {item.status.toUpperCase()}
                    </Text>
                </View>
            </View>
            <IconButton icon={() => <MoreVertical size={20} color="#94a3b8" />} />
        </Surface>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: '#1e293b' }}>Manage Users</Text>
                <Text variant="bodyMedium" style={{ color: '#64748b' }}>{filteredUsers.length} total users found</Text>
            </View>

            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search users..."
                    placeholderTextColor="#94a3b8"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    inputStyle={{ minHeight: 0, color: '#1e293b' }}
                    iconColor="#94a3b8"
                    elevation={0}
                />
            </View>

            <FlatList
                data={filteredUsers}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <UserItem item={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#94a3b8' }}>No users found.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Pro Light
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0', // Subtle border
    },
    listContent: {
        padding: 20,
        paddingTop: 10,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 4,
    }
});
