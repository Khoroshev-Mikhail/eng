export type UserVocabular = {
    english: number[],
    russian: number[],
    auding: number[],
    spelling: number[],
}
export type Word = {
    id: number, 
    eng: string,
    rus: string,
    img: string,
    audio: string
}
export type Group = {
    id: number, 
    title: string,
    title_rus: string,
    word_ids: number[]
}
export type User = {
    id: number,
    email?: string | null,
    user_login?: string | null,
    user_name?: string | null,
    token?: string | null,
    refresh_token?: string | null,
    jwtExpire?: string | Date | null,
}