import {defineComponent} from 'vue'

export default defineComponent({
    name: 'Dashboard',
    setup(props, ctx) {
        return () => (
            <>
                <h1>Dashboard</h1>
            </>
        );
    }
})
