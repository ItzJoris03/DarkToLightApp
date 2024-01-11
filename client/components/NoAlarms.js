import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NoSaveIllustration } from "./Icons";

const NoSavedAlarms = ({ title, subtext }) => {
    return (
        <View style={styles.noSavedAlarms}>
            <NoSaveIllustration />
            <Text style={[styles.noSavesTitle, styles.textDefault]}>{title}</Text>
            <Text style={styles.textDefault}>{subtext}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    noSavedAlarms: {
        flex: 1,
        alignItems: 'center',
    },
    noSavesTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#090A0A',
    },
    textDefault: {
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        paddingVertical: 5,
    }
});

export default NoSavedAlarms;