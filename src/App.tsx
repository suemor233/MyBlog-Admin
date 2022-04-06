import {defineComponent, onMounted} from 'vue'
import {NConfigProvider, NLoadingBarProvider, NMessageProvider} from "naive-ui";
import "./styles/App.css"

export default defineComponent({
    name: 'App',
    setup(props, ctx) {
        return () => (
            <div>
                <NConfigProvider theme-overrides="{ common: { fontWeightStrong: '600' } }">
                    <NMessageProvider>
                        <NLoadingBarProvider>
                            <router-view/>
                        </NLoadingBarProvider>
                    </NMessageProvider>
                </NConfigProvider>


            </div>


        );
    }
})
