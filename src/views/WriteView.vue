<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import type { UploadFile } from 'element-plus'
import WriteUpload from '@/components/WriteUpload.vue'
import WriteBody from '@/components/WriteBody.vue'
import type { WrittenPost } from '@/stores/writtenPost.js'
import { useWrittenPostStore } from '@/stores/writtenPost.js'
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router'

const postStore = useWrittenPostStore();
const { writtenPost } = storeToRefs(postStore);



const route = useRoute();
const path: string = route.path;

let postId: string = '';

const cancel = function() {
    console.log("취소되었음!");
}

const handleSubmit = function() {
    postStore.submitPost(postId)
        .then(() => {
            window.location.href = `/${postId}`;
        });
}

onBeforeMount(() => {
    if (route.path !== '/write') {
        postId = route.params.id as string;
        postStore.fetchWrittenPost(route.params.id as string);
    } else {
        postId = postStore.createEmptyPost() as string;
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
                <WriteBody />
            </div>

            <div class="line" />

            <el-form-item>
                <WriteUpload :post-id="postId" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit()">글 작성완료</el-button>
                <el-button type="info" @click="cancel()">취소</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
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