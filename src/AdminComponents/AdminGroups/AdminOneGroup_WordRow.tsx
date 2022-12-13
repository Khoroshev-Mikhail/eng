import { Checkbox } from "flowbite-react"
import { useEffect, useState } from "react"
import { deleteWordFromGroupAdminThunk, getAllWordsFromGroupAdmin, getGroupAdmin, putWordToGroupAdminThunk } from "../../app/adminAPI/groupsAdminAPISlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import { Word } from "../../app/types/types"

export default function AdminOneGroup_WordRow(props: Word){
    const group = useAppSelector(getGroupAdmin)
    const allWordsFromGroup = useAppSelector(getAllWordsFromGroupAdmin)
    const dispatch = useAppDispatch()
    const [isChecked, setIsChecked] = useState<boolean>(false)
    function checkboxHandler(){
        if(group.words.includes(props.id)){
            dispatch(deleteWordFromGroupAdminThunk({ id: group.id, word_id: props.id }))
        } else {
            dispatch(putWordToGroupAdminThunk({ id: group.id, word_id: props.id }))
        }
    }
    useEffect(()=>{
        setIsChecked(group.words.includes(props.id))
    }, [allWordsFromGroup])
    return (
        <>
            <div className="col-span-1">
                {props.id}
            </div>
            <div className="col-span-3">
                {props.eng}
            </div>
            <div className="col-span-3">
                {props.rus}
            </div>
            <div className="col-span-2 text-center">
                <Checkbox checked={isChecked} onChange={checkboxHandler}/>
            </div>
        </>
    )
}