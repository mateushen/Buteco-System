import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import colors from '../global/colors';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {

    const navigation = useNavigation();

    function handleHome() {
        navigation.navigate("home");
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.tab}>
                <TouchableOpacity onPress={handleBack}>
                    <Image
                        source={require('../assets/img/iconBack.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHome}>
                    <Image
                        source={require('../assets/img/iconHome.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: colors("cinzaescuro"),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '8%',
        bottom: 0,
        position: 'absolute',
        paddingTop: 7,
        paddingRight: 170,
        paddingLeft: 20,
    },
    icon: {
        width: 50,
        height: 50,
        tintColor: colors("cinzaclaro"),
    }
})