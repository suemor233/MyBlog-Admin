import {useUser} from "@/store/user";
import {useArticle} from "@/store/article";
import {useCategory} from "@/store/category";
const appStore:any = {};

export const registerStore = () => {
    appStore.useUser = useUser()
    appStore.useArticle = useArticle()
    appStore.useCategory = useCategory()
};

export default appStore;
