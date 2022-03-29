<template>
  <div
    class="base-editor"
    ref="editorRef"
    :style="{ width: width ? `${width}px` : '100%' }"
  ></div>
</template>

<script lang="ts" setup>
import {
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  defineProps,
  withDefaults,
  defineEmits
} from 'vue'
import type Editor from 'wangeditor'
import WangEditor from 'wangeditor'

interface EditorInfo {
  html: string
  text: string
}

const props = withDefaults(
  defineProps<{
    value?: string
    zIndex?: number
    height?: number
    width?: number
    focus?: boolean
  }>(),
  {
    value: '',
    zIndex: 500,
    height: 500,
    width: 0,
    focus: false
  }
)
const emit = defineEmits(['update:value'])

const editorRef = ref<HTMLDivElement | null>(null)
const isInitContent = ref<boolean>(false)
const content = reactive<EditorInfo>({
  html: '',
  text: ''
})
const instance = ref<Editor | null>(null)

watch(
  () => props.value,
  () => {
    initEditorContent(props.value, true)
  }
)

onMounted(() => {
  createWangEditor()
})
onBeforeUnmount(() => {
  if (!instance.value) return
  instance.value.destroy()
  instance.value = null
})

const createWangEditor = () => {
  instance.value = new WangEditor(editorRef.value)
  setEditorConfig()
  instance.value.create()
  initEditorContent(props.value)
}

const setEditorConfig = () => {
  if (!instance.value) return
  const editor: Editor = instance.value as Editor
  editor.config.height = props.height
  editor.config.zIndex = props.zIndex
  editor.config.focus = props.focus

  editor.config.onchange = (newHtml: string) => {
    content.html = newHtml
    content.text = editor.txt.text()
    if (!isInitContent.value) {
      emit('update:value', content.html)
    }
    isInitContent.value = false
  }
  editor.config.onchangeTimeout = 500

  editor.config.menus = [
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    // 'todo',
    'justify',
    'quote',
    // 'emoticon',
    // 'image',
    // 'video',
    // 'table',
    'code',
    'splitLine',
    'undo',
    'redo'
  ]
}

const initEditorContent = (htmlStr: string, isFocus = false) => {
  if (!instance.value) return
  const editor: Editor = instance.value as Editor
  editor.config.focus = isFocus
  if (!htmlStr) return
  isInitContent.value = true
  editor.txt.html(htmlStr)
}
</script>

<style lang="less" scoped></style>
