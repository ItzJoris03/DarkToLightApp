import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from "../components/Layouts";
import { LogoIcon } from "../components/Icons";
import AppInfo from '../app.json';
import { useData } from "../utils/Language";

const InfoScreen = () => {
    const { getData } = useData();

    return (
        <ScreenLayout>
            <LogoIcon />
            <View style={styles.infoContainer}>
                <Text style={[styles.textStyleDefault, { fontSize: 12, color: '#646464', }]}>{getData('info.version')}: v{AppInfo.expo.version}</Text>
                <Text style={[styles.textStyleDefault, { fontSize: 12, color: '#646464', }]}>{getData('info.created_by')}</Text>
                <Text style={[styles.textStyle, styles.textStyleDefault]}>Joris Hummel</Text>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        marginTop: 10,
        color: '#090A0A',
        fontSize: 16
    },
    textStyleDefault: {
        fontFamily: 'Inter_400Regular',
    }
});

export default InfoScreen;