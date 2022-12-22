import { Progress } from "flowbite-react";
import { useGetGroupProgessQuery } from "../../app/API/vocabularyRTKAPI";
import { getUserId } from "../../app/clientAPI/userSliceAPI";
import { useAppSelector } from "../../app/hooks/hooks";

export default function GroupProgress( props: { id_group: number | string | null, all?: boolean } ){
    const id_user = useAppSelector(getUserId)
    const { data: progress, isSuccess } = useGetGroupProgessQuery( {id_group: props.id_group || 0, id_user: id_user || 0 }) //костыль
    return (
        <>  
            {isSuccess && <h6 className="break-words !text-lg h-14 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{progress.total}%</h6>}
            {isSuccess && !props.all && <Progress progress={progress.total} color='dark'/>}
            {isSuccess && props.all &&
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