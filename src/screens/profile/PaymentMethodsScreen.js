import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Surface, Button, RadioButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CreditCard, Plus } from 'lucide-react-native';

const CARDS = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/26' },
    { id: '2', type: 'Mastercard', last4: '8888', expiry: '09/25' },
];

export default function PaymentMethodsScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [checked, setChecked] = React.useState('1');

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: theme.colors.surface }]}>
                <Text variant="headlineSmall" style={styles.title}>Payment Methods</Text>
            </View>

            <View style={styles.content}>
                {CARDS.map(card => (
                    <Surface key={card.id} style={styles.cardItem} elevation={1}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CreditCard size={24} color={theme.colors.primary} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.cardTitle}>{card.type} •••• {card.last4}</Text>
                                <Text style={styles.cardSub}>Expires {card.expiry}</Text>
                            </View>
                        </View>
                        <RadioButton
                            value={card.id}
                            status={checked === card.id ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(card.id)}
                            color={theme.colors.primary}
                        />
                    </Surface>
                ))}

                <Button
                    mode="outlined"
                    icon={() => <Plus size={20} color={theme.colors.primary} />}
                    style={styles.addButton}
                    onPress={() => console.log('Add Card')}
                >
                    Add New Card
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    cardSub: {
        color: '#666',
        fontSize: 12,
    },
    addButton: {
        marginTop: 20,
        borderColor: '#e2e8f0',
        borderStyle: 'dashed',
    },
});
