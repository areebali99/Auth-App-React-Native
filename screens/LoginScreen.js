import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        setError('');
        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Email format validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return;
        }

        const result = await login(email, password);
        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.contentContainer}>
                <Text style={globalStyles.title}>Welcome Back</Text>
                <Text style={globalStyles.subtitle}>Sign in to continue</Text>

                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.label}>Email</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.label}>Password</Text>
                    <View style={globalStyles.passwordContainer}>
                        <TextInput
                            style={globalStyles.passwordInput}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>

                {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
                    <Text style={globalStyles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={globalStyles.linkButton}>
                    <Text style={globalStyles.linkText}>Don't have an account? <Text style={globalStyles.linkTextBold}>Sign Up</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
