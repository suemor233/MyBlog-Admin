import {defineComponent, ref} from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import screenfull from 'screenfull';
export default defineComponent({
    name: 'MyEditor',
    setup(props, ctx) {
        const text = ref()
        return () => (
            <>
                <MdEditor style={{height:'80vh'}}  screenfull={screenfull} modelValue={text.value} onSave={(str)=>console.log(str)} onChange={(v: string) => (text.value = v)} />
            </>
        );
    }
})
