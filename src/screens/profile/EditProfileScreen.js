import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Avatar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera } from 'lucide-react-native';

export default function EditProfileScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [phone, setPhone] = useState('+60 12-345 6789');

    const handleSave = () => {
        // Mock save
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: theme.colors.surface }]}>
                <Text variant="headlineSmall" style={styles.title}>Edit Profile</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.avatarContainer}>
                    <Avatar.Icon size={100} icon="account" style={{ backgroundColor: theme.colors.primary }} />
                    <View style={styles.editIcon}>
                        <Camera size={20} color="#fff" />
                    </View>
                </View>

                <View style={styles.form}>
                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        mode="outlined"
                        style={styles.input}
                    />
                </View>

                <Button
                    mode="contained"
                    onPress={handleSave}
                    style={styles.button}
                    contentStyle={{ height: 50 }}
                >
                    Save Changes
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        padding: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: '#333',
        borderRadius: 20,
        padding: 8,
    },
    form: {
        gap: 16,
    },
    input: {
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 40,
        borderRadius: 12,
    },
});
