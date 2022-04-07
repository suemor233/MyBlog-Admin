import {defineComponent} from 'vue'

export default defineComponent({
    name: 'Header',
    setup(props, ctx) {
        const {slots} = ctx
        return () => (
                <div>
                    {
                        slots.default ? slots.default() : null
                    }
                </div>
        );
    }
})
