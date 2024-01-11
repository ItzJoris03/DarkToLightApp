import { openDatabase } from 'expo-sqlite';
import APP_DATA from '../app.json';

// Alarms database
export const dbAlarms = openDatabase(APP_DATA.db.alarms);
export const addAlarm = (alarmName, selectedHour, selectedMinute) => {
    dbAlarms.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO alarms (name, hour, minute, active, days) VALUES (?, ?, ?, ?, ?);',
            [alarmName, selectedHour, selectedMinute, 1, JSON.stringify([0, 1, 2, 3, 4, 5, 6])],
            (_, result) => {
                // logic to be implemented when succes
            }
        );
    });
}
export const readData = (saveData, ...funcs) => {
    dbAlarms.transaction((tx) => {
        tx.executeSql('SELECT * FROM alarms;', [], (_, { rows }) => {
            saveData && saveData(rows._array);
            funcs && funcs.forEach((func) => typeof func === 'function' && func());
        });
    });
};

// Connections database
export const dbConnections = openDatabase(APP_DATA.db.connections);
export const addConnection = (deviceName, deviceAddress) => {
    dbConnections.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO connections (deviceName, deviceAddress) VALUES (?, ?)',
            [deviceName, deviceAddress],
            (_, result) => {
                console.log('Connection added successfully');
            },
            (_, error) => {
                console.error('Error adding connection:', error);
            }
        );
    });
};

export const deleteConnection = (id) => {
    dbConnections.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM connections WHERE id = ?',
            [id],
            (_, result) => {
                console.log('Connection deleted successfully');
            },
            (_, error) => {
                console.error('Error deleting connection:', error);
            }
        );
    });
};

export const getAllConnections = (callback) => {
    dbConnections.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM connections',
            [],
            (_, result) => {
                const connections = [];
                for (let i = 0; i < result.rows.length; i++) {
                    connections.push(result.rows.item(i));
                }
                callback(connections);
            },
            (_, error) => {
                console.error('Error retrieving connections:', error);
            }
        );
    });
};

// Default function for both databases
export const initDatabases = () => {
    dbAlarms.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, hour INTEGER, minute INTEGER, active INTEGER, days TEXT);'
        );
    });
    dbConnections.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS connections (id INTEGER PRIMARY KEY AUTOINCREMENT, deviceName TEXT, deviceAddress TEXT)'
        );
    });
}