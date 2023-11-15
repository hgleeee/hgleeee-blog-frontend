<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import type { UploadFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import WriteUpload from '@/components/WriteUpload.vue'
import WriteBody from '@/components/WriteBody.vue'

interface Post {
    title: string,
    content: string,
}

const post: Post = reactive({
    title: "",
    content: "",
})

const write = function() {
    axios.post("/api/auth/signup", {
        
    })
}

const image = ref();
const attachImage = function(file: UploadFile) {
    image.value = file;
}

const postAttachImage = function() {
    image.value = null;
    console.log(image);
}

const updateEditor = function(value: string) {
    post.content = value;
    console.log(post.content);
}

</script>

<template>
    <div class="container">
        <h2>글 작성 페이지</h2>
        <el-form label-width="120px">
            <el-form-item label="제목">
                <el-input v-model="post.title" placeholder="제목을 입력해주세요" />
            </el-form-item>
            
            <div id="write-body">
                <!-- <el-input v-model="post.content" placeholder="내용을 입력해주세요" type="textarea" rows="15" /> -->
                <WriteBody :image="image" @post-attach-image="postAttachImage" @update-editor="updateEditor" />
            </div>

            <div class="line" />

            <el-form-item>
                <WriteUpload @attach-image="attachImage" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="write()">글 작성완료</el-button>
                <el-button type="info" @click="write()">취소</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
#write-body {
    margin: 50px 0 0 120px;
    border: solid var(--el-border-color) 1px;
    padding: 5px;
}

.line {
    width: 100%;
    height: 0;
    margin: 30px 0 30px 120px;
    border-top: 1px solid var(--el-border-color);
}
</style>