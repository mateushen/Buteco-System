import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import colors from '../global/colors';

export default function Header({ title }) {

    return (
        <View style={styles.container}>
            <Text style={styles.textLabel}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        backgroundColor: colors('preto'),
        height: 80,
        margin: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    textLabel: {
        color: colors('branco'),
        textAlign: 'center',
        fontSize: 20
    }
})