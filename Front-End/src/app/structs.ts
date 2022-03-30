export interface Account{
    name?: string;
    value: number;
    type?: string;
    stats?: boolean;
    connection: {
        'name' : string,
        'apiKey'?: string,
        'apiSecret'?: string,
        'handler'?: any,
    };
}

export interface Transaction{
    msg?: string,
    type?: string,
    value?: number,
    account?: string,
    _id? : string
}