import { Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getLearning, getLearningThunk, getTrueVariant } from "../../app/clientAPI/learningSliceAPI"
import { getUser } from "../../app/clientAPI/userSliceAPI"
import { setVocabularyAndGetUpdatedVocabularyThunk } from "../../app/clientAPI/vocabularySliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import Completed from "../StaticPages/Completed"

export default function Spelling(props: any){
    //Отрефактори проверки user.id && id_group
    const { id_group } = useParams()
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)
    const { trueVariant, status } = useAppSelector(getLearning)
    const defaultImg = '51_ccc.jpeg'
    const [answer, setAnswer] = useState<string>('')
    const [eng, setEng] = useState<string>('')
    function clickEng(i: number){
        setEng(state => {
            const arr = state.split('')
            const currentLetter = arr.splice(i, 1)[0]
            setAnswer(state => {
                if((state + currentLetter).toUpperCase() === trueVariant.eng.toUpperCase()){
                    dispatch(setVocabularyAndGetUpdatedVocabularyThunk({method: 'spelling', word_id: trueVariant.id}))
                    setAnswer('')
                    if(user.id && id_group){
                        dispatch(getLearningThunk({method: 'russian', id: id_group }))
                    }
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
        if(user.id && id_group){
            dispatch(getLearningThunk({method: 'russian', id: id_group }))
        }
    }, [id_group, user.id])
    useEffect(()=>{
        setEng( trueVariant.eng.toUpperCase().split('').sort( () => Math.random() - 0.5 ).join('') )
    }, [trueVariant])
    return (
        <>
        {status === 'fulfilled' &&
        <div className="w-full p-2 sm:w-96 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                    <img onClick={()=>alert('repeat audio')} className="rounded-t-lg" src={'http://localhost:3002/img/' + (trueVariant.img || defaultImg)} alt="" />
            </a>
            <div className="p-5">
                <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{trueVariant.rus}</h5>
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
        { status === 'completed' && 
        <Completed />
        }
        
        { (status === 'error' || status === 'rejected') && 
            <div>Ошибка</div>
        }
        </>
    )
}