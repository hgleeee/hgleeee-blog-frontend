<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";

const email = ref("")
const password = ref("")

const write = function() {
    axios.post("/api/auth/signup", {
        name: "lee",
        email: email.value,
        password: password.value
    })
}

</script>

<template>
    <div>
        <el-input v-model="email" placeholder="제목을 입력해주세요" />
    </div>
    <div class="mt-2">
        <el-input v-model="password" type="textarea" rows="15" />
    </div>
    <div class="mt-2">
        <el-button type="primary" @click="write()">글 작성완료</el-button>
    </div>
</template>

<style>
</style>