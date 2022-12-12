import { Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import { getVocabulary } from "../../app/clientAPI/vocabularySliceAPI";
import getGroupProgress from "../../app/fns/groupFns";
import { useAppSelector } from "../../app/hooks/hooks";

export default function GroupProgress( props: { id_group: number | string | null, all?: boolean } ){
    const vocabulary = useAppSelector(getVocabulary)
    const [ word_ids, setWord_ids ] = useState<number[]>([])
    const progress = getGroupProgress(vocabulary, word_ids)
    useEffect(()=>{
        if(props.id_group){
            fetch(`http://localhost:3002/groups/${props.id_group}`)
            .then( response => {
                return response.json()
            })
            .then(response =>{
                if(response.words){
                    setWord_ids( response.words )
                }
            })
            .catch(err => {
                setWord_ids ( [] )
            })
        }
    }, [ vocabulary, props.id_group ])
    return (
        <>  
            <h6 className="break-words !text-lg h-14 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {progress.total}%
            </h6>
            {( !props.all ) && 
                <Progress progress={progress.total} color='dark'/>
            }
            {props.all &&
                <>
                    <div className='pb-1'><Progress progress={progress.english} color='dark'/></div>
                    <div className='pb-1'><Progress progress={progress.russian} color='dark'/></div>
                    <div className='pb-1'><Progress progress={progress.spelling} color='dark'/></div>
                    <div className='pb-1'><Progress progress={progress.auding} color='dark'/></div>
                </>
            }
        </>
    )
}