import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Dimensions, Alert } from 'react-native';
import { Text, Surface, IconButton, useTheme, Avatar, Button, Card } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Send, Bot } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { GEMINI_API_KEY } from '../../config';

// 1. Define Message Types
const MSG_TYPE = {
    TEXT: 'text',
    CHART: 'chart',
    STATS: 'stats',
    CHALLENGE: 'challenge'
};

const INITIAL_MESSAGES = [
    { id: 1, type: MSG_TYPE.TEXT, text: "Hello Kimmy! I'm your Green Assistant. I can show you stats, charts, or set eco-challenges. How can I help?", isBot: true },
];

export default function ChatbotScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        // Add User Message
        const userMsg = { id: Date.now(), type: MSG_TYPE.TEXT, text: inputText, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            // 2. Prompt Engineering for JSON Output
            const systemPrompt = `
You are Green Assistant. You have 3 internal agents:
1. Analyst: if user asks for trends/data, return JSON with type='chart', label, and data (array of 6 numbers).
2. Impact: if user asks for personal stats, return JSON with type='stats', title, value, and unit.
3. Fun: if user wants a game/challenge, return JSON with type='challenge', title, and difficulty.
4. Default: otherwise, return JSON with type='text' and text='YOUR RESPONSE'.

ALWAYS return raw JSON only (no markdown code blocks).
User asked: ${inputText}
`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // If the API returns an error (400, 403, 500 etc)
                const apiErrorMessage = data.error?.message || "Unknown API Error";
                throw new Error(`API Error: ${apiErrorMessage}`);
            }

            let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!rawText) {
                throw new Error("No response content from Gemini (Check Safety Filters?)");
            }

            // Clean markdown code blocks if Gemini adds them
            rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

            let parsedContent;
            try {
                parsedContent = JSON.parse(rawText);
            } catch (e) {
                // Fallback if not valid JSON
                parsedContent = { type: 'text', text: rawText };
            }

            const botMsg = { id: Date.now() + 1, isBot: true, ...parsedContent };
            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error("Chatbot Error:", error);
            const errorText = error.message || "Connection failed.";
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'text', text: `Error: ${errorText}`, isBot: true }]);
        } finally {
            setIsTyping(false);
        }
    };

    // 3. Dynamic Renderer
    const renderMessageContent = (msg) => {
        switch (msg.type) {
            case MSG_TYPE.CHART:
                return (
                    <View>
                        <Text style={[styles.messageText, styles.botText, { marginBottom: 10 }]}>{msg.label || "Data Trend"}</Text>
                        <LineChart
                            data={{
                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                datasets: [{ data: msg.data || [0, 0, 0, 0, 0, 0] }]
                            }}
                            width={Dimensions.get("window").width * 0.65}
                            height={180}
                            chartConfig={{
                                backgroundColor: "#ffffff",
                                backgroundGradientFrom: "#ffffff",
                                backgroundGradientTo: "#ffffff",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
                                propsForDots: { r: "4", strokeWidth: "2", stroke: "#10b981" }
                            }}
                            style={{ borderRadius: 16, marginVertical: 8 }}
                        />
                    </View>
                );
            case MSG_TYPE.STATS:
                return (
                    <View style={{ alignItems: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 14, color: '#64748b' }}>{msg.title}</Text>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#10b981' }}>{msg.value}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#64748b' }}>{msg.unit}</Text>
                    </View>
                );
            case MSG_TYPE.CHALLENGE:
                return (
                    <View>
                        <Text style={[styles.messageText, styles.botText, { fontWeight: 'bold' }]}>🔥 {msg.title}</Text>
                        <Text style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>Difficulty: {msg.difficulty}</Text>
                        <Button mode="contained" compact onPress={() => Alert.alert("Challenge Accepted!", "Good luck!")} style={{ backgroundColor: '#10b981' }}>
                            Accept
                        </Button>
                    </View>
                );
            case MSG_TYPE.TEXT:
            default:
                return <Text style={[styles.messageText, msg.isBot ? styles.botText : styles.userText]}>{msg.text}</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Surface style={[styles.header, { paddingTop: insets.top + 10 }]} elevation={4}>
                <View style={styles.headerContent}>
                    <Avatar.Icon size={40} icon={Bot} style={{ backgroundColor: '#dcfce7' }} color={theme.colors.primary} />
                    <View style={{ marginLeft: 12 }}>
                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Green Assistant</Text>
                        <Text variant="bodySmall" style={{ color: '#15803d' }}>● Multi-Agent Active</Text>
                    </View>
                </View>
            </Surface>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingVertical: 20 }} ref={ref => ref?.scrollToEnd({ animated: true })}>
                            {messages.map((msg) => (
                                <View key={msg.id} style={[styles.messageBubble, msg.isBot ? styles.botBubble : styles.userBubble, { alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: msg.type === MSG_TYPE.CHART ? '85%' : '80%' }]}>
                                    {renderMessageContent(msg)}
                                </View>
                            ))}
                            {isTyping && (
                                <View style={[styles.messageBubble, styles.botBubble, { alignSelf: 'flex-start' }]}>
                                    <Text style={{ color: '#666', fontStyle: 'italic' }}>Thinking...</Text>
                                </View>
                            )}
                        </ScrollView>

                        <View style={[styles.inputContainer, { paddingBottom: Platform.OS === 'ios' ? insets.bottom + 10 : 20 }]}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={[styles.input, { marginRight: 10 }]}
                                    placeholder="Ask about trends, stats, or challenges..."
                                    value={inputText}
                                    onChangeText={setInputText}
                                    placeholderTextColor="#94a3b8"
                                />
                                <TouchableWithoutFeedback onPress={handleSend} disabled={!inputText.trim()}>
                                    <View style={[styles.sendButton, { backgroundColor: inputText.trim() ? theme.colors.primary : '#e2e8f0' }]}>
                                        <Send size={20} color={inputText.trim() ? '#fff' : '#94a3b8'} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingBottom: 15, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    headerContent: { flexDirection: 'row', alignItems: 'center' },
    chatContainer: { flex: 1, paddingHorizontal: 15 },
    messageBubble: { padding: 14, borderRadius: 20, marginBottom: 10 },
    botBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
    userBubble: { backgroundColor: '#10b981', borderBottomRightRadius: 4 },
    messageText: { fontSize: 15, lineHeight: 22 },
    botText: { color: '#334155' },
    userText: { color: '#fff' },
    inputContainer: { paddingHorizontal: 15, paddingTop: 10, backgroundColor: 'transparent' },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 30, paddingHorizontal: 15, paddingVertical: 5, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    input: { flex: 1, height: 40, fontSize: 15, color: '#333' },
    sendButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});
