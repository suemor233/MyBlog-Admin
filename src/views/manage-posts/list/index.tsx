import {defineComponent, h, onMounted, reactive, ref} from 'vue'
import {useRoute} from "vue-router";
import classes from "./index.module.scss";
import {DataTableColumns, NButton, NDataTable, NPopconfirm, useMessage} from "naive-ui";

import {useArticleList} from "@/hooks";

export default defineComponent({
    name: 'list',
    setup(props, ctx) {
        const route = useRoute()
        const data = reactive<Article[]>([])
        const {createColumns,getArticle} = useArticleList(data)
        const columns = createColumns()
        const checkedRowKeysRef = ref<string[]>([])
        const handleCheck = (rowKeys:any) => {
            checkedRowKeysRef.value = rowKeys
        }
        onMounted(()=>{
            getArticle()
        })

        return () => (
            <>
                <p class={classes.title}>{'博文 · ' + route.meta.title}</p>
                <NDataTable ref={'table'}
                            columns={columns}
                            data={data}
                            pagination={{pageSize: 15}}
                            rowKey={row => row.id}
                            onUpdateCheckedRowKeys={handleCheck}
                />
            </>
        );
    }
})




