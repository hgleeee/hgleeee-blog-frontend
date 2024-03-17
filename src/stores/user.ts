import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
import axios from 'axios'
import api from '@/stores/api.js'

export type LoginForm = {
    email: string,
    password: string,
}

export type ReissueForm = {
    accessToken: string,
}

export type Role = 'ADMIN' | 'USER' | 'ANONYMOUS';

export type UserInfo = {
    name: string,
    email: string,
    role: Role,
    profileImageUrl: string,
}

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo>({
        name: '',
        email: '',
        role: 'ANONYMOUS',
        profileImageUrl: '',
    })

    const login = function(loginForm: LoginForm) {
        axios.post('/api/auth/login', loginForm)
            .then((response) => {
                setAccessToken(response.data.accessToken);
            })
            .catch(() => {
                alert("로그인 실패!");
            });
    }

    const fetchUserInfo = async function() {
        // axios.get('/api/user/info')
        //     .then((response) => {
        //         userInfo.value = response.data;
        //     })
        //     .catch(() => {
        //         console.log("유저 정보를 불러오기 위해서는 로그인 필요");
        //     });
        console.log(getAccessToken());
        api.get('/api/user/info')
            .then((response) => {
                userInfo.value = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function logout(): void {
        localStorage.removeItem("accessToken");
    }

    function setAccessToken(newAccessToken: string): void {
        localStorage.setItem("accessToken", newAccessToken);
    }

    function getAccessToken(): string | null {
        return localStorage.getItem("accessToken");
    }

    return { userInfo, login, fetchUserInfo, logout };
});