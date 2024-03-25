<script lang="ts" setup>
import { reactive } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import type { LoginForm } from '@/stores/user.js'
import { useUserStore } from '@/stores/user.js'

const router = useRouter();
const userStore = useUserStore();
const loginForm: LoginForm = reactive({
    email: '',
    password: '',
})

const moveSignupPage = function() {
    window.location.href='/join';
}

const loginHandle = function() {
   try { 
    userStore.login(loginForm);
   } catch (e) {
    console.log(e);
   }
}



</script>
<template>
    <div id="body">
        <div>
            <el-input 
                placeholder="이메일"
                v-model="loginForm.email"
                type="text" 
                class="id" 
            />
        </div>
        <div class="mt-2">
            <el-input 
                placeholder="비밀번호"
                v-model="loginForm.password" 
                type="password" 
                class="pwd" 
            />
        </div>
    </div>
    <div id="footer" class="mt-3">
        <div class="upper">
            <el-button @click="loginHandle()">
                로그인
            </el-button>
            <el-button @click="moveSignupPage()">
                회원가입
            </el-button>
        </div>
        <div class="lower">
            <div class="google-login">
                <el-button class="social-button">
                    <span class="icon">
                        <font-awesome-icon icon="fa-brands fa-google" />
                    </span>
                    <span class="text">
                        Google로 로그인
                    </span>
                </el-button>
            </div>
            <div class="naver-login">
                <el-button class="social-button">
                    <span class="icon" style="font-weight: bold;">
                        <font-awesome-icon icon="fa-solid fa-n" />
                    </span>
                    <span class="text">
                        Naver로 로그인
                    </span>
                </el-button>
            </div>
            <div class="github-login">
                <el-button class="social-button">
                    <span class="icon">
                        <font-awesome-icon icon="fa-brands fa-github" />
                    </span>
                    <span class="text">
                        Github로 로그인
                    </span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    & > .upper {
        flex-direction: row;
        & > button {
            margin: 0 1px;
            width: 100%;
        }
    }

    & > .lower {
        margin: 10px 0 0 0;

        & .social-button {
            width: 300px;
            text-decoration:underline;
            font-size: 15px;
            margin-top: 2px;
            display: flex;

            & .icon {
                margin-right: 10px;
            }
        }
    }
}

#footer > .lower > .google-login > button {
    background-color: ivory;
}
#footer > .lower > .naver-login > button {
    background-color: green;
}
#footer > .lower > .github-login > button {
    background-color: black;
}
</style>