import { View, StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../global/colors';
import Footer from '../components/Footer';
import BtnExcluir from '../components/BtnExcluir';
import Header from '../components/Header';
import CardLine from '../components/CardLine';
import firestore from '@react-native-firebase/firestore';

export default function ListProducts() {
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    const renderItem = ({ item }) => (
        <Item produto={item.produto} preco={item.preco} />
    );

    const Item = ({ produto, preco }) => (
        <CardLine item1={produto} item2={preco} />
    );

    const getProduct = () => {
        firestore()
        .collection('product')
        .get()
        .then((querySnapshot) => {
            let d = [];
            querySnapshot.forEach((doc, index) => {
                //console.log(doc.description, " => ", doc.data());
                const product = {
                    id: index.toString(),
                    produto: doc.data().produto,
                    preco: doc.data().preco
                };
                d.push(product);
            });
            setData(d);
        })
        .catch((e) => {
            console.log('Erro: ' + e);
        });
    }

    useEffect(() => {
        getProduct();
    }, []);


    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header title="RELATÓRIO DE PRODUTOS" />
                <View style={styles.table}>
                    <View style={styles.inLine}>
                        <View style={styles.column1}>
                            <Text style={styles.header}>Produto</Text>
                        </View>

                        <View style={styles.column2}>
                            <Text style={styles.header}>Preço</Text>
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
        width: '95%',
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
        width: '48.5%',
        marginLeft: 50,
    },
    column2: {
        width: '48.5%',
        marginLeft: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors("branco"),
    },
    list:{
        height: '75%',
    }
})