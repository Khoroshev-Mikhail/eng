import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getReferences } from "../../../app/API/referencesSlice"
import { getOneTextThunk } from "../../../app/API/textSliceAPI"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/hooks"
import { RootState } from "../../../app/store"
import { References } from "../../References/References"

export default function TextPage(){
    const dispatch = useAppDispatch()
    const { id_text } = useParams()
    const text = useAppSelector((state: RootState) => state.oneText)
    const references = useAppSelector((state: RootState) => state.references)
    useEffect(()=>{
        if(id_text){
            dispatch(getOneTextThunk(id_text))
            dispatch(getReferences({item: 'texts', id: id_text}))
        }
    }, [])
    return(
        <>  
            {!text &&
            <div>
                <h1>Какая-то ошибка...</h1>
            </div>
            }
            {text &&
            <div>
                {references && 
                    <References />
                } 
                <h1>{text.title}</h1>
                <div>{text.text_body}</div>
            </div>
            }
        </>
    )
}