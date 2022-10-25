import { Button, FileInput, Label, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { Checkbox } from "semantic-ui-react"
import { useAddWordToGroupMutation, useGetGroupsQuery } from "../../app/API/groupsAPI"
import { useGetAllWordsQuery, useSetWordMutation } from "../../app/API/wordAPI"
import { Group, Word } from "../../app/types/types"
import AdminWordsRow from "./AdminWordsRow"

const sortById = (a: Word, b: Word) => a.id - b.id
const sortByEng = (a: Word, b: Word) => a.eng.localeCompare(b.eng)
const sortByRus = (a: Word, b: Word) => a.rus.localeCompare(b.rus)

export default function AdminWords(){
    const {data, isSuccess} = useGetAllWordsQuery()
    const {data: groups, isSuccess: isSuccessGroups} = useGetGroupsQuery()
    const [setWord, status] = useSetWordMutation()
    const [addWordToGroup] = useAddWordToGroupMutation()
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [img, setImg] = useState<any>()
    const [audio, setAudio] = useState<any>()
    const [includesGroup, setIncludesGroup] = useState<number[]>([])
    const [comparator, setComparator] = useState<{fn: any, increase: boolean}>({fn: sortById, increase: true})
    const [filter, setFilter] = useState<string>('')
    const sorted = isSuccess 
        ? comparator.increase 
            ? [...data].sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())) 
            : [...data].sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())).reverse()
        : []
    function toggleComparator(currentComparator: any){
        setComparator(({fn, increase}) => {
            return {
                fn: currentComparator,
                increase: fn === currentComparator ? !increase : true
            };
        })
    }
    function addNewWord(){
        if(eng === '' || rus === ''){
            return;
        }
        const formData = new FormData();
        formData.append('eng', eng);
        formData.append('rus', rus);
        img && formData.append('img', img[0]);
        audio && formData.append('audio', audio[0]);
        setWord(formData).unwrap().then(fulfilled => {
            includesGroup.forEach((id: number) => addWordToGroup({id, word_id: fulfilled}) )
            setEng('')
            setRus('')
            setImg(undefined)
            setAudio(undefined)
            setIncludesGroup([])
        }).catch(rejected => console.log(rejected))
    }
    function setIncludes(id: number){
        includesGroup.includes(id) 
            ? setIncludesGroup((state: number[]) => state.filter((el: number) => el !== id)) 
            : setIncludesGroup((state: number[]) => state.concat([id]))
    }
    return (
        <div> 
            <div className="p-2 my-4 grid grid-cols-9 gap-4 rounded-lg border border-gray-200">
                <div className="col-span-4">
                    <TextInput placeholder="English" value={eng} onChange={(e)=>setEng(e.target.value)}/>
                </div>
                <div className="col-span-4">
                    <TextInput placeholder="Русский" value={rus} onChange={(e)=>setRus(e.target.value)}/>
                </div>
                <div className="col-span-1">
                    <Button onClick={()=>{addNewWord()}}>Добавить</Button>
                </div>
                <div className="col-span-9">  
                    <Label htmlFor="uploadImage">Изображение</Label>
                    <FileInput id="uploadImage" name="img" onChange={(e)=>{setImg(e.target.files && e.target.files)}}/>
                </div>

                <div className="col-span-9">  
                    <Label htmlFor="uploadImage">Аудио</Label>
                    <FileInput id="uploadAudio" name="audio" onChange={(e)=>{setAudio(e.target.files && e.target.files)}}/>    
                </div>

                <div className="col-span-9"> 
                    {isSuccessGroups && groups.map((group: Group, i: number) => {
                        return (
                            <div key={i}>
                                <Checkbox checked={includesGroup.includes(group.id)} className="pt-2 mr-2" id={`addGroup${i}`} value={group.id} onChange={()=>setIncludes(group.id)}/>
                                <Label htmlFor={`addGroup${i}`}>{group.title_rus}</Label>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div>
                <h1>Поиск слов</h1>
            </div>
            <div className="p-2 my-4 rounded-lg border border-gray-200">
                <TextInput placeholder="Поиск..." value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            </div>

            <div>
                <h1>Список всех слов</h1>
            </div>
            <div className="my-4 grid grid-cols-9 gap-2 rounded-lg border border-gray-200">
                <div className="col-span-9 grid grid-cols-12 border-b py-2">
                    <div className="col-span-4 cursor-pointer text-center" onClick={()=>toggleComparator(sortByEng)}>English</div>
                    <div className="col-span-4 cursor-pointer text-center" onClick={()=>toggleComparator(sortByRus)}>Russian</div>
                    <div className="col-span-3 text-center">Медиа</div>
                    <div className="col-span-1 text-center">Delete</div>
                </div>
                    {isSuccess && isSuccessGroups &&
                    sorted.map((word: Word, i: number) => {
                            return (
                                <AdminWordsRow key={i} {...word}/>
                            )
                        })
                    }
            </div>
        </div>
    )
}