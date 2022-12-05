import { Link, useParams } from 'react-router-dom'
import { Progress } from 'flowbite-react';
import { TextTitle } from '../../../app/types/types';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks/hooks';
import { useGetGroupProgessQuery } from '../../../app/API/vocabularyAPI';
  
export default function TextCard(props: TextTitle){
    const { id_group } = useParams()
    const { id: userId } = useAppSelector((state: RootState) => state.user)
    const { data: progress, isSuccess, isError } = useGetGroupProgessQuery({userId: userId ? userId : 0, groupId: id_group || props.id_group}) //Есть случаи при загрузке group_id === null? Хотя он и не продразумевается но обрабоат его надо
    return (
        <Link to={`/texts/${props.id}`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h6 className="break-words !text-lg h-16 text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h6>
            {
                isSuccess &&
                <div className='pb-1'>
                    <h6 className="break-words !text-lg h-14 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {progress.total}%
                    </h6>
                    <Progress progress={progress.total || 0} color='dark'/>
                </div>
            }
            {
                isError &&
                <div className='pb-1'>
                    <h6 className="break-words !text-lg h-14 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        (нет данных)
                    </h6>
                    <Progress progress={0} color='dark'/>
                </div>
            }
            
        </Link>    
    )
}