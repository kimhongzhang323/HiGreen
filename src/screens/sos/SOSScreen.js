import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { PhoneCall, AlertTriangle } from 'lucide-react-native';

export default function SOSScreen({ navigation }) {
    const [status, setStatus] = useState('standby'); // standby, alerting, resolved

    const handlePress = () => {
        setStatus('alerting');

        // 1. Simulate Auto-Call
        // Linking.openURL('tel:0123456789'); 
        alert('Calling Emergency Contact (Mom)... Connecting...');

        // 2. Mock Live Location Sharing
        setTimeout(() => {
            alert('LIVE LOCATION SHARED with Family Chain!\nTracking Active: 3.1415, 101.6869');
        }, 1000);
    };

    return (
        <View style={[styles.container, status === 'alerting' ? styles.alertBackground : styles.normalBackground]}>
            <View style={styles.header}>
                <AlertTriangle size={40} color={status === 'alerting' ? '#fff' : '#ef4444'} />
                <Text variant="displaySmall" style={[styles.title, status === 'alerting' && { color: '#fff' }]}>
                    {status === 'alerting' ? 'LIVE LOCATION ACTIVE' : 'EMERGENCY SOS'}
                </Text>
                <Text style={[styles.subtitle, status === 'alerting' && { color: '#fff' }]}>
                    {status === 'alerting' ? 'Family has been notified & is tracking you.' : 'Press and hold for 3 seconds to trigger alarm'}
                </Text>
            </View>

            <View style={styles.center}>
                <TouchableOpacity
                    style={[styles.sosButton, status === 'alerting' && styles.sosButtonActive]}
                    onPress={handlePress}
                    onLongPress={handlePress}
                    delayLongPress={1000}
                >
                    <Text style={styles.sosText}>{status === 'alerting' ? 'SENT' : 'SOS'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Button
                    mode="contained"
                    icon={() => <PhoneCall size={20} color="#fff" />}
                    style={{ backgroundColor: '#333' }}
                    contentStyle={{ height: 56 }}
                    onPress={() => alert('Calling 999...')}
                >
                    Call Police (999)
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    normalBackground: {
        backgroundColor: '#fee2e2',
    },
    alertBackground: {
        backgroundColor: '#ef4444',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#ef4444',
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        color: '#7f1d1d',
        marginTop: 10,
        textAlign: 'center',
    },
    center: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sosButton: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#ef4444',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 10,
        borderColor: '#fca5a5',
    },
    sosButtonActive: {
        backgroundColor: '#fff',
        borderColor: '#fee2e2',
    },
    sosText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#fff',
    },
    footer: {
        padding: 30,
    },
});
