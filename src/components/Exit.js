import React from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../global/colors';

export default function Exit() {
    function handleLogout() {
        auth()
            .signOut()
            .catch((error) => {
                console.log('Error signing out: ', error);
                return Alert.alert('Erro', 'Não foi possível sair.');
            });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image
                    source={require('../assets/img/SignOut.png')}
                    resizeMode="contain"
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        margin: 20,
        borderRadius: 12,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
    },
    icon: {
        width: 50,
        height: 50,
        justifyContent: 'flex-end',
        tintColor: colors('cinzaclaro')
    }
})