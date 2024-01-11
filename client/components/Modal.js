import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { PrimaryButton } from './Buttons';

const Modal = ({ isVisible, onConfirm, onCancel, confirmText, cancelText, title, subtext }) => {
    const [isModalVisible, setModalVisible] = useState(isVisible);
    
    // Animation values
    const translateY = useRef(new Animated.Value(300)).current;

    const toggleModal = () => {
        if (isVisible) {
            // Show modal
            setModalVisible(true);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            // Hide modal
            Animated.timing(translateY, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setModalVisible(false));
        }
    };

    const handleConfirm = () => {
        onConfirm();
    };

    useEffect(() => {
        toggleModal();
    }, [isVisible]);

    return isModalVisible && (
        <Animated.View
            style={[styles.modalContainer, { transform: [{ translateY }] }]}
        >
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{subtext}</Text>

            {/* Buttons for confirmation */}
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirm}>{confirmText}</PrimaryButton>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={styles.cancelButton}>{cancelText}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        width: 'full',
        textAlign: 'center',
    },
    modalTitle: {
        marginBottom: 10,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        fontWeight: 'bold'
    },
    modalText: {
        marginBottom: 30,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular'
    },
    buttonContainer: {
        alignItems: 'center',
        gap: 20,
    },
    cancelButton: {
        color: '#202325',
        fontSize: 16,
        fontFamily: 'Inter_500Medium'
    },
});

export default Modal;
