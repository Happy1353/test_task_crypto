import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";

import {CoinItem, Searchbar} from "../../components";
import { api } from "../../services/api";
import { Token } from "../../services/types";

const LIMIT = 10;

type SortOrder = 'asc' | 'desc';
type SortField = 'price' | 'rank';

export const ListTokens = () => {
    const [coins, setCoins] = useState<Token[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<Token>();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [offset, setOffset] = useState<number>(0);
    const [sortBy, setSortBy] = useState<SortField>('rank');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    useEffect(() => {
        loadCoins();
    }, [offset, sortBy]);

    const loadCoins = () => {
        api.getCoins(LIMIT, offset, sortBy).then((response: any) => {
            setCoins(prevCoins => [...prevCoins, ...response.data]);
        }).catch(error => {
            console.error("Error loading coins:", error);
        });
    };

    const handleCoinPress = (coin: Token) => {
        setSelectedCoin(coin);
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const handleLoadMore = () => {
        setOffset(prev => prev + LIMIT);
    };

    const handleSort = (sortByValue: SortField) => {
        if (sortByValue === sortBy) {
            setSortBy(prevSortBy => sortOrder === 'asc' ? ('-' + prevSortBy) as SortField : prevSortBy.substring(1) as SortField);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortOrder('asc');
            setSortBy(sortByValue);
        }
        setCoins([]);
        setOffset(0);
    };
    
    const filteredCoins = coins ? coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];


    return (
        <View style={styles.container}>
            <Searchbar searchQuery={searchQuery} handleSearch={handleSearch} />
            <View style={styles.sortButtonsContainer}>
                <Button title={`Sort by Rank ${sortBy.endsWith('rank') ? (sortOrder === 'asc' ? '▼' : '▲') : ''}`} onPress={() => handleSort('rank')} /> 
                <Button title={`Sort by Price ${sortBy.endsWith('price') ? (sortOrder === 'asc' ? '▼' : '▲') : ''}`} onPress={() => handleSort('price')} />
            </View>
            <FlatList
                data={filteredCoins}
                renderItem={({ item }) => (
                    <CoinItem
                        item={item}
                        isSelected={selectedCoin && selectedCoin.id === item.id}
                        handleCoinPress={handleCoinPress}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sortButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
});
