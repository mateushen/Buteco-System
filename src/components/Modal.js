import { useState } from 'react';
import { Modal, StyleSheet, View, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import colors from '../global/colors';
import { StatusBar } from 'expo-status-bar';
import InputCadastro from './InputCadastro';
import BtnCadastrar from './BtnCadastrar';

export function ModalUser({ visible, onClose }) {
    const [user] = useState(auth().currentUser);
    const [name, setName] = useState('');
    const [ready, setReady] = useState(false);

    async function handleUpdate() {
        await user.updateProfile({
            displayName: name
        }).then(() => {
            Alert.alert("Usuário", "Usuário atualizado com sucesso!");
            console.log(user);
            onClose;
        }).catch((error) => {
            console.log('error', error);
        });
    }

    return (
        <Modal visible={!user.displayName ? visible : false} animationType="slide" >
            <View style={styles.container}>
                <Text style={styles.title}>Atualização de Perfil</Text>
                <View style={styles.input}>
                    <Text style={styles.subtitle}>Como deseja ser chamado?</Text>
                    <InputCadastro value={name} onChange={setName} />
                </View>
                {!ready ? (
                    <BtnCadastrar onPress={handleUpdate} title="Salvar" />
                ) : (
                    <BtnCadastrar onPress={onClose} title="Voltar" />
                )}
            </View>
            <StatusBar backgroundColor={colors("pretosignin")} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors("pretosignin"),
    },
    title: {
        fontSize: 24,
        color: '#FFF'
    },
    input: {
        width: 300,
        justifyContent: 'center',
    },
    subtitle: {
        marginVertical: 30,
        fontSize: 20,
        marginLeft: 25,
        color: colors("amarelo")
    }
})