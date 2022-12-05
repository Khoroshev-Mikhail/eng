export type UserVocabular = {
    english: number[],
    russian: number[],
    auding: number[],
    spelling: number[],
};
export type Word = {
    id: number, 
    eng: string,
    rus: string,
    img: string,
    audio: string
};
export type Group = {
    id: number, 
    title: string,
    title_rus: string,
    word_ids: number[],
    content_references: Content_references
};
export type GroupTitle = {
    id: number, 
    title: string,
    title_rus: string,
    word_ids: number[]
};
export type Text = {
    id: number, 
    title: string,
    img: string,
    text_body: string,
    visible?: boolean,
    content_references: Content_references
};
export type TextTitle = {
    id: number, 
    title: string,
    img: string,
    id_group: number,
};
export type User = {
    id: number | null,
    email?: string | null,
    user_login?: string | null,
    user_name?: string | null,
    token?: string | null,
    refresh_token?: string | null,
    jwtExpire?: string | Date | null,
};
export type Content_references = {
    id_text: number | null,
    id_group: number | null,
    id_audio: number | null,
    id_video: number | null
} | null;
export type Progress = {
    english: number, 
    russian: number, 
    spelling: number, 
    auding: number, 
    total: number
};
export type References = {
    group: Group | null,
    text: TextTitle | null,
    audio: any | null,
    video: any | null,
} | null;

export type Vocabulary = {
    english: number[],
    russian: number[],
    spelling:  number[],
    auding: number[],
}
export type Learning = {
    trueVariant: Word,
    falseVariants: Word[],
}
export type Method = 'english' | 'russian' | 'spelling' | 'auding';