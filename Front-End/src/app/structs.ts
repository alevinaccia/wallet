export interface Account{
    name?: string;
    value: number;
    type?: string;
    stats?: boolean;
    connection: {
        'name' : string,
        'apiKey'?: string,
        'apiSecret'?: string,
        'lastUpdate'?: string,
    };
    _id?: string;
}

export interface Transaction{
    msg?: string,
    type?: string,
    value: number,
    account?: string,
    _id ?: string,
    date : string,
    category: string
}

export interface Category{
    name: string,
}