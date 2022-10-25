import { Link } from 'react-router-dom'
import css from './groupCard.module.css'
import { Progress } from 'flowbite-react';
import { Group } from '../../app/types/types';
import { useGetGroupProgessQuery } from '../../app/API/vocabularyAPI';
  
export default function GroupCard(props: Group){
    const {data, isSuccess} = useGetGroupProgessQuery({userId: 1, groupId: props.id})
    return (
        <Link to={`/${props.title}`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h6 className="break-words !text-lg h-16 text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title_rus}</h6>
            <div className='pb-1'><Progress progress={isSuccess ? data.english : 0} color='dark'/></div>
            <div className='pb-1'><Progress progress={isSuccess ? data.russian : 0} color='dark'/></div>
            <div className='pb-1'><Progress progress={isSuccess ? data.spelling : 0} color='dark'/></div>
            <div className='pb-1'><Progress progress={isSuccess ? data.auding  : 0} color='dark'/></div>
        </Link>    
    )
}