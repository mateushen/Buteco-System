import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Keyboard, Image, TouchableOpacity, Alert, Text } from 'react-native';
import colors from '../global/colors';
import Header from '../components/Header.js';
import InputCadastro from '../components/InputCadastro.js';
import Footer from '../components/Footer';
import firestore from '@react-native-firebase/firestore';
import { maskDate } from '../utils/functions';
import CurrencyInput from 'react-native-currency-input';
import { Picker } from '@react-native-picker/picker';

export default function PromissoryNotes() {
    const [nome, setNome] = useState([]);
    const [fornecedor, setFornecedor] = useState('');
    const [valor, setValor] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [dataPgto, setDataPgto] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (fornecedor && valor && dataCompra && dataPgto) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [fornecedor, valor, dataCompra, dataPgto])

    function invalid() {
        return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    function handleAdd() {
        firestore()
            .collection('promissoryNotes')
            .add({
                fornecedor,
                valor,
                dataCompra,
                dataPgto,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Nota", "Nota cadastrada com sucesso!");
                setValor('');
                setDataCompra('');
                setDataPgto('');
            })
            .catch((error) => console.log(error));
        getFind();
    }

    const getFind = () => {
        firestore()
            .collection('provider')
            .get()
            .then((querySnapshot) => {
                let d = [];
                querySnapshot.forEach((doc, index) => {
                    const provider = {
                        id: index.toString(),
                        fornecedor: doc.data().nome,
                    };
                    d.push(provider);
                });
                setNome(d);
            })
    }

    useEffect(() => {
        getFind();
    }, [])

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
    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header style={styles.container} title='CADASTRO DE NOTA PROMISSÓRIA' />
                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.form}>

                    <View>
                            <Text style={styles.input}>Fornecedor</Text>
                            <Picker style={styles.picker}
                                selectedValue={fornecedor}
                                onValueChange={(value) =>
                                    setFornecedor(value)
                                }>
                                {nome.map((v, i) => {
                                    return <Picker.Item label={v.fornecedor} value={v.fornecedor} key={i} />
                                }
                                )}
                            </Picker>
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
                            <InputCadastro placeholder="Data da Compra" icon='data' value={dataCompra} onChange={text => setDataCompra(maskDate(text))} keyboardType="number-pad" />
                        </View>
                        <View>
                            <InputCadastro placeholder="Data do Pagamento" icon='data' value={dataPgto} onChange={text => setDataPgto(maskDate(text))} keyboardType="number-pad" />
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
    picker: {
        color: colors("branco"),
    },
    input: {
        width: '80%',
        fontSize: 17,
        color: colors("branco"),
        textAlign: 'center',
    },
});