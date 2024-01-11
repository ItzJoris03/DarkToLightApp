import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from "../components/Buttons";
import { ScreenLayout } from "../components/Layouts"
import { useData } from "../utils/Language";
import { readData } from "../utils/Database";
import { useFocusEffect } from '@react-navigation/native';
import { Circle, Svg } from "react-native-svg";
import NoSavedAlarms from "../components/NoAlarms";
// import BleManager from 'react-native-ble-plx';

const HomeScreen = () => {
    const { getData } = useData();
    const [alarms, setAlarms] = useState([]);
    const [visibleAlarm, setVisibleAlarm] = useState([]);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());
    const [currentDay, setCurrentDay] = useState(new Date().getDay());

    useFocusEffect(
        useCallback(() => {
            readData(setAlarms);
        }, [])
    );

    useEffect(() => {
        getNextActiveAlarm();
    }, [alarms]);

    const getAlarmsByDay = (day) => {
        let activeAlarms = [];
        alarms.map((alarm) => {
            if (alarm.active && alarm.days.includes(day)) {
                activeAlarms.push(alarm);
            }
        });
        return activeAlarms;
    }

    const getNextActiveAlarm = () => {
        let activeAlarms = [];
        let i = 0;
        let day = currentDay
        do {
            activeAlarms = getAlarmsByDay(day);
            i++;
            day = day === 6 ? 0 : day + 1;
        } while (!activeAlarms || i < 7);

        activeAlarms.sort((a, b) => {
            const timeA = a.hour * 60 + a.minute;
            const timeB = b.hour * 60 + b.minute;
            return timeA - timeB;
        });

        setVisibleAlarm(activeAlarms[0]);
    }

    const formatTime = (hour, minute) => {
        const checkType = () => typeof hour === 'number' && typeof minute === 'number';
        return checkType() ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}` : '';
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentHour(now.getHours());
            setCurrentMinute(now.getMinutes());
            setCurrentDay(now.getDay());
        }, 1000); // Update every second

        // Cleanup
        return () => clearInterval(intervalId);
    }, []);

    return true ? (
        <ScreenLayout style={{ paddingVertical: 50 }}>
            {visibleAlarm ? <>
                <View>
                    <Text style={[styles.textDefault, styles.time]}>{formatTime(currentHour, currentMinute)}</Text>
                    <View style={styles.alarmInfo}>
                        <Text style={[styles.textDefault, { fontSize: 12, color: '#393E4F' }]}>{getData('texts.alarmInfo')}</Text>
                        <Text style={[styles.textDefault, { fontSize: 16 }]}>{formatTime(visibleAlarm.hour, visibleAlarm.minute)}</Text>
                    </View>
                    <AlarmProgressCircle
                        currentHour={currentHour}
                        currentMinute={currentMinute}
                        alarmHour={visibleAlarm.hour}
                        alarmMinute={visibleAlarm.minute}
                    />
                    {/* <Text>{JSON.stringify(visibleAlarm)}</Text> */}
                </View>
                <PrimaryButton>{getData('buttons.stopAlarm')}</PrimaryButton>
            </> : <NoSavedAlarms
                title={alarms.length > 0 ? getData('texts.noActiveAlarmsTitle') : getData('texts.noSavedAlarmsTitle')}
                subtext={alarms.length > 0 ? getData('texts.noActiveAlarmsSubtext') : getData('texts.noSavedAlarmsText')}
            />}
        </ScreenLayout>
    ) : (
        <ScreenLayout>
            {/* <BluetoothComponent/> */}
        </ScreenLayout>
    );
}

const AlarmProgressCircle = ({ currentHour, currentMinute, alarmHour, alarmMinute }) => {
    const [percentage, setPercentage] = useState(0);
    const [circleLength, setCircleLength] = useState(0);

    useEffect(() => {
        const currentTimeInMinutes = currentHour * 60 + currentMinute;
        const alarmTimeInMinutes = alarmHour * 60 + alarmMinute;

        const diffInMinutes = alarmTimeInMinutes - currentTimeInMinutes;
        let percentage = (diffInMinutes / (24 * 60)) * 100; // Assuming a 24-hour day

        if (percentage < 0) percentage *= -1;

        setPercentage(percentage);
    }, [currentHour, currentMinute, alarmHour, alarmMinute]);

    useEffect(() => {
        const length = Math.PI * 2 * 120; // Circumference of the outer circle
        setCircleLength(length);
        // setPercentage(99);
    }, []);

    return (
        <View style={styles.alarmProgresCircle}>
            <Svg height="315" width="315" rotation={-90}>
                {/* Outer Circle */}
                <Circle cx="157" cy="157" r="120" stroke="#D5D7DC" strokeWidth={8} fill="transparent" />

                {/* Inner Circle (Percentage Circle) */}
                <Circle
                    cx="157"
                    cy="157"
                    r="120"

                    stroke="#6B4EFF"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${circleLength * (percentage / 100)} ${circleLength}`}
                />
            </Svg>
            {/* <Text style={styles.percentageText}>{Math.round(percentage)}%</Text> */}
        </View>
    );
};


const styles = StyleSheet.create({
    time: {
        fontSize: 54,
        textAlign: 'center'
    },
    alarmInfo: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDefault: {
        fontFamily: 'Inter_400Regular'
    },
    alarmProgresCircle: {
        position: 'absolute',
        top: '-100%',
        alignSelf: 'center',
    }
});

// const BluetoothComponent = () => {
//     const [devices, setDevices] = useState([]);
//     const [connectedDevice, setConnectedDevice] = useState(null);

//     useEffect(() => {
//         const subscription = BleManager.startDeviceScan(null, null, (error, device) => {
//             if (error) {
//                 console.error('Error scanning for devices:', error);
//                 return;
//             }

//             if (device.name) {
//                 setDevices((prevDevices) => {
//                     if (!prevDevices.find((prevDevice) => prevDevice.id === device.id)) {
//                         return [...prevDevices, device];
//                     }
//                     return prevDevices;
//                 });
//             }
//         });

//         return () => {
//             BleManager.stopDeviceScan();
//             subscription.remove();
//         };
//     }, []);

//     const connectToDevice = async (deviceId) => {
//         try {
//             await BleManager.connectToDevice(deviceId);
//             const connectedDevice = await BleManager.discoverAllServicesAndCharacteristicsForDevice(deviceId);
//             setConnectedDevice(connectedDevice);
//         } catch (error) {
//             console.error('Error connecting to device:', error);
//         }
//     };

//     return (
//         <View>
//             <Text>Bluetooth Devices:</Text>
//             {devices.map((device) => (
//                 <View key={device.id}>
//                     <Text>{device.name}</Text>
//                     <Button title="Connect" onPress={() => connectToDevice(device.id)} />
//                 </View>
//             ))}
//             {connectedDevice && (
//                 <View>
//                     <Text>Connected Device: {connectedDevice.name}</Text>
//                 </View>
//             )}
//         </View>
//     );
// };


export default HomeScreen;