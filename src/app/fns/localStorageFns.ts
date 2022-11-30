import { ID, JWT_EXPIRE, USER_LOGIN, REFRESH_TOKEN, TOKEN } from "../variables/localStorageVariables";
import { User } from "../types/types";

export function setUserToLocalStorage(user: User){
    localStorage.setItem(ID, String(user.id));
    user.user_login && localStorage.setItem(USER_LOGIN, user.user_login);
    user.token && localStorage.setItem(TOKEN, user.token);
    user.refresh_token && localStorage.setItem(REFRESH_TOKEN, user.refresh_token);
    user.jwtExpire && localStorage.setItem(JWT_EXPIRE, String(user.jwtExpire)); //Изменить на нижнее подчеркивание //Уточнить тип
}
export function removeUserFromLocalStorage(){
    localStorage.removeItem(ID)
    localStorage.removeItem(USER_LOGIN)
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(JWT_EXPIRE)
}