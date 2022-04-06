import {defineComponent} from 'vue'

export default defineComponent({
    name: 'SideBar',
    setup(props, ctx) {
        return () => (
            <>
                <p>我是sideBar</p>
            </>
        );
    }
})
