export interface Word {
    value: string;
    type: WordType;
}

export enum WordType {
    KNOWN = 'KNOWN',
    STUDIED = 'STUDIED',
    IGNORED = 'IGNORED',
    UNKNOWN = 'UNKNOWN'
}