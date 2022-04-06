import {defineComponent} from 'vue'
import {ContentLayout} from "@/layouts/content";

export default defineComponent({
    name: 'Dashboard',
    setup(props, ctx) {
        return () => (
            <>
                <ContentLayout>
                    <h1>我是DashBoard</h1>
                </ContentLayout>
            </>
        );
    }
})
