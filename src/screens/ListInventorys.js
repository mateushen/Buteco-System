import { View, StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../global/colors';
import Footer from '../components/Footer';
import BtnExcluir from '../components/BtnExcluir';
import Header from '../components/Header';
import CardLine from '../components/CardLine';
import firestore from '@react-native-firebase/firestore';

export default function ListInventorys() {
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    const renderItem = ({ item }) => (
        <Item fornecedor={item.fornecedor} produto={item.produto} preco={item.preco} quantidade={item.quantidade} />
    );

    const Item = ({ fornecedor, produto, preco, quantidade }) => (
        <CardLine item1={fornecedor} item2={produto} item3={preco} item4={quantidade}/>
    );

    const getInventory = () => {
        firestore()
            .collection('inventory')
            .get()
            .then((querySnapshot) => {
                let d = [];
                querySnapshot.forEach((doc, index) => {
                    const inventory = {
                        id: index.toString(),
                        fornecedor: doc.data().fornecedor,
                        produto: doc.data().produto,
                        preco: doc.data().preco,
                        quantidade: doc.data().quantidade
                    };
                    d.push(inventory);
                });
                setData(d);
            })
            .catch((e) => {
                console.log('Erro: ' + e);
            });
    }

    useEffect(() => {
        getInventory();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header title="RELATÓRIO DE ESTOQUE" />
                <View style={styles.table}>
                    <View style={styles.inLine}>
                        <View style={styles.column1}>
                            <Text style={styles.header}>Fornecedor</Text>
                        </View>

                        <View style={styles.column2}>
                            <Text style={styles.header}>Produto</Text>
                        </View>

                        <View style={styles.column3}>
                            <Text style={styles.header}>Preço</Text>
                        </View>

                        <View style={styles.column4}>
                            <Text style={styles.header}>QTD</Text>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.inLine}>
                    <FlatList style={styles.list} 
                        showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={styles.position}>
                    <BtnExcluir />
                </View>
            </SafeAreaView>
            <Footer />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '92%',
        backgroundColor: colors("pretosignin"),
        alignItems: 'center'
    },
    position: {
        display: 'flex',
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute',
        justifyContent: 'space-evenly',
        width: '75%',
        marginBottom: 30
    },
    table: {
        height: '60%',
        width: '90%',
        marginTop: 20,
        backgroundColor: colors("preto"),
        borderRadius: 10,
    },
    inLine: {
        flexDirection: 'row',
        width: '100%',
    },
    line: {
        width: '100%',
        borderBottomWidth: 1,
    },
    column1: {
        width: '30%',
        marginLeft: 5,
    },
    column2: {
        width: '25%',
    },
    column3: {
        width: '22%',
    },
    column4: {
        width: '15%',
    },
    header: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors("branco"),
    },
    list:{
        height: '75%',
    }
})