import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Text, TextInput, Button, Surface, Chip, useTheme, IconButton } from 'react-native-paper';
import { Camera, MapPin, X, Check, Map as MapIcon, Crosshair } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const CATEGORIES = ['Waste', 'Pothole', 'Pollution', 'Traffic', 'Other'];

export default function ReportIssueScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    // Map State
    const [mapVisible, setMapVisible] = useState(false);
    const [location, setLocation] = useState({
        latitude: 3.1415,
        longitude: 101.6869,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });
    const [address, setAddress] = useState("Tap to select location");

    const handleTakePhoto = () => {
        // In real app: ImagePicker.launchCameraAsync()
        setPhoto('https://via.placeholder.com/600x400');
    };

    const handleSelectLocation = () => {
        setMapVisible(false);
        setAddress(`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`);
    };

    const handleSubmit = () => {
        if (!selectedCategory || !description || !photo) {
            alert('Please complete all fields (Category, Description, Photo)');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Report Submitted Successfully!');
            navigation.goBack();
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor: theme.colors.primary, paddingTop: insets.top + 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="arrow-left" iconColor="#fff" onPress={() => navigation.goBack()} />
                    <Text variant="titleLarge" style={styles.headerTitle}>Report Issue</Text>
                </View>
            </View>

            <ScrollView style={styles.content}>
                {/* 1. Location Section */}
                <Text style={styles.sectionLabel}>1. Location</Text>
                <TouchableOpacity onPress={() => setMapVisible(true)}>
                    <Surface style={styles.locationCard} elevation={2}>
                        <View style={styles.row}>
                            <View style={[styles.iconBox, { backgroundColor: '#dbeafe' }]}>
                                <MapPin size={24} color="#2563eb" />
                            </View>
                            <View style={{ marginLeft: 15, flex: 1 }}>
                                <Text style={styles.locationTitle}>Issue Location</Text>
                                <Text style={styles.locationText} numberOfLines={1}>{address}</Text>
                            </View>
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Change</Text>
                        </View>
                    </Surface>
                </TouchableOpacity>

                {/* 2. Photo Section */}
                <Text style={styles.sectionLabel}>2. Photo Evidence</Text>
                <Surface style={styles.photoContainer} elevation={1}>
                    {photo ? (
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
                            <TouchableOpacity style={styles.removePhoto} onPress={() => setPhoto(null)}>
                                <X size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
                            <View style={[styles.cameraCircle, { backgroundColor: theme.colors.primary + '10' }]}>
                                <Camera size={40} color={theme.colors.primary} />
                            </View>
                            <Text style={{ marginTop: 10, color: '#666', fontWeight: '500' }}>Take Photo</Text>
                        </TouchableOpacity>
                    )}
                </Surface>

                {/* 3. Category Section */}
                <Text style={styles.sectionLabel}>3. Category</Text>
                <View style={styles.chipContainer}>
                    {CATEGORIES.map((cat) => (
                        <Chip
                            key={cat}
                            selected={selectedCategory === cat}
                            onPress={() => setSelectedCategory(cat)}
                            style={[
                                styles.chip,
                                selectedCategory === cat && { backgroundColor: theme.colors.secondary }
                            ]}
                            textStyle={selectedCategory === cat ? { fontWeight: 'bold', color: '#14532d' } : {}}
                            showSelectedOverlay
                        >
                            {cat}
                        </Chip>
                    ))}
                </View>

                {/* 4. Description Section */}
                <Text style={styles.sectionLabel}>4. Description</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Describe the issue clearly..."
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                />

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    loading={loading}
                    style={styles.submitButton}
                    contentStyle={{ height: 56 }}
                >
                    Submit Report
                </Button>
                <View style={{ height: 50 }} />
            </ScrollView>

            {/* Map Modal */}
            <Modal visible={mapVisible} animationType="slide">
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={location}
                        onRegionChangeComplete={(region) => setLocation(region)}
                    >
                        {/* Center Marker Fixed */}
                    </MapView>
                    <View style={styles.centerMarker}>
                        <MapPin size={40} color="#ef4444" style={{ marginBottom: 20 }} />
                    </View>

                    <View style={[styles.mapHeader, { top: insets.top + 20 }]}>
                        <TouchableOpacity style={styles.closeMap} onPress={() => setMapVisible(false)}>
                            <X size={24} color="#333" />
                        </TouchableOpacity>
                        <Surface style={styles.searchBar}>
                            <Text>Drag map to pin location</Text>
                        </Surface>
                    </View>

                    <View style={[styles.mapFooter, { bottom: insets.bottom + 20 }]}>
                        <Button
                            mode="contained"
                            style={styles.confirmLocationBtn}
                            contentStyle={{ height: 50 }}
                            onPress={handleSelectLocation}
                        >
                            Confirm Location
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#64748b',
        marginBottom: 10,
        marginTop: 10,
        textTransform: 'uppercase',
    },
    locationCard: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#1e293b',
    },
    locationText: {
        color: '#64748b',
        fontSize: 14,
    },
    photoContainer: {
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderStyle: 'dashed',
    },
    cameraButton: {
        alignItems: 'center',
    },
    cameraCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    removePhoto: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 5,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    input: {
        backgroundColor: '#fff',
        marginTop: 5,
    },
    submitButton: {
        marginTop: 30,
        borderRadius: 16,
        backgroundColor: '#10b981',
    },
    // Map Modal
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    centerMarker: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    mapHeader: {
        position: 'absolute',
        left: 20, right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeMap: {
        width: 40, height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        elevation: 4,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
        elevation: 4,
    },
    mapFooter: {
        position: 'absolute',
        left: 20, right: 20,
    },
    confirmLocationBtn: {
        borderRadius: 25,
        backgroundColor: '#10b981',
    }
});
