import React, { useState } from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView, Platform, View, TouchableOpacity, Image } from 'react-native';
import { User, Eye, EyeSlash, Key } from 'phosphor-react-native';

import colors from '../global/colors';

export default function Input({ placeholder, security = false, keyboardType, autoCorrect = true, returnKeyType = "next", icon = null, onChange, value }) {
    const [hidePass, setHidePass] = useState(true);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.inputArea}>
                {icon === 'user' && (
                    <User color={colors('branco')} size={20} />
                )}
                {icon === 'pass' && (
                    <Key color={colors('branco')} size={20} />
                )}
                {icon === 'cnpj' && (
                    <Image
                        source={require('../assets/img/iconCnpj.png')}
                        resizeMode="contain"
                        style={{ width: '80%', height: '60%' }}
                    />
                )}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors("cinzaclaro")}
                    secureTextEntry={hidePass}
                    keyboardType={keyboardType}
                    autoCorrect={autoCorrect}
                    returnKeyType={returnKeyType}
                    onChangeText={onChange}
                    style={styles.input}
                    value={value}
                />
                {security && (
                    <TouchableOpacity style={styles.securityIcon} onPress={() => setHidePass(!hidePass)}>
                        {hidePass ? (
                            <Eye color={colors('branco')} size={20} />
                        ) : (
                            <EyeSlash color={colors('branco')} size={20} />
                        )}
                    </TouchableOpacity>
                )}
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
        padding: 4,
        marginBottom: 20,
        alignItems: 'center'
    },
    input: {
        width: '80%',
        fontSize: 16,
        paddingHorizontal: 10,
        color: colors("branco"),
    },
    securityIcon: {
        width: '20%',
        height: 40,
        justifyContent: 'center',
    }
});