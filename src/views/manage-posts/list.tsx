import {defineComponent} from 'vue'

export default defineComponent({
    name: 'list',
    setup(props, ctx) {
        return () => (
            <>
                <h1>list</h1>
            </>
        );
    }
})
