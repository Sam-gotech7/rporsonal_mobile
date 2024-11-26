import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';


type CustomButtonProps = {
    title: string;
    handlePress: () => void;
    containerStyles?: ViewStyle | ViewStyle[];
    textStyles?: TextStyle | TextStyle[];
    isLoading: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    handlePress,
    containerStyles = {},
    textStyles = {},
    isLoading
}) => {
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={handlePress}
            activeOpacity={0.7}
            style={[
                styles.button,
                containerStyles,
                isLoading ? styles.buttonDisabled : {}
            ]}
        >
            <Text style={[styles.text, textStyles]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        minHeight: 62,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4ECDC4', 
        borderRadius: 10,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '500',
    }
});

export default CustomButton;
