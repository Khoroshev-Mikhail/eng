import { Button, FileInput, Label, Table, TextInput } from "flowbite-react"
import { useState } from "react"
import { useGetAllWordsQuery, useSetWordMutation } from "../../app/API/wordAPI"
import { Word } from "../../app/types/types"
import AdminWordsRow from "./AdminWordsRow"

const sortById = (a: Word, b: Word) => a.id - b.id
const sortByEng = (a: Word, b: Word) => a.eng.localeCompare(b.eng)
const sortByRus = (a: Word, b: Word) => a.rus.localeCompare(b.rus)

export default function AdminWords(){
    const {data, isSuccess} = useGetAllWordsQuery()
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [img, setImg] = useState<any>()
    const [audio, setAudio] = useState<any>()
    const [setWord] = useSetWordMutation()
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
    function addNewWord(body: any){
        const formData = new FormData();
        img && formData.append('img', img[0]);
        audio && formData.append('audio', audio[0]);
        formData.append('eng', eng);
        formData.append('rus', rus);
        setWord(formData);
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
                    <Button onClick={()=>{
                        addNewWord({eng, rus, img, audio})
                    }}>Добавить</Button>
                </div>
                
                <div className="col-span-9">  
                    <Label htmlFor="uploadImage">Изображение</Label>
                    <FileInput id="uploadImage" name="img" onChange={(e)=>{setImg(e.target.files && e.target.files)}}/>

                </div>

                <div className="col-span-9">  
                    <Label htmlFor="uploadImage">Аудио</Label>
                    <FileInput id="uploadAudio" name="audio" onChange={(e)=>{setAudio(e.target.files && e.target.files)}}/>    
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
                    {isSuccess &&
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