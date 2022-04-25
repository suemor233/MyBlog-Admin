import {defineComponent} from 'vue'
import {NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider} from "naive-ui";
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
