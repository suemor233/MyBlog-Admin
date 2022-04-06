import {defineComponent} from 'vue'

export default defineComponent({
    name: 'write',
    setup(props, ctx) {
        return () => (
            <>
                <h1>write</h1>
            </>
        );
    }
})
