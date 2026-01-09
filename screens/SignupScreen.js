import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../styles/globalStyles';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const { signup } = useContext(AuthContext);

    const handleSignup = async () => {
        setError('');

        // Validation
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const result = await signup(name, email, password);
        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.contentContainer}>
                <Text style={globalStyles.title}>Create Account</Text>
                <Text style={globalStyles.subtitle}>Sign up to get started</Text>

                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.label}>Name</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

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
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666', marginTop: 4, marginLeft: 4 }}>
                        * Password must be at least 6 characters long
                    </Text>
                </View>

                {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={globalStyles.button} onPress={handleSignup}>
                    <Text style={globalStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={globalStyles.linkButton}>
                    <Text style={globalStyles.linkText}>Already have an account? <Text style={globalStyles.linkTextBold}>Login</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignupScreen;
