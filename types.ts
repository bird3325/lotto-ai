
export enum AppState {
    MAIN = 'main',
    LOADING = 'loading',
    RESULT = 'result',
}

export interface LottoResult {
    numbers: number[];
    analysis: string;
}
