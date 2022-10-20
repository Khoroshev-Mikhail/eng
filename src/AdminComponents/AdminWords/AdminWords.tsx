import { Button, Table, TextInput } from "flowbite-react"
import { useState } from "react"
import { useGetAllWordsQuery } from "../../app/API/wordAPI"
import { Word } from "../../app/types/types"
import AdminWordsRow from "./AdminWordsRow"

const sortById = (a: Word, b: Word) => a.id - b.id
const sortByEng = (a: Word, b: Word) => a.eng.localeCompare(b.eng)
const sortByRus = (a: Word, b: Word) => a.rus.localeCompare(b.rus)

export default function AdminWords(){
    const {data, isSuccess} = useGetAllWordsQuery()
    const [comparator, setComparator] = useState<{fn: any, increase: boolean}>({fn: sortById, increase: true})
    const [filter, setFilter] = useState<string>('')
    const sorted = isSuccess 
        ? comparator.increase 
            ? [...data].sort(comparator.fn).filter(el => el.eng.toLowerCase().includes(filter.toLowerCase()) || el.rus.toLowerCase().includes(filter.toLowerCase())) 
            : [...data].sort(comparator.fn).filter(el => el.eng.toLowerCase().includes(filter.toLowerCase()) || el.rus.toLowerCase().includes(filter.toLowerCase())).reverse()
        : []
    function toggleComparator(currentComparator: any){
        setComparator(({fn, increase}) => {
            return {
                fn: currentComparator,
                increase: fn === currentComparator ? !increase : true
            };
        })
    }
    return (
        <div> 
            <div className="my-4 grid grid-cols-7 gap-4">
                <div className="col-span-3">
                    <TextInput placeholder="English" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
                </div>
                <div className="col-span-3">
                    <TextInput placeholder="Русский" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
                </div>
                <div className="col-span-1">
                    <Button>Добавить слово</Button>
                </div>
            </div>
            <div className="my-4">
                <TextInput placeholder="Поиск" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            </div>

            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell onClick={()=>toggleComparator(sortById)} className="text-center !px-2 cursor-pointer">ID</Table.HeadCell>
                    <Table.HeadCell onClick={()=>toggleComparator(sortByEng)} className="cursor-pointer">English</Table.HeadCell>
                    <Table.HeadCell onClick={()=>toggleComparator(sortByRus)} className="cursor-pointer">Russian</Table.HeadCell>
                    <Table.HeadCell className="text-center">Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {isSuccess &&
                    sorted.map((word: Word, i: number) => {
                            return (
                                <AdminWordsRow key={i} {...word}/>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </div>
    )
}