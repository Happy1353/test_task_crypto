import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Token } from "../../services/types";

interface CoinItemProps {
    item: Token;
    isSelected: boolean | undefined;
    handleCoinPress: (item: any) => void;
}

export const CoinItem = ({ item, isSelected, handleCoinPress }:CoinItemProps) => {
    return (
        <TouchableOpacity onPress={() => handleCoinPress(item)}>
            <View style={[styles.coinItem, isSelected && styles.selectedCoin]}>
                <View>
                    <Text style={styles.coinName}>{item.name}</Text>
                    <Text style={styles.coinSymbol}>{item.symbol}</Text>
                </View>
                {isSelected && <View style={styles.selectionIndicator} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    coinItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    coinName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    coinSymbol: {
        fontSize: 14,
        color: "#666",
    },
    selectedCoin: {
        backgroundColor: "#e3f2fd",
    },
    selectionIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "blue",
    },
});
