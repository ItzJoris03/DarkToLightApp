import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from "../components/Layouts";
import { DeleteButton, ToggleSwitch } from "../components/Buttons";
import { dbAlarms } from '../utils/Database';
import { useData } from "../utils/Language";
import Modal from "../components/Modal";
import NoSavedAlarms from "../components/NoAlarms";

const SavedAlarmsScreen = ({ navigation }) => {
    const [alarms, setAlarms] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const { getData } = useData();

    const readData = () => {
        dbAlarms.transaction((tx) => {
            tx.executeSql('SELECT * FROM alarms;', [], (_, { rows }) => {
                setAlarms(rows._array);
            });
        });
    };

    const handleActiveToggle = (id, state) => {
        dbAlarms.transaction(
            (tx) => {
                tx.executeSql(
                    'UPDATE alarms SET active = ? WHERE id = ?;',
                    [!state ? 1 : 0, id],
                    (_, result) => {}
                );
            },
            (error) => {
                console.error('Error updating alarm:', error);
            }
        );
    }

    const handleDelete = (id) => {
        setModalVisible(true);
        setDeleteId(id);
    }

    const handleConfirmDelete = () => {
        setModalVisible(false);
        dbAlarms.transaction(
            (tx) => {
                tx.executeSql(
                    'DELETE FROM alarms WHERE id = ?;',
                    [deleteId],
                    (_, result) => {
                        readData();
                    }
                );
            },
            (error) => {
                console.error('Error deleting alarm:', error);
            }
        );
    }

    const handleOnCancel = () => {
        setDeleteId(null);
        setModalVisible(false);
    }

    useEffect(() => {
        readData();
        const unsubscribeFocus = navigation.addListener('focus', readData);

        // Cleanup the listener when the component is unmounted
        return unsubscribeFocus;
    }, []);

    return (
        <ScreenLayout style={{ paddingVertical: 50 }}>
            {/* <Text>{JSON.stringify(alarms)}</Text> */}
            {alarms.length ?
            <View style={styles.container}>
                {alarms.map((alarm, i) => {
                    return (
                        <RenderAlarm key={i} data={alarm} onDelete={handleDelete} onActivate={handleActiveToggle} />
                    );
                })}
            </View> : <NoSavedAlarms 
                    title={getData('texts.noSavedAlarmsTitle')} 
                    subtext={getData('texts.noSavedAlarmsText')} 
            />}
            <Modal 
                isVisible={isModalVisible} 
                onConfirm={handleConfirmDelete} 
                onCancel={handleOnCancel} 
                confirmText={getData('buttons.removeAlarm')}
                cancelText={getData('buttons.cancel')}
                title={getData('texts.removeAlarmTitle')}
                subtext={getData('texts.removeAlarmSubtext')}
            />
        </ScreenLayout>
    );
}

const RenderAlarm = ({ data, onDelete, onActivate }) => {
    const id = data.id;
    const [name, setName] = useState('');
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [active, setActive] = useState(1);
    // const [days, setDays] = useState(data.days || [0,1,2,3,4,5,6]);

    const handleActiveToggle = () => {
        onActivate(id, active);
        setActive(!active);
    }

    const deleteAlarmById = () => {
        onDelete(id);
    };

    useEffect(() => {
        setName(data.name);
        setHour(data.hour);
        setMinute(data.minute);
        setActive(data.active);
    }, [data]);

    return (
        <View style={styles.alarmContainer}>
            <View style={styles.alarmInfo}>
                <Text style={{ color: '#11151F', fontFamily: 'Inter_500Medium' }}>{name}</Text>
                <Text style={{ color: '#595D69', fontFamily: 'Inter_400Regular' }}>{hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}</Text>
            </View>
            <View style={styles.alarmSettings}>
                <DeleteButton onPress={deleteAlarmById} />
                <ToggleSwitch onPress={handleActiveToggle} state={active ? true : false} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        gap: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B6C2E2',
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alarmContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    alarmInfo: {
        flex: 1,
        width: 'fit',
        textAlign: 'right',
        justifyContent: 'center',
    },
    alarmSettings: {
        flexDirection: 'row',
        justifyContent: 'end',
        alignItems: 'center',
    }
});

export default SavedAlarmsScreen;