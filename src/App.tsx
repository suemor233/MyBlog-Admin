import {defineComponent, onMounted} from 'vue'
import {NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, useMessage} from "naive-ui";

import {IconConfigProvider} from "@vicons/utils";

export default defineComponent({
    name: 'App',
    setup(props, ctx) {

        return () => (
                <NConfigProvider themeOverrides={{'common': { 'fontWeightStrong': '600' }}}>
                    <NMessageProvider>
                        <NLoadingBarProvider>
                            <NDialogProvider>
                                <router-view/>
                            </NDialogProvider>
                        </NLoadingBarProvider>
                    </NMessageProvider>
                </NConfigProvider>
        );
    }
})
