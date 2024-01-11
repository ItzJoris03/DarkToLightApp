import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { ScreenLayout } from "../components/Layouts";
import { DefaultButton, DownButton, UpButton } from '../components/Buttons';
import { addAlarm } from '../utils/Database';
import { useData } from '../utils/Language';

const AddAlarmScreen = ({ navigation }) => {
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [alarmName, setAlarmName] = useState('');
    const { getData } = useData();

    const handleHourSelection = (hour) => {
        setSelectedHour(hour);
    };

    const handleMinuteSelection = (minute) => {
        setSelectedMinute(minute);
    };

    const handleAlarmNameChange = (text) => {
        setAlarmName(text);
    };

    const handleSaveAlarm = () => {
        addAlarm(alarmName, selectedHour, selectedMinute);
        
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <ScreenLayout style={{ flex: 1, paddingTop: 10, paddingBottom: 50 }}>
                    <View style={{ gap: 50, width: '100%', alignItems: 'center' }}>
                        <View style={styles.carouselContainer}>
                            <InfiniteScrollableFlatList count={23} handleSelector={handleHourSelection} />
                            <Text style={styles.carouselName}>:</Text>
                            <InfiniteScrollableFlatList count={59} handleSelector={handleMinuteSelection} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>{getData('texts.alarmNameInputTitle')}:</Text>
                            <TextInput
                                style={styles.input}
                                value={alarmName}
                                onChangeText={handleAlarmNameChange}
                                placeholder={getData('texts.alarmNameInputPlaceholder')}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <DefaultButton onPress={handleSaveAlarm}>
                            <Text style={styles.buttonText}>{getData('buttons.saveAlarm')}</Text>
                        </DefaultButton>
                    </View>
                </ScreenLayout>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const generateArrayOfNumber = (start, end) => {
    const res = [];
    for (let i = start; i <= end; i++) {
        res.push(i);
    }
    return res;
};

const rearrangeArrayAtIndex = (array, index) => {
    if (index === 0) {
        return array; // Return the current array if the index is 0
    } else if (index > 0) {
        // Move the front to the end for positive index
        const rearrangedArray = array.slice(index).concat(array.slice(0, index));
        return rearrangedArray;
    } else {
        // Move the end to the front for negative index
        const rearrangedArray = array.slice(index).concat(array.slice(0, array.length + index));
        return rearrangedArray;
    }
}

const InfiniteScrollableFlatList = ({ count, handleSelector }) => {
    const size = 90;
    const initialData = generateArrayOfNumber(0, count);
    const initialDataLength = initialData.length;
    const [index, setIndex] = useState(initialDataLength / 2 - 1);
    const [selectedIndex, setSelectedIndex] = useState(initialDataLength / 2);
    const [data, setData] = useState(rearrangeArrayAtIndex(initialData, initialDataLength / 2));

    const renderItem = ({ item, index }) => {
        const isSelected = index === selectedIndex;

        return (
            <Text style={[scrollListStyles.item, isSelected && scrollListStyles.selectedItem, { height: size, width: size }]}>
                {item.toString().padStart(2, '0')}
            </Text>
        );
    };

    const changeValue = (i) => {
        handleSelector(data[selectedIndex + i]);
        setData(rearrangeArrayAtIndex(data, i));
    }

    const snapOffsets = data.map((_, i) => i * size); // Adjust based on item height

    return (
        <View style={scrollListStyles.container}>
            <UpButton onPress={() => changeValue(-1)} />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                initialScrollIndex={index}
                getItemLayout={(data, index) => ({
                    length: size, // Set the height of each item
                    offset: size * index,
                    index,
                })}
                scrollEnabled={false}
                snapToOffsets={snapOffsets}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                style={{ height: size * 3, width: size }}
            />
            <DownButton onPress={() => changeValue(1)} />
        </View>
    );
};

const scrollListStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        textAlign: 'center',
        fontSize: 59,
        textAlign: 'center',
        color: '#D5D7DC',
        fontFamily: 'Inter_400Regular',
    },
    selectedItem: {
        color: 'black',
        fontWeight: 'bold',
    },
});

const styles = StyleSheet.create({
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselName: {
        color: '#595D69',
        fontSize: 37,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    inputContainer: {
        width: '100%',
        gap: 10,
        marginBottom: 50,
    },
    inputTitle: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 6,
        borderColor: '#B6C2E2',
        fontFamily: 'Inter_400Regular',
    },
    buttonContainer: {
        width: '100%'
    },
    buttonText: {
        width: '100%',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
    }
});

export default AddAlarmScreen;