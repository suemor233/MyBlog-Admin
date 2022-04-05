import {defineComponent, reactive, ref} from 'vue'
import classes from "./index.module.scss"
import {bgUrl} from '@/constants/env'
import {FormInst, NButton, NCard, NForm, NFormItem, NGradientText, NInput, NSpace, useMessage} from "naive-ui";

export default defineComponent({
    name: 'Login',
    setup(props, ctx) {
        const message = useMessage()
        const user = reactive({
            username: '',
            password: ''
        })


        const formRef = ref<FormInst | null>(null)

        const handleValidateButtonClick = (e:MouseEvent)=>{
            e.preventDefault()
            formRef.value?.validate((errors) => {
                if (!errors) {
                    message.success('登录成功')
                } else {
                    console.log(errors)
                    message.error('验证失败')
                }
            })
        }
        return () => (
            <>
                <div class={classes.bg} style={{backgroundImage: `url(${bgUrl})`}}>
                    <div class={classes.main}>
                        <div class={classes.title}>
                            <span class={classes.spanTitle}>登录</span>
                        </div>
                        <NForm ref={formRef} model={user}>
                            <NFormItem path={'username'} label={'用户名'} labelStyle='color: #fff'>
                                <NInput v-model:value={user.username}/>
                            </NFormItem>

                            <NFormItem path={'password'} label={'密码'} labelStyle='color: #fff'>
                                <NInput type={'password'} v-model:value={user.password}/>
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
