import { Checkbox } from "flowbite-react"
import { useEffect, useState } from "react"
import { deleteFromVocabularyAndGetUpdatedVocabularyThunk, getVocabulary, setVocabularyAndGetUpdatedVocabularyThunk } from "../../app/clientAPI/vocabularySliceAPI"
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
    function checkboxHandler(e: any, method: string, word_id: number){
        if(e.target.checked){
            dispatch(setVocabularyAndGetUpdatedVocabularyThunk({ method, word_id }))
        } else{
            dispatch(deleteFromVocabularyAndGetUpdatedVocabularyThunk({ method, word_id }))
        }
    }
    return (
        <div className="my-4 grid grid-cols-8 gap-4">
            <div className="col-span-2">{props.eng}</div>
            <div className="col-span-2">{props.rus}</div>
            <div className="col-span-4 grid grid-cols-4 gap-4">
                <div className="col-span-1 text-center"><Checkbox checked={english} onChange={(e)=>checkboxHandler(e, 'english', props.id) } /></div>
                <div className="col-span-1 text-center"><Checkbox checked={russian} onChange={(e)=>checkboxHandler(e, 'russian', props.id)} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={spelling} onChange={(e)=>checkboxHandler(e, 'spelling', props.id)} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={auiding} onChange={(e)=>checkboxHandler(e, 'auding', props.id)} /></div>
            </div>
        </div>
    )
}