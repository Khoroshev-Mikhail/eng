import { Breadcrumb } from "flowbite-react";
import { HomeIcon } from '@heroicons/react/24/solid'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {Link } from "react-router-dom";
import { useGetGroupsQuery } from "../../app/API/groupsAPI";

type RouteType = {
    path: string,
    breadcrumb: string
}
export default function(){
    const defaultRoutes = [
        { path: "/", breadcrumb: "Главная" },
        { path: "/texts", breadcrumb: "Тексты" },
        { path: "/words", breadcrumb: "Слова" },
        { path: "/words/:id_group/English", breadcrumb: "Английский - Русский" },
        { path: "/words/:id_group/Russian", breadcrumb: "Русский - Английский" },
        { path: "/words/:id_group/Spelling", breadcrumb: "По буквам" },
        { path: "/words/:id_group/Auding", breadcrumb: "Аудирование" },
        { path: "/Authorization", breadcrumb: "Авторизация" },
      ];
    const {data: groups = [], isSuccess} = useGetGroupsQuery()
    //Добавь также с текстами
    const routesFromGroup: RouteType[] = isSuccess ? groups.map(el => ({path: `/words/${el.id}`, breadcrumb: el.title_rus})) : []
    const routes = defaultRoutes.concat(routesFromGroup)
    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <Breadcrumb aria-label="Default breadcrumb example" className="m-2 my-4">
            {breadcrumbs.map(({ breadcrumb, match }) => {
                return (
                    <Breadcrumb.Item icon={match.pathname === '/' ? HomeIcon : undefined} key={match.pathname}>  
                        <Link to={match.pathname} style={match.pathname === '/' ? {minHeight: '21px', paddingTop: '2px'} : {}}> {/* вылечи костыль! Первая крошка прыгает когда добавляется следующая потому что у первой высота 17.5 а у второй(стрелки) 21px */}
                            {breadcrumb}
                        </Link>{/* При клике страница перезагружается */}
                    </Breadcrumb.Item>
                )
            })}
            
        </Breadcrumb>
    )
}