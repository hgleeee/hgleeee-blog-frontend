import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
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
    const router = useRouter();

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
                window.location.reload();
            })
            .catch(() => {
                alert("로그인 실패!");
            });
    }

    const fetchUserInfo = async function() {
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
        api.post('/api/auth/logout')
            .then(() => {
                localStorage.removeItem("accessToken");
                const { cookies } = useCookies();
                cookies.remove("refreshToken");
                router.go(0);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function setAccessToken(newAccessToken: string): void {
        localStorage.setItem("accessToken", newAccessToken);
    }

    function getAccessToken(): string | null {
        return localStorage.getItem("accessToken");
    }

    return { userInfo, login, fetchUserInfo, logout };
});