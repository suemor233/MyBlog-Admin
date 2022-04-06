import {SET_USER} from "@/store/user/actionTypes";
import {IUser} from "@/typings/user";


export default {
    [SET_USER](state: IUser, user: IUser): void {

        console.log('start')
        // @ts-ignore
        Object.assign(state.user,user)
    },
}
