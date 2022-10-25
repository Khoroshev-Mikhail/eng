import { useGetUnlernedQuery, useSetVocabularyMutation, useWrongAnswerMutation } from '../../../app/API/vocabularyAPI'
import { Word, Group} from '../../../app/types/types'
export default function English(props: Group){
    const method = 'english'
    const defaultImg = '51_ccc.jpeg'
    const userId = 1
    const { data, isSuccess} = useGetUnlernedQuery({userId, method, groupId: props.id})
    const [ setVocabulary ] = useSetVocabularyMutation()
    const [ wrongAnswer ] = useWrongAnswerMutation()
    const answer = (id: number) => {
        if(data.trueVariant.id === id){
            setTimeout(()=> setVocabulary({userId, method, word_id: id}), 1000)
        } else{
            wrongAnswer(1)
        }
    }
    console.log(data, data === true)
    return(
        <>  
            {isSuccess && data !== null && data !== undefined &&
            <div className="w-full sm:w-96 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img onClick={()=>alert('repeat audio')} className="rounded-t-lg" src={'http://localhost:3002/img/' + (data.trueVariant.img || defaultImg)} alt="" />
                </a>
                <div className="p-5">
                    <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.trueVariant.eng}</h5>
                    {data.falseVariant.map((el: Word, i: number) => {
                        return (
                            <button onClick={()=>answer(el.id)} key={i} type="button" className="text-green-700 py-4 my-4 w-full hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                                {el.rus}
                            </button>
                        )
                    })} 
                </div>
            </div>
            }
        </>
    )
}