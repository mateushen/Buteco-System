import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../global/colors';

export default function Card({ title, type, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.cards}>
                {type === 'provider' && (
                    <Image style={styles.icon}
                        source={require('../assets/img/iconCnpj.png')}
                        resizeMode="contain"
                    />
                )}
                {type === 'sale' && (
                    <Image style={styles.icon}
                        source={require('../assets/img/iconValor.png')}
                        resizeMode="contain"
                    />
                )}
                {type === 'product' && (
                    <Image style={styles.icon}
                        source={require('../assets/img/iconProduto.png')}
                        resizeMode="contain"
                    />
                )}
                {type === 'inventory' && (
                    <Image style={styles.icon}
                        source={require('../assets/img/iconEstoque.png')}
                        resizeMode="contain"
                    />
                )}
                {type === 'note' && (
                    <Image style={styles.icon}
                        source={require('../assets/img/iconNota.png')}
                        resizeMode="contain"
                    />
                )}
                {type === 'buy' && (
                    <Image style={styles.icon}
                        source={require('../assets/img/iconCompra.png')}
                        resizeMode="contain"
                    />
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '90%',
        margin: 15
    },
    cards: {
        height: 80,
        width: 250,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors('branco'),
        borderRadius: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: colors('cinzaescuro'),
        marginLeft: 10,
        marginRight: 30,
    }
})