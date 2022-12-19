import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getLearning, getLearningThunk } from '../../app/clientAPI/learningSliceAPI'
import { getUser } from '../../app/clientAPI/userSliceAPI'
import { getVocabularyEnglish, setVocabularyAndGetUpdatedVocabularyThunk } from '../../app/clientAPI/vocabularySliceAPI'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { Word } from '../../app/types/types'
import Completed from '../StaticPages/Completed'
export default function English(){
    const dispatch = useAppDispatch()
    const vocabularyEnglish = useAppSelector(getVocabularyEnglish)
    const user = useAppSelector(getUser)
    const { id_group } = useParams()
    const { trueVariant, falseVariant, status } = useAppSelector(getLearning)
    const defaultImg = '51_ccc.jpeg'
    const answer = (word_id: number) => {
        if(trueVariant.id === word_id ){
            dispatch(setVocabularyAndGetUpdatedVocabularyThunk({method: 'english', word_id }))
        } else{
            if(user.id && id_group){
                dispatch(getLearningThunk({method: 'english', id: id_group }))
            }
        }
    }
    useEffect(()=>{
        if(user.id && id_group){
            dispatch(getLearningThunk({method: 'english', id: id_group }))
        }
    }, [id_group, user.id, vocabularyEnglish])
    const baseAudio = new Audio(`http://localhost:3002/audio/${trueVariant?.audio}`)
    baseAudio.play()
    return(
        <>  
            { id_group && status === 'fulfilled' &&
            <div className="w-full sm:w-96 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img onClick={()=>alert('repeat audio')} className="rounded-t-lg" src={'http://localhost:3002/img/' + (trueVariant.img || defaultImg)} alt="" />
                </a>
                <div className="p-5">
                    <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {trueVariant.eng}
                    </h5>
                    { falseVariant && falseVariant.map((el: Word, i: number) => {
                        return (
                            <button onClick={()=>answer(el.id)} key={i} type="button" className="text-green-700 py-4 my-4 w-full hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                                {el.rus}
                            </button>
                        )
                    })} 
                </div>
            </div>
            }
            { status === 'completed' &&  <Completed /> }
            { (status === 'error' || status === 'rejected') &&  <div>Ошибка</div> }
        </>
    )
}