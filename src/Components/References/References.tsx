import { useAppSelector } from "../../app/hooks/hooks"
import { RootState } from "../../app/store"
import GroupCard from "../GroupCard/GroupCard"
import TextCard from "../Texts/TextCard/TextCard"

export function References(){
    const references = useAppSelector((state: RootState) => state.references)
    return (
        <>
        <h1 className="m-4">С контентом связаны:</h1>
        <div className='mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
            {references &&
                <>
                    {references.group && <GroupCard {...references.group} />}
                    {references.text && <TextCard {...references.text}/>}
                </>
            }
            {/* Карточка группы? */}
            {/* Карточка аудио? */}
            {/* Карточка видео? */}
            {/*  */}
        </div>
        </>
        // Здесь отдельно карточки с грамматикой если есть
    )
}