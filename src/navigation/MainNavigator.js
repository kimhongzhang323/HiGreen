import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';
import { Home, User as UserIcon, MessageSquare, Newspaper, Bus } from 'lucide-react-native';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import WeeklyImpactScreen from '../screens/dashboard/WeeklyImpactScreen';
import ChatbotScreen from '../screens/chatbot/ChatbotScreen';

import ReportIssueScreen from '../screens/reports/ReportIssueScreen';
import MyReportsScreen from '../screens/reports/MyReportsScreen';
import AirQualityScreen from '../screens/environment/AirQualityScreen';
import TransportScreen from '../screens/transport/TransportScreen';
import HappinessSurveyScreen from '../screens/happiness/HappinessSurveyScreen';
import SOSScreen from '../screens/sos/SOSScreen';
import TaskCompletionScreen from '../screens/gamification/TaskCompletionScreen';
import GreenMapScreen from '../screens/environment/GreenMapScreen';

import ProfileScreen from '../screens/user/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import RewardsScreen from '../screens/profile/RewardsScreen';

import PaymentMethodsScreen from '../screens/profile/PaymentMethodsScreen';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminReportsScreen from '../screens/admin/AdminReportsScreen';
import AdminContentScreen from '../screens/admin/AdminContentScreen';
import AdminTransportScreen from '../screens/admin/AdminTransportScreen';

import LegalScreen from '../screens/user/LegalScreen';

import { AuthProvider, useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') return <Home size={size} color={color} />;
                    if (route.name === 'Chatbot') return <MessageSquare size={size} color={color} />;
                    if (route.name === 'Profile') return <UserIcon size={size} color={color} />;
                    return <Home size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { paddingBottom: 5, height: 60 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{ tabBarLabel: 'Assistant' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function AdminNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Dashboard') return <Home size={size} color={color} />;
                    if (route.name === 'Users') return <UserIcon size={size} color={color} />;
                    if (route.name === 'Reports') return <MessageSquare size={size} color={color} />;
                    if (route.name === 'Content') return <Newspaper size={size} color={color} />;
                    if (route.name === 'Transport') return <Bus size={size} color={color} />;
                    return <Home size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { paddingBottom: 5, height: 60 },
            })}
        >
            <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
            <Tab.Screen name="Content" component={AdminContentScreen} options={{ tabBarLabel: 'News/Events' }} />
            <Tab.Screen name="Transport" component={AdminTransportScreen} options={{ tabBarLabel: 'Analytics' }} />
            <Tab.Screen name="Users" component={AdminUsersScreen} />
            <Tab.Screen name="Reports" component={AdminReportsScreen} />
        </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

function AppNavigatorContent() {
    const { isAuthenticated, user } = useAuth();

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAuthenticated ? (
                        user?.role === 'admin' ? (
                            <>
                                <Stack.Screen name="AdminMain" component={AdminNavigator} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="Main" component={AppTabs} />
                                <Stack.Screen name="ReportIssue" component={ReportIssueScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="MyReports" component={MyReportsScreen} options={{ headerShown: true, title: 'My Reports' }} />
                                <Stack.Screen name="AirQuality" component={AirQualityScreen} options={{ headerShown: true, title: 'Air Quality' }} />
                                <Stack.Screen name="Transport" component={TransportScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="Happiness" component={HappinessSurveyScreen} options={{ headerShown: true, title: 'Happiness Survey' }} />
                                <Stack.Screen name="SOS" component={SOSScreen} options={{ headerShown: true, title: 'Emergency SOS', headerStyle: { backgroundColor: '#ef4444' }, headerTintColor: '#fff' }} />

                                {/* Dashboard Sub-screens */}
                                <Stack.Screen name="WeeklyImpact" component={WeeklyImpactScreen} options={{ headerShown: true, title: 'Weekly Impact' }} />

                                {/* New Screens */}
                                <Stack.Screen name="TaskCompletion" component={TaskCompletionScreen} />
                                <Stack.Screen name="GreenMap" component={GreenMapScreen} />

                                {/* Profile Sub-screens */}
                                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Edit Profile' }} />
                                <Stack.Screen name="Rewards" component={RewardsScreen} options={{ headerShown: true, title: 'Rewards', headerStyle: { backgroundColor: theme.colors.primary }, headerTintColor: '#fff' }} />
                                <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ headerShown: true, title: 'Payment Methods' }} />
                                <Stack.Screen name="Legal" component={LegalScreen} options={{ headerShown: false }} />
                            </>
                        )
                    ) : (
                        <Stack.Screen name="Auth" component={AuthStack} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default function AppNavigator() {
    return (
        <AuthProvider>
            <AppNavigatorContent />
        </AuthProvider>
    );
}
