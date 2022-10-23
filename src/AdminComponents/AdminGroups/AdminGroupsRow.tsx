import { Button, Checkbox, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useDeleteGroupMutation, usePutGroupMutation } from "../../app/API/groupsAPI"
import { Group } from "../../app/types/types"

export default function AdminGroupsRow(props: Group){
    const [putGroup] = usePutGroupMutation()
    const [deleteGroup] = useDeleteGroupMutation()
    const [title, setTitle] = useState(props.title)
    const [title_rus, setTitleRus] = useState(props.title_rus)
    function changeEngslih(e: any){
        setTitle(e.target.value)
        putGroup({id: props.id, title: e.target.value, title_rus}) //как решается вот эта ассинхронность кроме костылей?
    }
    function changeRussian(e: any){
        setTitleRus(e.target.value)
        putGroup({id: props.id, title, title_rus: e.target.value})
    }
    useEffect(()=>{
        setTitle(props.title)
        setTitleRus(props.title_rus)
    }, [props])
    return (
        //лучше сверстай через грид
        <div className="col-span-9 grid grid-cols-7 gap-x-2 border-b border-gray-200 pb-2">
            <div className="pl-2 col-span-3 cursor-pointer">
                <TextInput placeholder="Group" value={title} onChange={changeEngslih} />
            </div>
            <div className="col-span-3 cursor-pointer">
                <TextInput placeholder="Группа" value={title_rus} onChange={changeRussian} />
            </div>
            <div className="pr-2 col-span-1 cursor-pointer">
                <Button color={'light'} onClick={()=>deleteGroup(props.id)}>Удалить</Button>
            </div>
        </div>
    )
}