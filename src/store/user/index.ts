
import {onMounted, reactive} from 'vue';
import { defineStore } from "pinia";
import {login, userInfo} from '@/api/modules/user';
import {getToken, setToken} from '@/utils/auth';

export const useUser = defineStore('useUser', () => {

  const user = reactive<IUser>({
    id:'',
    username:'',
    password:'',
    introduce:'',
    avatar:'',
    github:'',
    email:'',
    twitter:'',
    token:''
  })


  const userLogin = async() => {
    const res = await login({username:user.username,password:user.password})
    if (!res.success){
        (window as any).$message.error(res.data.error)
        return false
    }

    setUser(res.data);
    (window as any).$message.success('登录成功')
     setToken(res.data.token,8)
    return true
  }

  const setUser = (FUser:IUser) => {
    Object.assign(user,FUser)
  }

  ;(async ()=>{
    if (getToken()){
      const res = await userInfo()
      if (res.success){
        setUser(res.data);
      }
    }
  })()



  return {
    user,
    userLogin
  }
})
