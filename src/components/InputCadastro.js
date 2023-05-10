import React, { useState } from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView, Platform, View, Image } from 'react-native';

import colors from '../global/colors';

export default function InputCadastro({ placeholder, icon = null, onChange, keyboardType, value, disabled }) {

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.inputArea}>
                {icon === 'cnpj' && (
                    <Image
                        source={require('../assets/img/iconCnpj.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                {icon === 'nome' && (
                    <Image
                        source={require('../assets/img/iconNome.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                {icon === 'endereco' && (
                    <Image
                        source={require('../assets/img/iconLocal.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                {icon === 'funcionario' && (
                    <Image
                        source={require('../assets/img/iconFuncionario.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                {icon === 'valor' && (
                    <Image
                        source={require('../assets/img/iconValor.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                {icon === 'data' && (
                    <Image
                        source={require('../assets/img/iconData.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                {icon === 'produto' && (
                    <Image
                        source={require('../assets/img/iconProduto.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                {icon === 'quantidade' && (
                    <Image
                        source={require('../assets/img/iconQuantidade.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor={colors("cinzaclaro")}
                    style={styles.input}
                    editable={disabled ? false : true}
                    onChangeText={onChange}
                    keyboardType={keyboardType || 'default'}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        padding: 4,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 110,
    },
    input: {
        width: '80%',
        fontSize: 17,
        color: colors("branco"),
    },
    icon: {
        width: '10%',
        height: '50%',
        tintColor: colors("cinzaclaro"),
    },
});