import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from "../components/Layouts";

const SettingsScreen = () => {
    return (
        <ScreenLayout>
            <Text>Settings</Text>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingsScreen;