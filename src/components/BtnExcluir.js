import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../global/colors';

export default function Provider() {
    return (
        <View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Excluir</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors("vermelhoescuro"),
        padding: 10,
        width: '100%',
        borderRadius: 12,
        top: 15
    },
    textButton: {
        fontSize: 20,
        color: colors("branco"),
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});