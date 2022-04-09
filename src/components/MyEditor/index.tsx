import {defineComponent, onMounted, ref} from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
export default defineComponent({
    name: 'MyEditor',
    emits: ["handleSave","handleText"],
    setup(props, ctx) {
        const text = ref()
        const {emit} = ctx
        onMounted(()=>{
            emit('handleText',text)
        })
        return () => (
            <>
                <MdEditor style={{height:'80vh'}}
                          modelValue={text.value}
                          onSave={()=>emit('handleSave')}
                          onChange={(v: string) => (text.value = v)}
                />
            </>
        );
    }
})
