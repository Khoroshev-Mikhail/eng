import { useGetUserWordsQuery } from "../../app/API/wordAPI"

export default function Texts(){
    const {data, error, isLoading} = useGetUserWordsQuery(1)
    console.log(data, isLoading)
    return (
        <>
            texts
        </>
    )
}