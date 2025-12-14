import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Mail, Phone, Lock, Leaf } from 'lucide-react-native';

export default function RegisterScreen({ navigation }) {
    const theme = useTheme();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setLoading(true);
        // TODO: Implement actual registration logic
        setTimeout(() => {
            setLoading(false);
            alert('Registration logic to be implemented.');
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                style={styles.header}
            >
                <View style={styles.logoContainer}>
                    <Leaf size={40} color="#fff" />
                    <Text variant="headlineMedium" style={styles.headerTitle}>Join HiGreen</Text>
                    <Text variant="bodyMedium" style={styles.headerSubtitle}>Create your account</Text>
                </View>
            </LinearGradient>

            <Surface style={styles.formContainer} elevation={4}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Full Name"
                                value={fullName}
                                onChangeText={setFullName}
                                mode="outlined"
                                left={<TextInput.Icon icon={() => <User size={20} color={theme.colors.primary} />} />}
                                style={styles.input}
                            />
                            <TextInput
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                mode="outlined"
                                keyboardType="email-address"
                                left={<TextInput.Icon icon={() => <Mail size={20} color={theme.colors.primary} />} />}
                                style={styles.input}
                            />
                            <TextInput
                                label="Phone"
                                value={phone}
                                onChangeText={setPhone}
                                mode="outlined"
                                keyboardType="phone-pad"
                                left={<TextInput.Icon icon={() => <Phone size={20} color={theme.colors.primary} />} />}
                                style={styles.input}
                            />
                            <TextInput
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                mode="outlined"
                                secureTextEntry
                                left={<TextInput.Icon icon={() => <Lock size={20} color={theme.colors.primary} />} />}
                                style={styles.input}
                            />
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleRegister}
                            loading={loading}
                            style={styles.button}
                            contentStyle={{ height: 50 }}
                        >
                            Sign Up
                        </Button>

                        <View style={styles.loginContainer}>
                            <Text variant="bodyMedium">Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0fdf4',
    },
    header: {
        height: '25%', // Shorter header for Register
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
    },
    formContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: -30,
        marginBottom: 20,
        padding: 24,
        borderRadius: 16,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    button: {
        borderRadius: 8,
        marginTop: 10,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
});
