import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, SafeAreaView, TouchableOpacity, Text, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import colors from '../global/colors';
import Header from '../components/Header.js';
import InputCadastro from '../components/InputCadastro.js';
import Footer from '../components/Footer';
import { maskDate } from '../utils/functions';
import CurrencyInput from 'react-native-currency-input';

export default function Buy() {
    const [user] = useState(auth().currentUser);
    const [funcionario, setFuncionario] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (valor && data) {
            setValid(true);
            setFuncionario(user.displayName);
        } else {
            setValid(false);
        }
    }, [valor, data])

    function invalid() {
        return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function handleAdd() {
        firestore()
            .collection('buy')
            .add({
                funcionario,
                valor,
                data,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Compras", "Compra cadastrada com sucesso!");
                setValor('');
                setData('');
            })
            .catch((error) => console.log(error));
    }



    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header style={styles.container} title='CADASTRO DE COMPRAS' />
                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.form}>
                        <View>
                            <InputCadastro placeholder="Funcionário" icon='funcionario' value={user.displayName} disabled />
                        </View>

                        <View style={styles.inputArea}>
                            <Image
                                source={require('../assets/img/iconValor.png')}
                                resizeMode="contain"
                                style={styles.icon}
                            />
                            <CurrencyInput
                                placeholder="R$0,00"
                                placeholderTextColor="#fff"
                                style={{ color: "#FFF" }}
                                value={valor}
                                onChangeValue={setValor}
                                prefix="R$ "
                                delimiter="."
                                separator=","
                                precision={2}
                                minValue={0}
                                onChangeText={(formattedValue) => {
                                    console.log(formattedValue); // R$ 100,00
                                }}
                            />
                        </View>

                        <View>
                            <InputCadastro placeholder="Data" icon='data' value={data} onChange={text => setData(maskDate(text))} keyboardType="number-pad" />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={valid ? handleAdd : invalid}>
                            <Text style={styles.textButton}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {!keyboardVisible && (
                    <Footer />
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors("pretosignin"),
        alignItems: 'center',
    },
    form: {
        width: "75%",
        justifyContent: 'center',
        marginTop: 50,
    },
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
    },
    icon: {
        width: '10%',
        height: '50%',
        tintColor: colors("cinzaclaro"),
    },
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        padding: 4,
        marginBottom: 20,
        alignItems: 'center',
        marginRight: 110,
        paddingHorizontal: 20
    },
});