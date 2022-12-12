import { getUser } from "../../app/clientAPI/userSliceAPI"
import { useAppSelector } from "../../app/hooks/hooks"

export default function UserPage(){
    const user = useAppSelector(getUser)
    return(
        <div>
            <h1>Управлять словарем</h1>
            <h1>Управлять текстами</h1>
            <h1>Управлять данными</h1>
            <h1>Выход</h1>
            <div>id {user.id}</div> 
            <div>token {user.token}</div>
        </div>
    )
}