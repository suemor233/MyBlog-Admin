/**
 * 注册app状态库
 */
import {useUser} from "@/store/user";

const appStore: any = {};

export const registerStore = () => {
    appStore.useUser = useUser()
};

export default appStore;
