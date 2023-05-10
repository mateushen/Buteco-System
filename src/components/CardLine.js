import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../global/colors';

export default function CardLine({ item1, item2, item3, item4 }) {

    const [lenghtWidth, setLenghtWidth] = useState('');

    useEffect(() => {
        if (item1 && item2 && item3 && item4) {
            setLenghtWidth('24.2%')
        } else if (item1 && item2) {
            setLenghtWidth('48.5%')
        } else if (item1 && item2 && item3) {
            setLenghtWidth('32.3%')
        }
    }, [])

    return (
        <TouchableOpacity style={styles.container}>
            {lenghtWidth ? (
            <View style={styles.cards}>
                {item1 && (
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.item, { width: lenghtWidth }]}>{item1}</Text>
                )}
                {item2 && (
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.item, { width: lenghtWidth }]}>{item2}</Text>
                )}
                {item3 && (
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.item, { width: lenghtWidth }]}>{item3}</Text>
                )}
                {item4 && (
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.item, { width: lenghtWidth }]}>{item4}</Text>
                )}
            </View>
            ) : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
    },
    cards: {
        height: 35,
        width: '97%',
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors('cinzaclaro'),
        borderRadius: 5,
    },
    item: {
        fontSize: 15,
        textAlign: 'center',
        overflow: 'hidden',
        flexShrink: 1,
        flexWrap: 'nowrap',
        flexGrow: 1,
    },
})