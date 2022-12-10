import { Checkbox } from "flowbite-react"
import { useEffect, useState } from "react"
import { getVocabulary } from "../../app/clientAPI/vocabularyAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import { Word } from "../../app/types/types"

export default function GroupAllWords_word(props: Word){
    const dispatch = useAppDispatch()
    const vocabulary = useAppSelector(getVocabulary)
    const [english, setEnglish] = useState<boolean>(false)
    const [russian, setRussian ]= useState<boolean>(false)
    const [spelling, setSpelling] = useState<boolean>(false)
    const [auiding, setAuding] = useState<boolean>(false)
    useEffect(()=>{
        setEnglish(vocabulary.english.includes(props.id))
        setRussian(vocabulary.russian.includes(props.id))
        setSpelling(vocabulary.spelling.includes(props.id))
        setAuding(vocabulary.auding.includes(props.id))
    }, [vocabulary])
    function checkboxHandler(id: number, method: string){
        // dispatch() //и внутри санка которая сетает вокабуляр из методов изучения
    }
    return (
        <div className="my-4 grid grid-cols-8 gap-4">
            <div className="col-span-2">{props.eng}</div>
            <div className="col-span-2">{props.rus}</div>
            <div className="col-span-4 grid grid-cols-4 gap-4">
                <div className="col-span-1 text-center"><Checkbox checked={english} onChange={()=>checkboxHandler(props.id, 'english')} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={russian} onChange={()=>checkboxHandler(props.id, 'russian')} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={spelling} onChange={()=>checkboxHandler(props.id, 'spelling')} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={auiding} onChange={()=>checkboxHandler(props.id, 'auding')} /></div>
            </div>
        </div>
    )
}