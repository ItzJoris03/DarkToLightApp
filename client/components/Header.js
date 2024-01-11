import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { AddButton, BackButton, InfoButton } from "./Buttons";
import { useData } from "../utils/Language";

const Header = ({ navigation, route }) => {
    const screenName = route.name;
    const { getData } = useData();

    return screenName === 'HomeScreen' ? (
        <View style={styles.header}>
            <AddButton onPress={() => { navigation.navigate('AddAlarmScreen') }} />
            <InfoButton onPress={() => { navigation.navigate('InfoScreen') }} />
        </View>
    ) : (
        <View style={styles.header}>
            <BackButton onPress={() => { navigation.goBack() }} />
            <Text style={styles.headerTitle}>
                {
                    screenName === 'AddAlarmScreen' ? getData('screens.addAlarm') : getData('screens.information')
                }
            </Text>
            <View style={{ padding: 17 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : StatusBar.currentHeight + 50,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 70,
    },
    headerTitle: {
        flex: 1,
        padding: 10, 
        textAlign: 'center',
    }
});

export default Header;