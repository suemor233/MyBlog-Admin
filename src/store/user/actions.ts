import {GET_USER, SET_USER} from "@/store/user/actionTypes";
import {ICtx, IUser} from "@/typings/user";

export default {
    [SET_USER]({commit, state}: ICtx, todo: IUser): void {
        commit(SET_USER, todo)
    }
}
