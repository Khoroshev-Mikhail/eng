import { Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroup, getGroupThunk, getWord_idsFromGroup } from "../../app/clientAPI/groupSliceAPI";
import { getUserId } from "../../app/clientAPI/userSliceAPI";
import { getVocabulary } from "../../app/clientAPI/vocabularySliceAPI";
import getGroupProgress from "../../app/fns/groupFns";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { References } from "../References/References";

export default function GroupPage(){
    const { id_group } = useParams()
    const dispatch = useAppDispatch()
    const isAdmin = useAppSelector(getUserId) === 1
    const vocabulary = useAppSelector(getVocabulary)
    const group = useAppSelector(getGroup)
    const words_ids = useAppSelector(getWord_idsFromGroup)
    const [progress, setProgress] = useState(getGroupProgress(vocabulary, words_ids))
    useEffect(()=>{
        dispatch(getGroupThunk( id_group || 0 ))
        setProgress(getGroupProgress(vocabulary, words_ids))
    }, [id_group])
    useEffect(()=>{
        setProgress(getGroupProgress(vocabulary, words_ids)) //Или перерефактори чтобы брать через appSelector
    }, [vocabulary, group])
    return (
        <>
        <h1 className="m-4">(Лампочка)Совет: не переходите к следущему способу пока не завершили предыдущий.</h1>
        <div className='grid grid-cols-1 gap-4 my-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
            <Link to={`/groups/${id_group}/all`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Все слова из этой группы слов</h6>
            </Link>
        </div>
        {isAdmin &&
            <div className='grid grid-cols-1 gap-4 my-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
                <Link to={`/admin/groups/${id_group}`} className="bg-sky-100 block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Редактировать группу в админке</h6>
            </Link>
            </div>
        }
        <h1 className="m-4">Выберите способ изучения слов:</h1>
        {
        progress &&
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
            <Link to={`/groups/${id_group}/English`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">English - Русский</h6>
                <Progress progress={progress.english} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Переведи с Английского</div>
            </Link>
            <Link to={`/groups/${id_group}/Russian`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Русский - English</h6>
                <Progress progress={progress.russian} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Переведи с Русского</div>
            </Link>
            <Link to={`/groups/${id_group}/Spelling`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">По буквам</h6>
                <Progress progress={progress.spelling} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Составь слово из букв</div>
            </Link>
            <Link to={`/groups/${id_group}/Auding`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Аудирование</h6>
                <Progress progress={progress.auding} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Прослушай и напиши</div>
            </Link>
        </div>
        }

        <References id_group={id_group} />
        </>
    )
}