export interface TokenData {
    data: Token[];
    status: {
        success: boolean;
        time: string;
        code: number;
        message: string;
        responseTime: number;
        creditsCost: number;
    };
}

export interface Token {
    id: number;
    slug: string;
    symbol: string;
    name: string;
    volume24hBase: number;
    values: {
        USD: {
            price: number;
            marketCap: number;
            volume24h: number;
            high24h: number;
            low24h: number;
        };
        BTC: {
            price: number;
            marketCap: number;
            volume24h: number;
        };
        ETH: {
            price: number;
            marketCap: number;
            volume24h: number;
        };
    };
    circulatingSupply: number;
    storedTime: string;
}
