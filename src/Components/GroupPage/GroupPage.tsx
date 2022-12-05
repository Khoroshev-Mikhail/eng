import { Progress } from "flowbite-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getReferences } from "../../app/API/referencesSlice";
import { getGroup, getGroupThunk } from "../../app/clientAPI/groupSliceAPI";
import { getVocabulary } from "../../app/clientAPI/vocabularyAPI";
import getGroupProgress from "../../app/fns/groupFns";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";

export default function GroupPage(){
    const { id_group } = useParams()
    const dispatch = useAppDispatch()
    const vocabulary = useAppSelector(getVocabulary)
    const { group: { content_references, word_ids }, status} = useAppSelector(getGroup)
    const progress = getGroupProgress(vocabulary, word_ids)
    useEffect(()=>{
        dispatch(getGroupThunk( Number(id_group) ))
    }, [])
    return (
        <>
        <h1 className="m-4">Выберите способ изучения слов:</h1>
        <h1 className="m-4">(Лампочка)Совет: не переходите к следущему способу пока не завершили предыдущий.</h1>
        {progress &&
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
            <Link to={`/words/${id_group}/English`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">English - Русский</h6>
                <Progress progress={progress.english} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Переведи с Английского</div>
            </Link>
            <Link to={`/words/${id_group}/Russian`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Русский - English</h6>
                <Progress progress={progress.russian} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Переведи с Русского</div>
            </Link>
            <Link to={`/words/${id_group}/Spelling`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">По буквам</h6>
                <Progress progress={progress.spelling} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Составь слово из букв</div>
            </Link>
            <Link to={`/words/${id_group}/Auding`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Аудирование</h6>
                <Progress progress={progress.auding} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Прослушай и напиши</div>
            </Link>
        </div>
        }
        {/* {references && 
            <References />
        } */}
        </>
    )
}