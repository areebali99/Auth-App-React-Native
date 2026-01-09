import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 4,
    },
    nameText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emailText: {
        fontSize: 16,
        color: '#888',
        marginBottom: 40,
    },
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: '#444',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 24,
        shadowColor: '#FF3B30',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default homeStyles;
