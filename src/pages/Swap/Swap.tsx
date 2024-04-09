import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

type Props = {
    navigation: any
}

export const Swap = ({navigation}:Props) => {
    const [cryptoA, setCryptoA] = useState('');
    const [cryptoB, setCryptoB] = useState('');

    const handleSwap = () => {
        // Реализуйте здесь логику для обмена криптовалюты
        // console.log(`Обмен ${cryptoA} на ${cryptoB}`);
        navigation.navigate('List Tokens')
    };

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    value={cryptoA}
                    onChangeText={setCryptoA}
                    placeholder="Криптовалюта A"
                />
                <TextInput
                    style={styles.input}
                    value={cryptoB}
                    onChangeText={setCryptoB}
                    placeholder="Криптовалюта B"
                />
                <Button title="Обменять" onPress={handleSwap} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    box: {
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1
    },
    input: {
        height: 40,
        
        
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
