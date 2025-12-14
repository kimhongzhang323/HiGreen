import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

const INITIAL_REGION = {
    latitude: 3.1415,
    longitude: 101.6869, // KL
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

const MARKERS = [
    { id: 1, lat: 3.1415, lng: 101.6869, title: "KLCC Park", type: "Park" },
    { id: 2, lat: 3.1350, lng: 101.6860, title: "Eco Recycling Center", type: "Recycling" },
    { id: 3, lat: 3.1500, lng: 101.7000, title: "Community Garden", type: "Garden" },
];

export default function GreenMapScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {MARKERS.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                        title={marker.title}
                        description={marker.type}
                        pinColor={marker.type === 'Recycling' ? '#10b981' : '#a3e635'}
                    />
                ))}
            </MapView>

            <View style={[styles.backButton, { top: insets.top + 10 }]}>
                <Button
                    mode="contained"
                    icon={() => <ChevronLeft size={24} color="#333" />}
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: '#fff', borderRadius: 20 }}
                    textColor="#333"
                >
                    Back
                </Button>
            </View>

            <View style={[styles.searchOverlay, { top: insets.top + 70 }]}>
                {/* Placeholder for Search Bar */}
                <View style={styles.searchBar}>
                    <Text style={{ color: '#666' }}>Find recycling bins, parks...</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={{ textAlign: 'center', color: '#666', fontSize: 12 }}>
                    Showing green spots in Kuala Lumpur
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    searchOverlay: {
        position: 'absolute',
        left: 20,
        right: 20,
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 10,
        borderRadius: 20,
    }
});
