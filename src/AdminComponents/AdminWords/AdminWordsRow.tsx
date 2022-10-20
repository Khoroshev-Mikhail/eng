import { Checkbox, Table, TextInput } from "flowbite-react"
import { useRef, useState } from "react"
import { useGetAllWordsQuery, usePutWordMutation } from "../../app/API/wordAPI"
import { Word } from "../../app/types/types"

export default function AdminWordsRow(props: Word){
    const {data, isSuccess} = useGetAllWordsQuery()
    const [eng, setEng] = useState(props.eng)
    const [rus, setRus] = useState(props.rus)
    const [putWord] = usePutWordMutation()
    function changeEngslih(e: any){
        setEng(e.target.value)
        putWord({id: props.id, eng, rus})
    }
    function changeRussian(e: any){
        setRus(e.target.value)
    }
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="!p-4">
                <Checkbox />
            </Table.Cell>
            <Table.Cell className="!p-4 !px-2">
                {props.id}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <TextInput
                id="username"
                placeholder="Word"
                defaultValue={props.eng}
                onChange={changeEngslih}
                />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <TextInput
                id="username"
                placeholder="Слово"
                defaultValue={props.rus}
                onChange={changeRussian}
                />
            </Table.Cell>
            <Table.Cell>
                <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                DELETE
                </a>
            </Table.Cell>
        </Table.Row>
    )
}