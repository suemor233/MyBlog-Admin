import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import { NButton, NDataTable, NIcon, NSpace} from "naive-ui";
import {useArticleList} from "@/hooks";
import {ContentLayout} from "@/layouts/content";
import {Delete24Regular,Add12Regular} from "@vicons/fluent";

export default defineComponent({
    name: 'list',
    setup(props, ctx) {


        const data = reactive<Article[]>([])
        const checkedRowKeysRef = ref<string[]>([])
        const {createColumns,getArticle,handleDelete,slots} = useArticleList(data,checkedRowKeysRef)
        const columns = createColumns()

        const handleCheck = (rowKeys:any) => {
            checkedRowKeysRef.value = rowKeys
        }
        onMounted(()=>{
            getArticle()
        })

        return () => (
            <>

                <ContentLayout v-slots={slots}>
                    <NDataTable ref={'table'}
                                columns={columns}
                                data={data}
                                pagination={{pageSize: 15}}
                                rowKey={row => row.id}
                                onUpdateCheckedRowKeys={handleCheck}
                    />
                </ContentLayout>

            </>
        );
    }
})




