import { useGetAllWordsQuery, useSetWordMutation } from "../../app/API/wordAPI"

export default function Texts(){
    const {data, error, isLoading} = useGetAllWordsQuery()
    const [addWord, {isError}] = useSetWordMutation()

    console.log(data)
    return (
        <>
            <button onClick={()=>addWord({eng: 'ara', rus: 'попугай'})}> add99 </button>
        </>
    )
}