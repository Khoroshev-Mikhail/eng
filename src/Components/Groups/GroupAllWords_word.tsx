import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Checkbox } from "flowbite-react"
import { useEffect, useState } from "react"
import { useDeleteVocabularyMutation, useGetVocabularyQuery, useSetVocabularyMutation } from "../../app/API/vocabularyRTKAPI"
import { getUserId } from "../../app/clientAPI/userSliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import { Word } from "../../app/types/types"

export default function GroupAllWords_word(props: Word){
    const id_user = useAppSelector(getUserId)
    const { data, isSuccess } = useGetVocabularyQuery(id_user ?? skipToken)
    const [ setVocabulary ] = useSetVocabularyMutation()
    const [ deleteVocabulary ] = useDeleteVocabularyMutation()
    function checkboxHandler(e: any, method: string, word_id: number){
        if(id_user){
            if(e.target.checked){
                setVocabulary( {method, word_id, id_user} )
            } else{
                deleteVocabulary( {method, word_id, id_user} )
            }
        }
    }
    return (
        <div className="my-4 grid grid-cols-8 gap-4 border-b border-gray-200">
            <div className="col-span-2">{props.eng}</div>
            <div className="col-span-2">{props.rus}</div>
            { isSuccess &&
            <div className="col-span-4 grid grid-cols-4 gap-4">
                <div className="col-span-1 text-center"><Checkbox checked={data.english.includes(props.id)} onChange={(e)=>checkboxHandler(e, 'english', props.id) } /></div>
                <div className="col-span-1 text-center"><Checkbox checked={data.russian.includes(props.id)} onChange={(e)=>checkboxHandler(e, 'russian', props.id)} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={data.spelling.includes(props.id)} onChange={(e)=>checkboxHandler(e, 'spelling', props.id)} /></div>
                <div className="col-span-1 text-center"><Checkbox checked={data.auding.includes(props.id)} onChange={(e)=>checkboxHandler(e, 'auding', props.id)} /></div>
            </div>
            }
        </div>
    )
}