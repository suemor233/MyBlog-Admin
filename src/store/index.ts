/**
 * 注册app状态库
 */
import {useUser} from "@/store/user";
import {useArticle} from "@/store/article";
const appStore:any = {};

export const registerStore = () => {
    appStore.useUser = useUser()
    appStore.useArticle = useArticle()
};

export default appStore;
