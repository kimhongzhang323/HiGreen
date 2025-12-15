import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LegalScreen({ route, navigation }) {
    const { type } = route.params;
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const content = {
        terms: {
            title: 'Terms of Service',
            body: `
1. Introduction
Welcome to HiGreen. By using our app, you agree to these terms.

2. User Conduct
You agree to use HiGreen responsibly. Do not submit false reports or misuse the gamification system.

3. Eco-Points
Points have no cash value and are used solely for in-app rewards. We reserve the right to adjust point values at any time.

4. Data Usage
We collect anonymized data to improve city services. Your personal data is protected as per our Privacy Policy.

5. Termination
We may suspend your account for violations of these terms.
            `
        },
        privacy: {
            title: 'Privacy Policy',
            body: `
1. Information We Collect
We collect email, location data (for reports), and usage stats.

2. How We Use Data
- To verify eco-actions.
- To improve public transport services.
- To display leaderboard stats.

3. Third Parties
We do not sell your data. We may share aggregate data with city councils for urban planning.

4. Security
We use industry-standard encryption to protect your data.
            `
        },
        help: {
            title: 'Help & Support',
            body: `
FAQ

Q: How do I earn points?
A: Complete daily tasks, report issues, or use public transport.

Q: How do I redeem rewards?
A: Go to Profile > My Rewards and browse available vouchers.

Q: My report is still pending.
A: Reports are usually reviewed within 24-48 hours. Priority issues (P0) are handled immediately.

Q: Can I change my username?
A: Yes, go to Profile > Edit Profile.

Contact Us: support@higreen.com
            `
        }
    };

    const data = content[type] || content.help;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Button icon="arrow-left" mode="text" onPress={() => navigation.goBack()} compact>
                    Back
                </Button>
                <Text variant="titleLarge" style={{ fontWeight: 'bold', marginLeft: -20, flex: 1, textAlign: 'center' }}>
                    {data.title}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Surface style={styles.card} elevation={0}>
                    <Text style={styles.bodyText}>{data.body.trim()}</Text>
                </Surface>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#334155',
    }
});
