# User Authentication App

A React Native application demonstrating authentication flows using React Context API, React Navigation, and AsyncStorage.

## Features

- **Authentication Flow**: Login and Signup screens with validation.
- **State Management**: Global auth state via Context API (`AuthContext`).
- **Persistence**: User session persists across app restarts using `AsyncStorage`.
- **Navigation**: Conditional routing restricts access to the Home screen until logged in.
- **UI/UX**: Clean design, responsive layout, and password visibility toggles.
- **Mock Backend**: Local user registration stored in `AsyncStorage`.

## Prerequisites

- Node.js
- npm or yarn
- Expo CLI (optional, but recommended)

## Setup Instructions

1.  **Navigate to the project directory**:
    ```bash
    cd AuthApp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    npx expo install
    ```

3.  **Run the application**:
    - For Android:
        ```bash
        npm run android
        ```
    - For iOS (macOS only):
        ```bash
        npm run ios
        ```
    - For Web:
        ```bash
        npm run web
        ```

## Project Structure

- **App.js**: Main entry point, handles navigation logic based on auth state.
- **context/AuthContext.js**: Manages user state, login, signup, and logout functions.
- **screens/**:
    - `LoginScreen.js`: Login form with validation.
    - `SignupScreen.js`: Registration form with validation.
    - `HomeScreen.js`: Protected route displaying user info.

## Usage

1.  **Signup**: Create a new account with Name, Email, and Password.
    - Password must be at least 6 characters.
2.  **Login**: Use your credentials to sign in.
3.  **Home**: View your profile details.
4.  **Logout**: Tap the logout button to clear the session.

## Notes

- This app uses a local "mock" database in AsyncStorage to store registered users (`users_db`). In a real app, this would be replaced by an API call.

## Troubleshooting

### iOS "No usable data found" Error
If you see this error when scanning the QR code:
1.  **Network Connection**: Ensure your computer and iPhone are on the exact same Wi-Fi network.
2.  **Use Tunnel**: If your network blocks interactions, try running with tunnel:
    ```bash
    npx expo start --tunnel
    ```
3.  **Expo Go Version**: Ensure your Expo Go app is updated to the latest version via the App Store.
4.  **Clear Cache**:
    ```bash
    npx expo start -c
    ```

