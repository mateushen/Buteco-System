import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Keyboard, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../global/colors';
import Header from '../components/Header.js';
import InputCadastro from '../components/InputCadastro.js';
import Footer from '../components/Footer';
import CurrencyInput from 'react-native-currency-input';
import firestore from '@react-native-firebase/firestore';

export default function Inventory() {
    const [nome, setNome] = useState([]);
    const [fornecedor, setFornecedor] = useState('');
    const [produto, setProduto] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (fornecedor && produto && preco && quantidade) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [fornecedor, produto, preco, quantidade])

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
            .collection('inventory')
            .add({
                fornecedor,
                produto,
                preco,
                quantidade,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Estoque", "Estoque cadastrado com sucesso!");
                setProduto('');
                setPreco('');
                setQuantidade('');
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

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header style={styles.container} title='CADASTRO DE ESTOQUE' />
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
                                placeholder="R$0,00"
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
                        <View>
                            <InputCadastro placeholder="Quantidade" icon='quantidade' value={quantidade} onChange={setQuantidade} keyboardType="number-pad" />
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
    input: {
        width: '80%',
        fontSize: 17,
        color: colors("branco"),
        textAlign: 'center',
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
    }

});