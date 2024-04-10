import { HttpClient } from "./http-client"
import { TokenData, TokenDataById } from "./types"

//TODO: put in env
const apiBaseUrl = 'https://api.cryptorank.io/v1'
const secretKey = '0396a87bd562fb7e4701cda5c36a0bf265d73f18ae6cecc0cc37db31ac9d'

export class Api extends HttpClient {
    public constructor() {
        super(`${apiBaseUrl}`)
    }

    public getCoins = (limit: number, offset: number, sortBy: string) => {
        return this.instance.get<TokenData>(`/currencies?api_key=${secretKey}&limit=${limit}&offset=${offset}&sort=${sortBy}`);
    }

    public getCoinById = (id: number) => {
        return this.instance.get<TokenDataById>(`/currencies/${id}`);
    }
    
}

const api = new Api()

export { api }