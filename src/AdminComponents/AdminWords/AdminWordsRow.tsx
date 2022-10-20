import { Button, Checkbox, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useDeleteWordMutation, usePutWordMutation } from "../../app/API/wordAPI"
import { Word } from "../../app/types/types"

export default function AdminWordsRow(props: Word){
    const [putWord] = usePutWordMutation()
    const [deleteWord] = useDeleteWordMutation()
    const [eng, setEng] = useState(props.eng)
    const [rus, setRus] = useState(props.rus)
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
        //лучше сверстай через грид
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="text-center !p-4 !px-2">
                {props.id}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <TextInput placeholder="Word" value={eng} onChange={changeEngslih} />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <TextInput placeholder="Слово" value={rus} onChange={changeRussian} />
            </Table.Cell>
            <Table.Cell className="text-center">
                <Button color={'dark'} onClick={()=>deleteWord(props.id)}>Удалить</Button>
            </Table.Cell>
        </Table.Row>
    )
}