import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
                    <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Login</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 24,
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 12,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
        color: '#666',
    },
    linkTextBold: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default SignupScreen;
