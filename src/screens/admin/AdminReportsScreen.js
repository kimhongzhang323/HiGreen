import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, Surface, Chip, useTheme, IconButton } from 'react-native-paper';
import { MapPin, Calendar, Check, AlertTriangle, AlertCircle, Clock, Filter } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mockReports = [
    {
        id: '1',
        type: 'Illegal Dumping',
        location: 'Central Park North',
        date: '2023-11-15',
        status: 'Pending',
        priority: 'P0',
        description: 'Large pile of chemical waste near playground.'
    },
    {
        id: '2',
        type: 'Broken Streetlamp',
        location: '5th Avenue',
        date: '2023-11-14',
        status: 'Resolved',
        priority: 'P2',
        description: 'Light flickering on corner.'
    },
    {
        id: '3',
        type: 'Pothole',
        location: 'Main St',
        date: '2023-11-12',
        status: 'Pending',
        priority: 'P1',
        description: 'Deep pothole causing traffic slowdown.'
    },
    {
        id: '4',
        type: 'Noise Complaint',
        location: '7th Street',
        date: '2023-11-10',
        status: 'Resolved',
        priority: 'P2',
        description: 'Loud construction after hours.'
    },
    {
        id: '5',
        type: 'Fallen Tree',
        location: 'River Road',
        date: '2023-11-16',
        status: 'Pending',
        priority: 'P0',
        description: 'Blocking two lanes of traffic.'
    },
];

export default function AdminReportsScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    // Filters
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');

    const filteredReports = mockReports.filter(r => {
        const statusMatch = statusFilter === 'All' || r.status === statusFilter;
        const priorityMatch = priorityFilter === 'All' || r.priority === priorityFilter;
        return statusMatch && priorityMatch;
    });

    const getPriorityColor = (p) => {
        switch (p) {
            case 'P0': return '#ef4444'; // Red
            case 'P1': return '#f97316'; // Orange
            case 'P2': return '#3b82f6'; // Blue
            default: return '#64748b';
        }
    };

    const FilterSection = ({ title, options, selected, onSelect }) => (
        <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {options.map(opt => (
                    <Chip
                        key={opt}
                        mode="flat"
                        selected={selected === opt}
                        onPress={() => onSelect(opt)}
                        style={[
                            styles.chip,
                            selected === opt && { backgroundColor: theme.colors.primaryContainer, borderColor: theme.colors.primaryContainer }
                        ]}
                        textStyle={{
                            color: selected === opt ? theme.colors.primary : '#64748b',
                            fontWeight: '600',
                            fontSize: 13
                        }}
                    >
                        {opt}
                    </Chip>
                ))}
            </ScrollView>
        </View>
    );

    const ReportItem = ({ item }) => {
        const priorityColor = getPriorityColor(item.priority);

        return (
            <Surface style={[styles.reportCard, item.priority === 'P0' && styles.p0Border]} elevation={0}>
                <View style={styles.cardInner}>
                    {/* Priority Stripe */}
                    <View style={[styles.priorityStripe, { backgroundColor: priorityColor }]} />

                    <View style={styles.cardContent}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '15' }]}>
                                    <Text style={{ color: priorityColor, fontWeight: '800', fontSize: 12 }}>{item.priority}</Text>
                                </View>
                                <Text style={{ fontWeight: 'bold', color: '#1e293b', fontSize: 16 }}>{item.type}</Text>
                            </View>
                            <Chip
                                textStyle={{ fontSize: 10, lineHeight: 10, fontWeight: '700' }}
                                style={{ backgroundColor: item.status === 'Resolved' ? '#dcfce7' : '#fee2e2', height: 24 }}
                            >
                                {item.status}
                            </Chip>
                        </View>

                        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

                        <View style={styles.metaInfo}>
                            <View style={styles.row}>
                                <MapPin size={14} color="#94a3b8" />
                                <Text style={styles.infoText}>{item.location}</Text>
                            </View>
                            <View style={styles.row}>
                                <Calendar size={14} color="#94a3b8" />
                                <Text style={styles.infoText}>{item.date}</Text>
                            </View>
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#f8fafc' }]}>
                                <Text style={{ color: '#64748b', fontWeight: '600' }}>View Details</Text>
                            </TouchableOpacity>
                            {item.status === 'Pending' && (
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: item.priority === 'P0' ? '#ef4444' : theme.colors.primary }]}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Resolve</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Surface>
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.topHeader}>
                <View>
                    <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: '#1e293b' }}>Report Center</Text>
                    <Text variant="bodyMedium" style={{ color: '#64748b' }}>{filteredReports.length} issues found</Text>
                </View>
                <IconButton icon={() => <Filter size={24} color="#1e293b" />} />
            </View>

            <View style={styles.filtersWrapper}>
                <FilterSection
                    title="Status"
                    options={['All', 'Pending', 'Resolved']}
                    selected={statusFilter}
                    onSelect={setStatusFilter}
                />
                <FilterSection
                    title="Priority"
                    options={['All', 'P0', 'P1', 'P2']}
                    selected={priorityFilter}
                    onSelect={setPriorityFilter}
                />
            </View>

            <FlatList
                data={filteredReports}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ReportItem item={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#94a3b8' }}>No reports match your filters.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 10,
    },
    filtersWrapper: {
        paddingHorizontal: 20,
    },
    filterGroup: {
        marginBottom: 12,
    },
    filterLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94a3b8',
        marginBottom: 6,
        marginLeft: 2,
    },
    chip: {
        marginRight: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        height: 32,
    },
    listContent: {
        padding: 20,
        paddingTop: 5,
    },
    reportCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        // No overflow hidden here to allow shadow
    },
    cardInner: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 20, // Match parent radius
    },
    p0Border: {
        borderWidth: 1,
        borderColor: '#fecaca', // Light red border for P0
    },
    priorityStripe: {
        width: 6,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    description: {
        color: '#475569',
        fontSize: 14,
        marginBottom: 12,
        lineHeight: 20,
    },
    metaInfo: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: {
        color: '#94a3b8',
        fontSize: 13,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
    },
    actionBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    }
});
