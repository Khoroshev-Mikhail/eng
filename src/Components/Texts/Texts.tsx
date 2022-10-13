import { useGetUserWordsQuery, useSetUserWordsMutation } from "../../app/API/wordAPI"

export default function Texts(){
    const {data, error, isLoading} = useGetUserWordsQuery()
    const [addWord, {isError}] = useSetUserWordsMutation()

    console.log(data)
    return (
        <>
            <button onClick={()=>addWord({eng: 'ara', rus: 'попугай'})}> add99 </button>
        </>
    )
}