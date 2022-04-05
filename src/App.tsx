import {defineComponent} from 'vue'
import {NMessageProvider} from "naive-ui";
import "./styles/App.css"

export default defineComponent({
    name: 'App',
    setup(props, ctx) {
        return () => (
            <div>
                <n-config-provider theme-overrides="{ common: { fontWeightStrong: '600' } }">
                    <NMessageProvider>
                        <router-view/>
                    </NMessageProvider>
                </n-config-provider>
            </div>


        );
    }
})
