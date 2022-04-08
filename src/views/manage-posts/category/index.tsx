import {defineComponent} from 'vue'

import {ContentLayout} from "@/layouts/content";

export default defineComponent({
    name: 'category',
    setup(props, ctx) {
        return () => (
            <>
                <ContentLayout >

                </ContentLayout>
            </>
        );
    }
})
