<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import type { UploadFile } from 'element-plus'
import { computed, watch, onUpdated } from 'vue'
import type { Ref } from 'vue' 
import Image from '@tiptap/extension-image'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { useWrittenPostStore } from '@/stores/writtenPost.js'
import { useFileStore } from '@/stores/file.js'
import { storeToRefs } from 'pinia'

const writtenPostStore = useWrittenPostStore();
const { writtenPost } = storeToRefs(writtenPostStore);
const fileStore = useFileStore();
const { toAttachImage } = storeToRefs(fileStore);

const editor: Editor = new Editor({
    extensions: [
        StarterKit,
        Image,
    ],
    // content: writtenPost.value.content,
    onUpdate() {
        writtenPost.value.content = editor.getHTML();
    }
})


onUpdated(() => {
    if (editor.getHTML() !== writtenPost.value.content) {
        editor.commands.setContent(writtenPost.value.content);
    }
})

watch(toAttachImage, () => {
    if (toAttachImage.value === undefined || toAttachImage.value.url === null) return;
    editor.chain().focus().setImage({ src: toAttachImage.value.url! }).run();
    toAttachImage.value = undefined;
})

// onMounted(() => {
//     editor.chain().focus().setTextSelection(10).run();
// })

</script>

<template>
<div class="menu-bar" v-if="editor">
    <button type="button" @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
    </button>
    <button type="button" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
    </button>
    <button type="button" @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
    </button>
    <button type="button" @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
    </button>
    <button type="button" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
    </button>
    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
    </button>
    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
    </button>
    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
    </button>
    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
    </button>
    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
    </button>
    <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
    </button>
    <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
    </button>
    <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
    </button>
    <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
    </button>
    <button type="button" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        undo
    </button>
    <button type="button" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        redo
    </button>
</div>
<div>
    <editor-content :editor="editor" />
</div>

</template>

  
<style lang="scss">
.menu-bar {
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        font-size: 15px;
        outline: none;
        border: none;
        background: transparent;
        color: rgb(70, 70, 70);
        cursor: pointer;
    }
    button.is-active {
        background: rgb(197, 197, 197);
        padding: 2px 3px;
        border-radius: 2px;
    }
}

/* Basic editor styles */
.tiptap {
    min-height: 350px;
    padding: 5px;

    > * + * {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }
}
</style>