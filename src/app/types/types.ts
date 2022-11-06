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
    email: string,
    login: string,
    user_name: string
}