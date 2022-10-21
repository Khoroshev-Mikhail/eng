import { Button, Checkbox, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useDeleteWordMutation, usePutWordMutation } from "../../app/API/wordAPI"
import { Word } from "../../app/types/types"
import AdminWordsRowGroups from "./AdminWordRowGroups"

export default function AdminWordsRow(props: Word){
    const [putWord] = usePutWordMutation()
    const [deleteWord] = useDeleteWordMutation()
    const [eng, setEng] = useState(props.eng)
    const [rus, setRus] = useState(props.rus)
    const [hidden, setHidden] = useState<boolean>(false)
    function changeEngslih(e: any){
        setEng(e.target.value)
        putWord({id: props.id, eng: e.target.value, rus}) //как решается вот эта ассинхронность кроме костылей?
        //Добавить анимацию
    }
    function changeRussian(e: any){
        setRus(e.target.value)
        putWord({id: props.id, eng, rus: e.target.value})
    }
    useEffect(()=>{
        setEng(props.eng)
        setRus(props.rus)
    }, [props])
    return (
        <div className="col-span-9 grid grid-cols-12 gap-x-2 border-b border-gray-200 pb-2">
            <div className="pl-2 col-span-4 cursor-pointer">
                <TextInput placeholder="Word" value={eng} onChange={changeEngslih} />
            </div>
            <div className="col-span-4 cursor-pointer">
                <TextInput placeholder="Слово" value={rus} onChange={changeRussian} />
            </div>
            <div className="col-span-3 text-center">
                <Button.Group outline={true}>
                    <Button color={'light'} onClick={()=>{}}>Image</Button>
                    <Button color={'light'} onClick={()=>{}}>Audio</Button>
                    <Button color={'light'} onClick={()=>{setHidden(!hidden)}}>Группы</Button>
                </Button.Group>
            </div>
            <div className="pr-2 col-span-1 text-center">
                <Button color={'light'} onClick={()=>deleteWord(props.id)}>Del</Button>
            </div>

            {hidden && <AdminWordsRowGroups word_id={props.id}/>}
        </div>
        
    )
}