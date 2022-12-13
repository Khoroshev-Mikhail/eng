import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import { getAllWordsFromGroupAdmin, getAllWordsFromGroupAdminThunk, getGroupAdmin, getGroupAdminThunk, putGroupAdminThunk } from "../../app/adminAPI/groupsAdminAPISlice"
import { Button, TextInput } from "flowbite-react"
import AdminOneGroup_WordRow from "./AdminOneGroup_WordRow"
import { getAllWordsFromGroup } from "../../app/clientAPI/groupSliceAPI"
import { Word } from "../../app/types/types"
import { getAllWordsAdmin, getAllWordsAdminThunk } from "../../app/adminAPI/wordsAdminAPISlice"

export default function AdminOneGroup(){
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const data = useAppSelector(getGroupAdmin)
    const allWordsFromGroup = useAppSelector(getAllWordsFromGroupAdmin)
    const allWords = useAppSelector(getAllWordsAdmin)

    const [ filtredAllWords, setFiltredAllWords ] = useState<Word[]>([])
    const [ title, setTitle ] = useState<string>('')
    const [ title_rus, setTitle_rus ] = useState<string>('')
    const [ search, setSearch ] = useState<string>('')
    const [ filter, setFilter ] = useState<string>('')
    function saveTitles(){
        dispatch(putGroupAdminThunk({ id: data.id, title, title_rus }))
    }

    useEffect(()=>{
        if(id){
            dispatch(getGroupAdminThunk(id))
            dispatch(getAllWordsFromGroupAdminThunk(id))
        }
    }, [id])
    useEffect(()=>{
        if(data.title && data.title_rus){
            setTitle(data.title)
            setTitle_rus(data.title_rus)
        }
    }, [data])
    useEffect(()=>{
        dispatch(getAllWordsAdminThunk())
    }, [])
    useEffect(()=>{
        setFiltredAllWords(allWords.filter((word: Word) => word.eng.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || word.rus.toLocaleLowerCase().includes(search.toLocaleLowerCase()))) //может вынести эту логику на сервак
    }, [ search, allWords ])
    return (
        <>
        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Изменения заголовков группы</div>
            <div className="col-span-4">
                <TextInput placeholder="English header" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="col-span-4">
                <TextInput placeholder="Русский заголовок" value={title_rus} onChange={(e)=>setTitle_rus(e.target.value)}/>
            </div>
            <div className="col-span-1">
                <Button onClick={ ()=>{ saveTitles()} }>Сохранить</Button>
            </div>
        </div>

        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Добавить в группу существующее слово</div>
            <div className="col-span-9">
                <TextInput placeholder="Поиск по всем словам" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            {filtredAllWords.slice(0, 5).map(word => {
                return <AdminOneGroup_WordRow {...word} />
            })}
        </div>

        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Создать новое слово и добавить в группу</div>
            <div className="col-span-9">Здесь наверно надо переиспользовать компоненту</div>
        </div>

        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Слова которые содержатся в группе</div>
            <div className="col-span-9">
                <TextInput placeholder="Фильтр слов" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            </div>
            <div className="col-span-1">
                ID
            </div>
            <div className="col-span-3">
                Eng
            </div>
            <div className="col-span-3">
                Rus
            </div>
            <div className="col-span-2 text-center">
                В группе?
            </div>
            { allWordsFromGroup.map((word: Word) => {
                return <AdminOneGroup_WordRow {...word} key={word.id} />
            })}
        </div>
        </>
    )
}