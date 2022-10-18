import { Word } from "./types/types";

export function unlernedGroup(vocabulary: number[], group: number[]){
    if(vocabulary && group){
        return group.filter(el => !vocabulary.includes(el))
    }
    
}
export function unlernedWord(vocabulary: number[], group: Word[]): Word{
        const unlernedGroup = group.filter(el => !vocabulary.includes(el.id))
        const index = Math.round(Math.random() * unlernedGroup.length)
        return index === unlernedGroup.length ? unlernedGroup[index - 1] : unlernedGroup[index]
}
//Вынести выборку слов по группам в бд в БД, варианты почему-то повторяются, сделать уникальные
export function falseVariants(vocabulary: Word[], trueVariant: Word): Word[]{
    const falses = [...vocabulary].sort(() => 0.5 - Math.random()).slice(0, 3)
    const result = falses.concat(trueVariant).sort(() => Math.random() - 0.5)
    console.log(vocabulary, trueVariant, result)
    return result;
}