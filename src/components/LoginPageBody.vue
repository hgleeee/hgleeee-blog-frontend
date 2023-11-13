<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'

const email: Ref<String> = ref('');
const password: Ref<String> = ref('');

</script>
<template>
    <div id="body">
        <div>
            <el-input 
                placeholder="이메일"
                v-model="email"
                type="text" 
                class="id" 
            />
        </div>
        <div class="mt-2">
            <el-input 
                placeholder="비밀번호"
                v-model="password" 
                type="password" 
                class="pwd" 
            />
        </div>
    </div>
    <div id="footer" class="mt-3">
        <div class="upper">
            <el-button>
                로그인
            </el-button>
            <el-button>
                회원가입
            </el-button>
        </div>
        <div class="lower">
            <el-button>
                Google로 로그인
            </el-button>
            <el-button>
                Naver로 로그인
            </el-button>
            <el-button>
                Github로 로그인
            </el-button>
        </div>
    </div>
</template>

<style scoped>
#footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#footer > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#footer > .upper {
    flex-direction: row;
}
#footer > .upper > .el-button {
    margin: 0 1px;
}
#footer .el-button {
    width: 100%;
}
#footer > .lower {
    width: 80%;
    margin: 10px 0 0 0;
}
#footer > .lower > .el-button {
    text-decoration:underline;
}

#footer > .lower > .el-button:nth-child(1) {
    background-color: ivory;
}
#footer > .lower > .el-button:nth-child(2) {
    color: white;
    background-color: green;
}
#footer > .lower > .el-button:nth-child(3) {
    background-color: black;
}
</style>