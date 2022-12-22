import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Dropdown, Spinner, TextInput } from "flowbite-react"
import AdminOneGroup_WordRow from "./AdminOneGroup_WordRow"
import { Word } from "../../app/types/types"
import { useDeleteGroupMutation, useGetOneGroupQuery, useGetWordsFromGroupQuery, usePutGroupMutation } from "../../app/API/groupsRTKAPI"
import { sortWordByEng, sortWordById, sortWordByRus } from "../../app/fns/comparators"
import { useSearchWordsQuery } from "../../app/API/wordRTKAPI"
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup"

export default function AdminOneGroup(){
    //Подсвети заголовок столбца по которому сортируется вывод
    const { id = 0 } = useParams()
    const [ title, setTitle ] = useState<string>('')
    const [ title_rus, setTitle_rus ] = useState<string>('')
    const [ search, setSearch ] = useState<string>('')
    const [ filter, setFilter ] = useState<string>('')
    const [ searchCount, setSearchCount ] = useState<number>(5)
    const [ deletedWords, setDeletedWords ] = useState<Word[]>([])
    const [ comparator, setComparator ] = useState<{fn: any, increase: boolean}>({ fn: sortWordById, increase: true })

    const { data: dataGroups, isSuccess: isSuccessGroup } = useGetOneGroupQuery( id ) //костыль какойто. и внизу сетГроупТакрйже
    const { data: dataWords, isSuccess: isSuccessWords } = useGetWordsFromGroupQuery(id) //Наверно надо качасть отфильтрованные слова сразу с бд
    const { data: dataSearch, isSuccess: isSuccessSearch, isLoading: isLoadingSearch } = useSearchWordsQuery( search )
    const [ setGroup ] = usePutGroupMutation()
    const [ deleteGroup ] = useDeleteGroupMutation()
    const sorted = isSuccessGroup && isSuccessWords 
        ? comparator.increase 
            ? [...dataWords].concat(deletedWords).sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())) 
            : [...dataWords].concat(deletedWords).sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())).reverse()
        : []
    const searchSorted = isSuccessSearch ? 
        comparator.increase 
            ? [...dataSearch].sort(comparator.fn)
            : [...dataSearch].sort(comparator.fn).reverse()
        : []
    function toggleComparator(currentComparator: any){
        setComparator(({fn, increase}) => {
            return {
                fn: currentComparator,
                increase: fn === currentComparator ? !increase : true
            };
        })
    }
    useEffect(()=>{
        if(isSuccessGroup && dataGroups.title && dataGroups.title_rus){
            setTitle(dataGroups.title)
            setTitle_rus(dataGroups.title_rus)
        }
    }, [dataGroups])

    return (
        <>
        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Изменения заголовков группы</div>
            <div className="col-span-4">
                <TextInput placeholder="English header" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="col-span-3">
                <TextInput placeholder="Русский заголовок" value={title_rus} onChange={(e)=>setTitle_rus(e.target.value)}/>
            </div>
            <div className="col-span-1">
                <Button onClick={ ()=>{ setGroup({ id, title, title_rus }) } }>Сохранить</Button>
            </div>
            <div className="col-span-1">
                <Button color={'failure'} onClick={ ()=>{ deleteGroup(id) }}>Удалить</Button>
            </div>
        </div>

        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Добавить в группу существующее слово</div>
            {/* Выведи это в отдельную компоненту и незабудь что сейчас компаратор общий на два выводы. в новосозданной компоненте задай поумолчанию компаратор в зависимости от вводимого языка */}
            <div className="col-span-9">
            <TextInput addon={ <Dropdown label={`Вывод ${searchCount} слов.`} inline={true} >
                <Dropdown.Item onClick={()=>setSearchCount(5)}>
                    5
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>setSearchCount(10)}>
                    10
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>setSearchCount(15)}>
                    15
                </Dropdown.Item>
                </Dropdown>} 
                placeholder="Поиск по всем словам" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className="col-span-1 cursor-pointer text-center" onClick={()=>toggleComparator(sortWordById)}>
                ID
            </div>
            <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByEng)}>
                Eng
            </div>
            <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByRus)}>
                Rus
            </div>
            <div className="col-span-2 cursor-pointer text-center">
                В группе?
            </div>
            { isSuccessGroup && isSuccessSearch && searchSorted.slice(0, searchCount).map((word: Word, i: number) => {
                return <AdminOneGroup_WordRow word={word} words_ids={dataGroups.words} setDeletedWords={setDeletedWords} key={i} />
            })}
        </div>

        {/* Добавь ссылку на создание нового слова */}
        <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
            <div className="col-span-9">Слова которые содержатся в группе</div>
            <div className="col-span-9">
                <TextInput placeholder="Начните вводить слово на любом языке" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            </div>
            <div className="col-span-1 cursor-pointer text-center" onClick={()=>toggleComparator(sortWordById)}>
                ID
            </div>
            <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByEng)}>
                Eng
            </div>
            <div className="col-span-3 cursor-pointer" onClick={()=>toggleComparator(sortWordByRus)}>
                Rus
            </div>
            <div className="col-span-2 cursor-pointer text-center">
                В группе?
            </div>
            { isSuccessGroup && isSuccessWords && sorted.map((word: Word, i: number) => {
                return <AdminOneGroup_WordRow word={word} words_ids={dataGroups.words} setDeletedWords={setDeletedWords} key={i} />
            })}
        </div>
        </>
    )
}