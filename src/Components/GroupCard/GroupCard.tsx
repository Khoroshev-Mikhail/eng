import { Link } from 'react-router-dom'
import { Progress } from 'flowbite-react';
import { Group, GroupTitle } from '../../app/types/types';
import { useAppSelector } from '../../app/hooks/hooks';
import { getVocabulary } from '../../app/clientAPI/vocabularyAPI';
import getGroupProgress from '../../app/fns/groupFns';
  
export default function GroupCard(props: GroupTitle){
    const vocabulary = useAppSelector(getVocabulary)
    const progress = getGroupProgress(vocabulary, props.word_ids)
    return (
        <Link to={`/words/${props.id}`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h6 className="break-words !text-lg h-16 text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.title_rus}
            </h6>
            {
            progress &&
            <>
                <h6 className="break-words !text-lg h-14 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {progress.total}%
                </h6>
                <div className='pb-1'><Progress progress={progress.english} color='dark'/></div>
                <div className='pb-1'><Progress progress={progress.russian} color='dark'/></div>
                <div className='pb-1'><Progress progress={progress.spelling} color='dark'/></div>
                <div className='pb-1'><Progress progress={progress.auding} color='dark'/></div>
            </>
            }
            
        </Link>    
    )
}