import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Switch, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ChevDownIcon, ChevUpIcon, GoBackIcon, InfoIcon, TrashIcon } from './Icons';

export const AddButton = ({ onPress }) => {
    return (
        <ButtonBase onPress={onPress} style="addButton">
            <Icon name="plus" size={13} color="#6B4EFF" />
        </ButtonBase>
    );
};

export const BackButton = ({ onPress }) => {
    return (
        <ButtonBase onPress={onPress}>
            <GoBackIcon />
        </ButtonBase>
    );
};

export const PrimaryButton = ({ onPress ,children }) => {
    return (
        <View style={styles.buttonContainer}>
            <DefaultButton onPress={onPress}>
                <Text style={styles.buttonText}>{children}</Text>
            </DefaultButton>
        </View>
    );
}

export const DefaultButton = ({ children, onPress }) => {
    return (
        <ButtonBase onPress={onPress} style="defaultButton" overrideDefaultStyling>
            {children}
        </ButtonBase>
    );
};

export const UpButton = ({ onPress }) => {
    return (
        <ButtonBase onPress={onPress}>
            <ChevUpIcon />
        </ButtonBase>
    );
};

export const DownButton = ({ onPress }) => {
    return (
        <ButtonBase onPress={onPress}>
            <ChevDownIcon />
        </ButtonBase>
    );
};

export const InfoButton = ({ onPress }) => {
    return (
        <ButtonBase onPress={onPress}>
            <InfoIcon />
        </ButtonBase>
    );
};

export const DeleteButton = ({ onPress }) => {
    return (
        <ButtonBase onPress={onPress} style="deleteButton" overrideDefaultStyling>
            <TrashIcon />
        </ButtonBase>
    );
}

export const ToggleSwitch = ({ onPress, state }) => {
    const handleSwitch = () => {
        onPress && onPress(!state);
    }

    return (
        <ButtonBase onPress={onPress} overrideDefaultStyling>
            <Switch
                trackColor={{ false: '#767577', true: '#6B4EFF' }}
                thumbColor={state ? '#F9F5FF' : '#f4f3f4'}
                onValueChange={handleSwitch}
                value={state}
            />
        </ButtonBase>
    );
}

const ButtonBase = ({ onPress, children, style, overrideDefaultStyling }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={overrideDefaultStyling ? styles[style] : [styles[style], styles.default]}>
                {children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    default: {
        padding: 15,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultButton: {
        backgroundColor: '#6B4EFF',
        borderRadius: 10,
        padding: 15,
    },
    addButton: {
        backgroundColor: '#F9F5FF',
        borderRadius: 50,
    },
    deleteButton: {
        padding: 5
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