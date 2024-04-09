import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchbarProps {
    searchQuery: string;
    handleSearch: (text: string) => void;
}

export const Searchbar = ({ searchQuery, handleSearch }:SearchbarProps) => {
    return (
        <TextInput
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={searchQuery}
            placeholder="Search by currency..."
        />
    );
};

const styles = StyleSheet.create({
    searchInput: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});
