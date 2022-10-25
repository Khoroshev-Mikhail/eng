import { Progress } from "flowbite-react";
import { Link } from "react-router-dom";
import { useGetGroupProgessQuery } from "../../app/API/vocabularyAPI";
export default function MethodMenu(props:any){
    const {data, isSuccess} = useGetGroupProgessQuery({userId: 1, groupId: props.id})
    return (
        <>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            <Link to={`/${props.title}/English`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">English - Русский</h6>
                <Progress progress={isSuccess ? data.english : 0} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Переведи с Английского</div>
            </Link>
            <Link to={`/${props.title}/Russian`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Русский - English</h6>
                <Progress progress={isSuccess ? data.russian : 0} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Переведи с Русского</div>
            </Link>
            <Link to={`/${props.title}/Spelling`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">По буквам</h6>
                <Progress progress={isSuccess ? data.spelling : 0} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Составь слово из букв</div>
            </Link>
            <Link to={`/${props.title}/Auding`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h6 className="mb-2 border-b pb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Аудирование</h6>
                <Progress progress={isSuccess ? data.auding : 0} label="Выучено" labelPosition="outside" labelProgress={true} color='dark' />
                <div className="py-2">Прослушай и напиши</div>
            </Link>
        </div>
        </>
    )
}