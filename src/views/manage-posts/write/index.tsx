import {defineComponent, ref} from 'vue'
import classes from "./index.module.scss";

import {ContentLayout} from "@/layouts/content";
import useArticleWrite from "@/hooks/manage-post/write";
import {useRouter} from "vue-router";
import {NInput} from "naive-ui";
import MyEditor from "@/components/MyEditor";


export default defineComponent({
    name: 'write',
    setup(props, ctx) {
        const {slots} = useArticleWrite()
        const router = useRouter()
        const value = ref(null)
        const text = ref('');

        return () => (
            <>
                <ContentLayout title={`博文 · ${router.currentRoute.value.query.id ? '修改' : '撰写'}`} v-slots={slots}>
                    <div class={classes.myMarkdown}>
                        <NInput class={classes.mInput}  v-model={value.value} type={'text'} placeholder={'在这里输入主人的文章标题'}/>
                        <MyEditor/>
                    </div>
                </ContentLayout>
            </>
        );
    }
})
