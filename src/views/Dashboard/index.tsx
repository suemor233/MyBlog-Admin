import {defineComponent} from 'vue'
import {ContentLayout} from "@/layouts/content";
import {NButton} from "naive-ui";
import {removeToken} from "@/utils/auth";
import {useRouter} from "vue-router";

export default defineComponent({
    name: 'Dashboard',
     async setup(props, ctx) {
        const router = useRouter()


        return () => (
            <>
                <ContentLayout>
                    <NButton onClick={()=>{removeToken();router.push('/Login')}}>dashboard exit login</NButton>
                </ContentLayout>
            </>
        );
    }
})
