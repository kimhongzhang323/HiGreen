import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, Surface, Chip, useTheme, ActivityIndicator } from 'react-native-paper';
import { MapPin, Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_REPORTS = [
    {
        id: '1',
        type: 'Waste',
        description: 'Overflowing bin near bus stop',
        status: 'new',
        date: '2025-10-24',
        location: 'Jalan Tun Razak',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        type: 'Pothole',
        description: 'Deep pothole on left lane',
        status: 'in_progress',
        date: '2025-10-22',
        location: 'Bangsar South',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: '3',
        type: 'Pollution',
        description: 'Open burning smoke visible',
        status: 'resolved',
        date: '2025-10-20',
        location: 'Cheras',
        image: 'https://via.placeholder.com/150',
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'new': return '#3b82f6';
        case 'in_progress': return '#f59e0b';
        case 'resolved': return '#10b981';
        default: return '#9ca3af';
    }
};

const ReportCard = ({ item }) => {
    const theme = useTheme();
    return (
        <Surface style={styles.card} elevation={2}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.type}</Text>
                    <Chip
                        mode="flat"
                        textStyle={{ color: '#fff', fontSize: 10 }}
                        style={{ backgroundColor: getStatusColor(item.status), height: 24 }}
                    >
                        {item.status.replace('_', ' ').toUpperCase()}
                    </Chip>
                </View>
                <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>{item.description}</Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <MapPin size={14} color={theme.colors.textLight} />
                        <Text variant="labelSmall" style={styles.metaText}>{item.location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Clock size={14} color={theme.colors.textLight} />
                        <Text variant="labelSmall" style={styles.metaText}>{item.date}</Text>
                    </View>
                </View>
            </View>
        </Surface>
    );
};

export default function MyReportsScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor: theme.colors.surface, paddingTop: insets.top + 10 }]}>
                <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>My Reports</Text>
            </View>
            <FlatList
                data={MOCK_REPORTS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ReportCard item={item} />}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
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
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
    },
    cardImage: {
        width: 100,
        height: 120,
    },
    cardContent: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    description: {
        color: '#4b5563',
        marginBottom: 10,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        color: '#9ca3af',
        marginLeft: 4,
    },
});
