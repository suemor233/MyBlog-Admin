import {NButton, NIcon, NSpace} from "naive-ui";
import {Add12Regular, Delete24Regular} from "@vicons/fluent";
import {useMediaQuery} from "@vueuse/core";

function useArticleWrite() {
    const isLargeScreen = useMediaQuery('(min-width: 550px)')

    const slots = {
        header: () => (
            <NSpace>
                <NButton secondary round type={'primary'}>
                    {{
                        icon: () => (
                            <NIcon>
                                <Add12Regular/>
                            </NIcon>
                        ),
                        default: () => `发布文章`
                    }}
                </NButton>
            </NSpace>
        )
    };

    return {
        slots
    }
}

export default useArticleWrite
