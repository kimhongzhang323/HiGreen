import React from 'react';
import { View, StyleSheet, ImageLimit, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Button, Surface, IconButton } from 'react-native-paper';
import { X, Share2, ChevronDown, Award } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Import the asset directly or use require
const bgImage = require('../../../assets/img1.webp');

export default function TaskCompletionScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <ImageBackground source={bgImage} style={styles.backgroundImage} resizeMode="cover">
                {/* Overlay Gradient for text readability at bottom */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(20,20,20,0.9)']}
                    locations={[0, 0.5, 1]}
                    style={styles.gradient}
                />

                {/* Top Actions */}
                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <View style={styles.topRightButtons}>
                        {/* Close Button implementation needed if modal, but here just for UI matching */}
                        <TouchableOpacity style={styles.circleButton} onPress={() => navigation.goBack()}>
                            <X size={20} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity style={styles.circleButton}>
                            <Share2 size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Content */}
                <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>

                    {/* Points Badge */}
                    <View style={styles.badgeContainer}>
                        <Surface style={styles.pointsBadge}>
                            <Award size={16} color="#fff" />
                            <Text style={styles.pointsText}>10</Text>
                        </Surface>
                    </View>

                    <Text style={styles.eyebrow}>Clean • 30 Days • SDG 11</Text>

                    <Text style={styles.title}>Collecting{'\n'}Garbage</Text>

                    <Text style={styles.description}>
                        Taking action for a cleaner, healthier environment. Join our initiative to clean up the neighborhood!
                    </Text>

                    {/* Reward Info */}
                    <View style={styles.rewardRow}>
                        <Award size={32} color="#a3e635" />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.rewardTitle}>Earned 10 HSCoins!</Text>
                            <Text style={styles.rewardSub}>Don't stop now!</Text>
                        </View>
                    </View>

                    {/* Action Button */}
                    <Button
                        mode="contained"
                        style={styles.actionButton}
                        labelStyle={styles.actionLabel}
                        onPress={() => alert('Reward Claimed!')}
                    >
                        Claim reward
                    </Button>

                    <View style={styles.chevron}>
                        <ChevronDown size={30} color="#fff" />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '70%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    topRightButtons: {
        alignItems: 'center',
    },
    circleButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
    },
    badgeContainer: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    pointsText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 14,
    },
    eyebrow: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    title: {
        fontSize: 48,
        fontWeight: '800', // Extra bold
        color: '#fff',
        lineHeight: 52,
        marginBottom: 16,
    },
    description: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
    },
    rewardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    rewardTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    rewardSub: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    actionButton: {
        backgroundColor: '#ccff00', // Vivid Lime
        borderRadius: 30,
        height: 60,
        justifyContent: 'center',
    },
    actionLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    chevron: {
        alignItems: 'center',
        marginTop: 20,
    }
});
