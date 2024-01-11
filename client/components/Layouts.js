import React from "react";
import { StyleSheet, View } from "react-native";

export const ScreenLayout = ({ children, style }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 50,
            paddingVertical: 100,
        },
    });

    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};