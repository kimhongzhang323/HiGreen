import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Mail, Lock, Leaf, ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ... imports
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loginAsGuest } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            login(email, password);
        }, 1500);
    };

    const handleGuestLogin = () => {
        loginAsGuest();
    };

    return (
        <View style={[styles.container, { backgroundColor: '#fff' }]}>
            {/* ... Header ... */}
            <View style={[styles.header, { marginTop: insets.top }]}>
                <View style={styles.iconCircle}>
                    <Leaf size={32} color="#10b981" />
                </View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subText}>Sign in to continue your green journey</Text>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formArea}>
                {/* ... Inputs ... */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="john@example.com"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        left={<TextInput.Icon icon={() => <Mail size={20} color="#94a3b8" />} />}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        left={<TextInput.Icon icon={() => <Lock size={20} color="#94a3b8" />} />}
                    />
                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={loading}
                    style={styles.loginBtn}
                    contentStyle={{ height: 56 }}
                    labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                >
                    Login
                </Button>

                <TouchableOpacity
                    onPress={handleGuestLogin}
                    style={{ marginTop: 15, alignItems: 'center' }}
                >
                    <Text style={{ color: '#64748b', fontSize: 14 }}>Continue as Guest</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    // ... existing styles ...
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#ecfdf5', // Emerald 50
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
    },
    subText: {
        fontSize: 16,
        color: '#64748b',
    },
    formArea: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
    },
    inputOutline: {
        borderColor: '#e2e8f0',
        borderRadius: 12,
    },
    inputContent: {
        paddingVertical: 12, // Taller inputs
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    forgotText: {
        color: '#10b981',
        fontWeight: '600',
    },
    loginBtn: {
        backgroundColor: '#10b981',
        borderRadius: 16,
        marginTop: 10,
        shadowColor: "#10b981",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        color: '#64748b',
    },
    signupText: {
        color: '#10b981',
        fontWeight: 'bold',
    },
});
