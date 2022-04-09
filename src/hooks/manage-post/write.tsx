import {NButton, NIcon, NSpace} from "naive-ui";
import {Add12Regular, Save16Regular} from "@vicons/fluent";
import {useMediaQuery} from "@vueuse/core";

function useArticleWrite(handleSave: () => void) {

    const slots = {
        header: () => (
            <NSpace>
                <NButton secondary round type={'info'} onClick={handleSave}>
                    {{
                        icon: () => (
                            <NIcon>
                                <Save16Regular/>
                            </NIcon>
                        ),
                        default: () => `保存`
                    }}
                </NButton>
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
