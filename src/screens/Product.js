import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Keyboard, TouchableOpacity, Text, Alert, Image } from 'react-native';
import colors from '../global/colors';
import Header from '../components/Header.js';
import InputCadastro from '../components/InputCadastro.js';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Footer from '../components/Footer';
import CurrencyInput from 'react-native-currency-input';

export default function Product() {
    const [user] = useState(auth().currentUser);
    const [funcionario, setFuncionario] = useState('');
    const [produto, setProduto] = useState('');
    const [preco, setPreco] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (produto && preco) {
            setValid(true);
            setFuncionario(user.displayName);
        } else {
            setValid(false);
        }
    }, [produto, preco])

    function invalid() {
        return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    function handleAdd() {
        firestore()
            .collection('product')
            .add({
                funcionario,
                produto,
                preco,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Produto", "Produto cadastrado com sucesso!");
                setProduto('');
                setPreco('');
            })
            .catch((error) => console.log(error));
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

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header style={styles.container} title='CADASTRO DE PRODUTOS' />
                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.form}>
                        <View>
                            <InputCadastro placeholder="Funcionário" icon='funcionario' value={user.displayName} disabled />
                        </View>

                        <View>
                            <InputCadastro placeholder="Produto" icon='produto' value={produto} onChange={setProduto} />
                        </View>

                        <View style={styles.inputArea}>
                            <Image
                                source={require('../assets/img/iconValor.png')}
                                resizeMode="contain"
                                style={styles.icon}
                            />
                            <CurrencyInput
                                placeholder="R$ 0,00"
                                placeholderTextColor="#fff"
                                style={{ color: "#FFF" }}
                                value={preco}
                                onChangeValue={setPreco}
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
    currencyInput: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        padding: 4,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 110,
        color: '#FFF'
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