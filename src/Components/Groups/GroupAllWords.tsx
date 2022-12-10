import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllWordsFromGroup, getAllWordsFromGroupThunk } from "../../app/clientAPI/groupSliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import GroupAllWords_word from "./GroupAllWords_word"

export default function GroupAllWords(){
    const { id_group } = useParams()
    const dispatch = useAppDispatch()
    const words = useAppSelector(getAllWordsFromGroup)
    useEffect(()=>{
        dispatch(getAllWordsFromGroupThunk(id_group || 0))
    }, [id_group])
    return (
        <div>
            <div className="my-4 grid grid-cols-8 gap-4">
                <div className="col-span-4">Всего слов в группе: {words.length}</div>
                <div className="col-span-4 text-center">Методы изучения слов</div>
            </div>
            <div className="my-4 grid grid-cols-8 gap-4">
                <div className="col-span-2">Английский</div>
                <div className="col-span-2">Русский</div>
                <div className="col-span-4 grid grid-cols-4 gap-4">
                    <div className="col-span-1 text-center">Английский</div>
                    <div className="col-span-1 text-center">Русский</div>
                    <div className="col-span-1 text-center">По буквам</div>
                    <div className="col-span-1 text-center">Аудирование</div>
                </div>
            </div>
            {words && words.map(el => {
                return (
                    <GroupAllWords_word {...el} />
                )
            })}
        </div>
    )
}