import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Keyboard, TouchableOpacity, Text, Alert } from 'react-native';
import colors from '../global/colors';
import Header from '../components/Header.js';
import InputCadastro from '../components/InputCadastro.js';
import Footer from '../components/Footer';
import firestore from '@react-native-firebase/firestore';
import { cnpjMask } from '../utils/functions';

export default function Provider() {
    const [cnpj, setCnpj] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (cnpj && nome && endereco) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [cnpj, nome, endereco])

    function invalid() {
        return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    function handleAdd() {
        firestore()
            .collection('provider')
            .add({
                cnpj,
                nome,
                endereco,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Fornecedor", "Fornecedor cadastrado com sucesso!");
                setCnpj('');
                setNome('');
                setEndereco('');
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
                <Header title='CADASTRO DE FORNECEDORES' />
                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.form}>
                        <View>
                            <InputCadastro placeholder="Cnpj" icon='cnpj' value={cnpj} onChange={text => setCnpj(cnpjMask(text))} keyboardType="number-pad" />
                        </View>

                        <View>
                            <InputCadastro placeholder="Nome" icon='nome' value={nome} onChange={setNome} />
                        </View>

                        <View>
                            <InputCadastro placeholder="Endereço" icon='endereco' value={endereco} onChange={setEndereco} />
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
    }
});