import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../global/colors';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RegisterLists() {
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();

    const handleProvider = () => {
        navigation.navigate("provider");
    }

    const handleInventory = () => {
        navigation.navigate("inventory");
    }

    const handleProduct = () => {
        navigation.navigate("product");
    }

    const handleNotes = () => {
        navigation.navigate("note");
    }

    const handleBuy= () => {
        navigation.navigate("buy");
    }

    const DATA = [
        {
            id: "1",
            title: "Fornecedores",
            type: "provider",
            onPress: handleProvider
        },
        {
            id: "2",
            title: "Estoque",
            type: "inventory",
            onPress: handleInventory
        },
        {
            id: "3",
            title: "Produtos",
            type: "product",
            onPress: handleProduct
        },
        {
            id: "4",
            title: "Compras",
            type: "buy",
            onPress: handleBuy
        },
        {
            id: "5",
            title: "Notas",
            type: "note",
            onPress: handleNotes
        },
    ];

    const Item = ({ item }) => (
        <Card title={item.title} type={item.type} onPress={item.onPress} />
    );

    const renderItem = ({ item }) => {

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
            />
        );
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header title="CADASTRO" />
                <View style={styles.list}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
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
        alignItems: 'center',
    },
    list: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    }
})