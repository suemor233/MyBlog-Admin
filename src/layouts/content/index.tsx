import {NButton, NLayoutContent, NLayoutFooter, NLayoutHeader} from 'naive-ui'
import {
    computed,
    defineComponent,
    PropType,
} from 'vue'
import {useRouter} from "vue-router";
import classes from "./index.module.scss";
import Header from "@/layouts/Header";


export const ContentLayout = defineComponent({
    props: {
        actionsElement: {
            type: Object as PropType<JSX.Element | null>,
            required: false,
        }
    },
    setup(props, ctx) {
        const {slots} = ctx
        const router = useRouter()
        const route = computed(() => router.currentRoute)

        const pageTitle = computed(
            () =>
                route.value.value.matched.reduce(
                    (t, cur) =>
                        t +
                        (cur.meta.title
                            ? // t 不为空, 补一个 分隔符
                            t.length > 0
                                ? ' · ' + cur.meta.title
                                : cur.meta.title
                            : ''),
                    '',
                ),
        )

        return () => (
            <>
                <NLayoutHeader class={classes.MyBk}>
                    <span class={classes.title}>{pageTitle.value}</span>
                    <Header class={classes.header}>{ slots.header?.()}</Header>
                </NLayoutHeader>
                <NLayoutContent class={classes.MyBk}>
                    {slots.default?.()}
                </NLayoutContent>
            </>
        )
    },
})
