import { Link } from 'react-router-dom'
import { Progress } from 'flowbite-react';
import { GroupTitle } from '../../app/types/types';
import { useGetGroupProgessQuery } from '../../app/API/vocabularyAPI';
import { useAppSelector } from '../../app/hooks/hooks';
import { RootState } from '../../app/store';
  
export default function GroupCard(props: GroupTitle){
    const { id: userId } = useAppSelector((state: RootState) => state.userData)
    const { data: progress, isSuccess: isSuccessProgress } = useGetGroupProgessQuery({userId, groupId: props.id})
    return (
        <Link to={`/words/${props.id}`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h6 className="break-words !text-lg h-16 text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.title_rus}
            </h6>
            {
            isSuccessProgress &&
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