import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

import { Token } from "../../services/types";
import { SUCCESS_SWAP, errors_form, errors_type } from "../../utils/errors";

type Props = {
    navigation: any
}

export const Swap = ({ navigation }: Props) => {
    const [cryptoA, setCryptoA] = useState<Token | null>(null);
    const [cryptoB, setCryptoB] = useState<Token | null>(null);
    const [valueA, setValueA] = useState<string>('0');
    const [valueB, setValueB] = useState<string>('0');

    const handleSelectTokenA = () => {
        navigation.navigate('List Tokens', { onSelect: setCryptoA });
    };

    const handleSelectTokenB = () => {
        navigation.navigate('List Tokens', { onSelect: setCryptoB });
    };

    // Функция конвертации значения одной валюты в другую
    const convertValue = (inputValue: string, rate: number) => {
        const parsedInput = parseFloat(inputValue);
        if (!isNaN(parsedInput)) {
            return (parsedInput * rate).toString();
        }
        return '0';
    };

    // Обработчик изменения значения valueA
    const handleValueAChange = (text: string) => {
        setValueA(text);
        if (cryptoA && cryptoA.values && cryptoB && cryptoB.values) {
            const rateA = cryptoA.values.USD.price;
            const rateB = cryptoB.values.USD.price;
            const newConversionRate = rateA / rateB;
            const convertedValue = convertValue(text, newConversionRate);
            setValueB(convertedValue);
        }
    };

    // Обработчик изменения значения valueB
    const handleValueBChange = (text: string) => {
        setValueB(text);
        if (cryptoA && cryptoA.values && cryptoB && cryptoB.values) {
            const rateA = cryptoA.values.USD.price;
            const rateB = cryptoB.values.USD.price;
            const newConversionRate = rateB / rateA;
            const convertedValue = convertValue(text, newConversionRate);
            setValueA(convertedValue);
        }
    };

    const handleSwap = () => {
        if(cryptoA == null || cryptoB == null){
            Alert.alert(errors_type.ERROR, errors_form.INVALID_TOKENS);
        }else if(valueA == '0' || valueB == '0'){
            Alert.alert(errors_type.ERROR, errors_form.INVALID_VALUE);
        }else if(cryptoA.name == cryptoB.name){
            Alert.alert(errors_type.ERROR, errors_form.INVALID_SAMETOKENS);
        }else{
            Alert.alert(errors_type.SUCCESS, SUCCESS_SWAP);
            setCryptoA(null)
            setCryptoB(null)
            setValueA('0')
            setValueB('0')
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Converter</Text>
                {cryptoA ? (
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={valueA}
                            onChangeText={handleValueAChange}
                            placeholder="Amount"
                            inputMode="numeric"
                        />
                        <TouchableOpacity onPress={handleSelectTokenA}>
                            <Text style={styles.currency}>{cryptoA.symbol}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleSelectTokenA}>
                        <Text style={styles.selectButton}>Select Token A</Text>
                    </TouchableOpacity>
                )}
                {cryptoB ? (
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={valueB}
                            onChangeText={handleValueBChange}
                            placeholder="Amount"
                            inputMode="numeric"
                        />
                        <TouchableOpacity onPress={handleSelectTokenB}>
                            <Text style={styles.currency}>{cryptoB.symbol}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleSelectTokenB}>
                        <Text style={styles.selectButton}>Select Token B</Text>
                    </TouchableOpacity>
                )}
                <Button title="Swap" onPress={handleSwap}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    box: {
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        width: '80%',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    selectButton: {
        fontSize: 16,
        marginBottom: 10,
        color: 'blue',
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    currency: {
        color: 'blue',
        fontSize: 16,
    },
});
