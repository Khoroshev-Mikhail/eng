import { Checkbox, Table, TextInput } from "flowbite-react"
import { useGetAllWordsQuery } from "../../app/API/wordAPI"
import { Word } from "../../app/types/types"
import AdminWordsRow from "./AdminWordsRow"


export default function AdminWords(){
    const {data, isSuccess} = useGetAllWordsQuery()
    return (
        <Table hoverable={true}>
            <Table.Head>
                <Table.HeadCell className="!p-4"><Checkbox /></Table.HeadCell>
                <Table.HeadCell className="!px-2">ID</Table.HeadCell>
                <Table.HeadCell>English</Table.HeadCell>
                <Table.HeadCell>Russian</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {isSuccess && 
                [...data].sort((a: Word, b: Word) => b.id - a.id).map((word: Word, i: number) => {
                        return (
                            <AdminWordsRow key={i} {...word}/>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}