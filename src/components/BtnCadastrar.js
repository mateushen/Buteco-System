import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../global/colors';

export default function BtnCadastrar({ onPress, title }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors("verdeclaro"),
        width: 200,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 20,
        color: colors("branco"),
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});