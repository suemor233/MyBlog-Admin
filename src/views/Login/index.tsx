import {defineComponent, reactive, ref} from 'vue'
import classes from "./index.module.scss"
import {bgUrl} from '@/utils/env'
import {
    NButton,
    NForm,
    NFormItem,
    NInput, useLoadingBar, useMessage,
} from "naive-ui";
import {useUser} from "@/hooks";
import {useRoute} from "vue-router";


export default defineComponent({
    name: 'Login',
    setup(props, ctx) {

        (window as any).$message = useMessage();
        const {formRef,user,rules,handleValidateButtonClick} = useUser()

        return () => (
            <>
                <div class={classes.bg} style={{backgroundImage: `url(${bgUrl})`}}>
                    <div class={[classes.main,'animate__animated animate__fadeIn'].join(' ')}>
                        <div class={classes.title}>
                            <span class={classes.spanTitle}>登录</span>
                        </div>
                        <NForm ref={formRef} model={user} rules={rules}>
                            <NFormItem path={'username'} label={'用户名'} labelStyle='color: #fff'>
                                <NInput v-model:value={user.username} placeholder={'请输入用户名'}/>
                            </NFormItem>

                            <NFormItem path={'password'} label={'密码'} labelStyle='color: #fff'>
                                <NInput type={'password'} v-model:value={user.password} placeholder={'请输入密码'}/>
                            </NFormItem>
                        </NForm>
                        <div style="display: flex; justify-content: center">
                            <NButton onClick={handleValidateButtonClick} block={true} round type="primary" size={'large'} style={{marginTop:'1rem',fontSize:'1.5rem'}}>登录</NButton>
                        </div>

                    </div>
                </div>
            </>
        );
    }
})
