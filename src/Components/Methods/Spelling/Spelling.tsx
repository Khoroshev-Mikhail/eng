import { Button, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetUnlernedSpellQuery, useSetVocabularyMutation } from "../../../app/API/vocabularyAPI"
import { useAppSelector } from "../../../app/hooks/hooks"
import { RootState } from "../../../app/store"
import { Group } from "../../../app/types/types"

export default function Spelling(props: any){
    const { id_group } = useParams()
    const { id: userId } = useAppSelector((state: RootState) => state.user)
    const {data, isSuccess} = useGetUnlernedSpellQuery({userId, groupId: id_group || 0}) //Костыль
    const defaultImg = '51_ccc.jpeg'
    const [answer, setAnswer] = useState<string>('')
    const [eng, setEng] = useState<string>('')
    const [ setVocabulary ] = useSetVocabularyMutation()
    function clickEng(i: number){
        setEng(state => {
            const arr = state.split('')
            const currentLetter = arr.splice(i, 1)[0]
            setAnswer(state => {
                if((state + currentLetter).toUpperCase() === data.trueVariant.toUpperCase()){
                    setVocabulary({method: 'spelling', userId: userId ? userId : 0, word_id: data.id})
                    setAnswer('')
                }
                return state + currentLetter
            }) //решить с ассинхронностью
            return arr.join('')
        })
    }
    function clickAnswer(i: number){
        setAnswer(state => {
            const arr = state.split('')
            const currentLetter = arr.splice(i, 1)[0]
            setEng(state => state + currentLetter) //решить с ассинхронностью
            return arr.join('')
        })
    }
    useEffect(()=>{
        if(isSuccess){
            setEng(data.eng)
        }
    }, [isSuccess, data])
    return (
        <>
        {isSuccess &&
        <div className="w-full p-2 sm:w-96 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                    <img onClick={()=>alert('repeat audio')} className="rounded-t-lg" src={'http://localhost:3002/img/' + (data.img || defaultImg)} alt="" />
            </a>
            <div className="p-5">
                <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.rus}</h5>
                <div className="flex flex-wrap gap-1 justify-center mb-10 p-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {answer.split('').map((el: string, i: number) => {
                        return (
                            <div key={i} className="font-bold">
                                <Button color="gray" onClick={()=>clickAnswer(i)}>
                                    {el}
                                </Button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-10 p-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {eng.split('').map((el: string, i: number) => {
                        return (
                            <div key={i}>
                                <Button color="gray" onClick={()=>clickEng(i)}>
                                    {el}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        }
        </>
        
    )
}