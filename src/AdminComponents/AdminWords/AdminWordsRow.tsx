import { Button, Checkbox, FileInput, Label, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useDeleteWordMutation, usePutWordMutation } from "../../app/API/wordRTKAPI"
import { Word } from "../../app/types/types"
import AdminWordsRowGroups from "./AdminWordRowGroups"

export default function AdminWordsRow(props: Word){
    //добавить проверку чтобы в русских вводились только русские, в английских английские
    const [putWord] = usePutWordMutation()
    const [deleteWord] = useDeleteWordMutation()
    const [eng, setEng] = useState<string>(props.eng)
    const [rus, setRus] = useState<string>(props.rus)
    const [audio, setAudio] = useState<any>(null)
    const [img, setImg] = useState<any>(null)
    const [hidden, setHidden] = useState<boolean>(false)
    function updateWord(){
        if(eng === '' || rus === ''){
            return;
        }
        const formData = new FormData();
        formData.append('id', `${props.id}`);
        formData.append('eng', eng);
        formData.append('rus', rus);
        img && formData.append('img', img[0]);
        audio && formData.append('audio', audio[0]);
        putWord(formData)
    }
    return (
        <div className="col-span-9 grid grid-cols-12 gap-x-2 border-b border-gray-200 pb-2">
            <div className="pl-2 col-span-1 cursor-pointer text-center">
                {props.id}
            </div>
            <div className="pl-2 col-span-2 cursor-pointer">
                <TextInput placeholder="Word" value={eng} onChange={(e)=>setEng(e.target.value)} />
            </div>
            <div className="col-span-2 cursor-pointer">
                <TextInput placeholder="Слово" value={rus} onChange={(e)=>setRus(e.target.value)} />
            </div>
            <div className="col-span-5 text-center">
                    <Label htmlFor="uploadImage">Изображение</Label>
                    <FileInput id="uploadImage" required name="img" onChange={(e)=>{setImg(e.target.files && e.target.files)}}/>
                    <Label htmlFor="uploadImage">Аудио</Label>
                    <FileInput sizing={'sm'} id="uploadAudio" required name="audio" onChange={(e)=>{setAudio(e.target.files && e.target.files)}}/>
                    <Button color={'light'} onClick={()=>{setHidden(!hidden)}}>Группы</Button>
            </div>
            <div className="col-span-1 cursor-pointer">
                <Button color={'light'} onClick={()=>{updateWord()}}>Save</Button>
            </div>
            <div className="pr-2 col-span-1 text-center">
                <Button color={'failure'} onClick={()=>deleteWord(props.id)}>Del</Button>
            </div>

            {hidden && <AdminWordsRowGroups word_id={props.id}/>}
        </div>
        
    )
}