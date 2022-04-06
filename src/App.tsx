import {defineComponent} from 'vue'
import {NLoadingBarProvider, NMessageProvider} from "naive-ui";
import "./styles/App.css"

export default defineComponent({
    name: 'App',
    setup(props, ctx) {
        return () => (
            <div>
                    <NMessageProvider>
                        <NLoadingBarProvider>
                            <router-view/>
                        </NLoadingBarProvider>
                    </NMessageProvider>
            </div>


        );
    }
})
