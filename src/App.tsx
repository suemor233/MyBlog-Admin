import {defineComponent, onMounted} from 'vue'
import {NConfigProvider, NLoadingBarProvider, NMessageProvider, useMessage} from "naive-ui";
import "./styles/App.css"
import {IconConfigProvider} from "@vicons/utils";

export default defineComponent({
    name: 'App',
    setup(props, ctx) {
        return () => (
                <NConfigProvider themeOverrides={{'common': { 'fontWeightStrong': '600' }}}>
                    <NMessageProvider>
                        <NLoadingBarProvider>
                            <router-view/>
                        </NLoadingBarProvider>
                    </NMessageProvider>
                </NConfigProvider>
        );
    }
})
