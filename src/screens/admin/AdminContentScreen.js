import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Surface, SegmentedButtons, FAB, useTheme, IconButton } from 'react-native-paper';
import { Plus, Edit2, Trash2, Calendar, Eye } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mockNews = [
    { id: '1', title: 'New Recycling Initiative', date: '2023-11-20', views: 1205, status: 'Published', type: 'News' },
    { id: '2', title: 'City Park Cleanup', date: '2023-11-18', views: 890, status: 'Published', type: 'News' },
];

const mockActivities = [
    { id: '3', title: 'Tree Planting Day', date: '2023-12-01', participants: 45, status: 'Upcoming', type: 'Activity' },
    { id: '4', title: 'Eco-Workshop', date: '2023-12-05', participants: 20, status: 'Draft', type: 'Activity' },
];

export default function AdminContentScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [tab, setTab] = useState('news');

    const data = tab === 'news' ? mockNews : mockActivities;

    const ContentItem = ({ item }) => (
        <Surface style={styles.card} elevation={0}>
            <View style={styles.cardContent}>
                <View style={[styles.iconBox, { backgroundColor: tab === 'news' ? '#e0f2fe' : '#dcfce7' }]}>
                    <Text style={{ fontSize: 20 }}>{tab === 'news' ? '📰' : '🌱'}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold', color: '#1e293b' }}>{item.title}</Text>
                    <View style={styles.metaRow}>
                        <Calendar size={14} color="#64748b" />
                        <Text style={styles.metaText}>{item.date}</Text>
                        {item.views && (
                            <>
                                <View style={styles.dot} />
                                <Eye size={14} color="#64748b" />
                                <Text style={styles.metaText}>{item.views}</Text>
                            </>
                        )}
                        {item.participants && (
                            <>
                                <View style={styles.dot} />
                                <Text style={styles.metaText}>{item.participants} joined</Text>
                            </>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.actionRow}>
                <View style={[styles.statusBadge,
                item.status === 'Published' ? { backgroundColor: '#dcfce7' } :
                    item.status === 'Upcoming' ? { backgroundColor: '#fef3c7' } : { backgroundColor: '#f1f5f9' }
                ]}>
                    <Text style={{
                        fontSize: 10, fontWeight: 'bold',
                        color: item.status === 'Published' ? '#166534' : item.status === 'Upcoming' ? '#b45309' : '#64748b'
                    }}>{item.status.toUpperCase()}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <IconButton icon={() => <Edit2 size={18} color="#64748b" />} style={{ margin: 0 }} />
                    <IconButton icon={() => <Trash2 size={18} color="#ef4444" />} style={{ margin: 0 }} />
                </View>
            </View>
        </Surface>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: '#1e293b' }}>Content Manager</Text>
                <Text variant="bodyMedium" style={{ color: '#64748b' }}>Manage news and community activities</Text>
            </View>

            <View style={styles.tabsContainer}>
                <SegmentedButtons
                    value={tab}
                    onValueChange={setTab}
                    buttons={[
                        { value: 'news', label: 'News', icon: 'newspaper' },
                        { value: 'activities', label: 'Activities', icon: 'calendar' },
                    ]}
                    style={styles.segmentedButtons}
                    theme={{ colors: { secondaryContainer: theme.colors.primaryContainer, onSecondaryContainer: theme.colors.primary } }}
                />
            </View>

            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ContentItem item={item} />}
                contentContainerStyle={styles.listContent}
            />

            <FAB
                icon={() => <Plus size={24} color="#fff" />}
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={() => console.log('Add New')}
                label={tab === 'news' ? 'New Article' : 'New Activity'}
                color="#fff"
            />
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
    tabsContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    listContent: {
        padding: 20,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    metaText: {
        fontSize: 12,
        color: '#64748b',
        marginLeft: 6,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#cbd5e1',
        marginHorizontal: 8,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 10,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },
});
