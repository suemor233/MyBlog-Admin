import {reactive, ref} from "vue";
import {FormInst, FormRules, useMessage} from "naive-ui";
import {login} from "@/api/modules/user";
import {IAxios} from "@/typings/axiosCode";
import {useRouter} from "vue-router";
import {setToken} from "@/utils/auth";
import {useStore} from "vuex";
import {SET_USER} from "@/store/user/actionTypes";
import {IUser} from "@/typings/user";

function useUser() {

    const router = useRouter()
    const store = useStore()

    const user = reactive({
        username: '',
        password: ''
    })

    const formRef = ref<FormInst | null>(null)

    const rules: FormRules = {
        username: [
            {
                required: true,
                message: '请输入用户名'
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码'
            }
        ],
    }

    const handleValidateButtonClick = (e:MouseEvent)=>{
        e.preventDefault()

        formRef.value?.validate(async (errors) => {
            if (errors) {
                return
            }
            const {username,password} = user
            const res = await login({username,password}) as IAxios
            if (!res.success){
                (window as any).$message.error(res.data.error)
                return
            }

            setUser(res.data);
            (window as any).$message.success('登录成功')
            setToken(res.data.token,8)
            await router.push('/dashboard')
        })
    }

    const setUser = (user:IUser) => {
        store.dispatch(SET_USER,user)
    }

    return {
        formRef,
        user,
        rules,
        setUser,
        handleValidateButtonClick
    }

}

export default useUser
