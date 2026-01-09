import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeStyles from '../styles/homeStyles';

const HomeScreen = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headerTitle}>Home</Text>
            </View>

            <View style={homeStyles.content}>
                <Text style={homeStyles.welcomeText}>Welcome,</Text>
                <Text style={homeStyles.nameText}>{user?.name}</Text>
                <Text style={homeStyles.emailText}>{user?.email}</Text>

                <View style={homeStyles.card}>
                    <Text style={homeStyles.cardText}>You are effectively logged in!</Text>
                </View>

                <TouchableOpacity style={homeStyles.logoutButton} onPress={logout}>
                    <Text style={homeStyles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
