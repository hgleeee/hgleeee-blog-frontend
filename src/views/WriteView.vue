<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Editor } from "@tiptap/vue-3";
import WriteUpload from '@/components/WriteUpload.vue'
import WriteBody from '@/components/WriteBody.vue'
import { useWrittenPostStore } from '@/stores/writtenPost.js'
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router'

const writtenPostStore = useWrittenPostStore();
const { writtenPost } = storeToRefs(writtenPostStore);
const route = useRoute();
const path: string = route.path;

let postId: string = '';

const cancel = function() {
    console.log("취소되었음!");
}

const handleSubmit = function() {
    writtenPostStore.submitPost(postId)
        .then(() => {
            window.location.href = `/${postId}`;
        });
}

const editor: Editor = new Editor({
    extensions: [
        StarterKit,
        Image,
    ],
    content: writtenPost.value.content,
    onUpdate() {
        writtenPost.value.content = (editor as Editor).getHTML();
        console.log(writtenPost.value.content);
    }
});

onMounted(() => {
    writtenPostStore.fetchWrittenPost('200')
        .then(() => {
            editor.commands.setContent(writtenPost.value.content);
        });
})

onBeforeUnmount(() => {
    editor.destroy();
});

onBeforeMount(() => {
    if (route.path !== '/write') {
        postId = route.params.id as string;
    } else {
        postId = writtenPostStore.createEmptyPost() as string;
    }
});


</script>

<template>
    <div class="container">
        <h2 v-if="path === '/write'">글 작성 페이지</h2>
        <h2 v-else>글 수정 페이지</h2>
        <el-form>
            <el-form-item label="제목">
                <el-input v-model="writtenPost.title" placeholder="제목을 입력해주세요" />
            </el-form-item>
            
            <div id="write-body">
                <WriteBody :editor="editor" />
            </div>

            <div class="line" />

            <el-form-item>
                <WriteUpload :post-id="postId" :editor="editor" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit()">글 작성완료</el-button>
                <el-button type="info" @click="cancel()">취소</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.container {
    margin: 0 20px;
}

#write-body {
    margin: 50px 0;
    border: solid var(--el-border-color) 1px;
    padding: 5px;
}

.line {
    width: 100%;
    height: 0;
    margin: 30px 0 ;
    border-top: 1px solid var(--el-border-color);
}
</style>