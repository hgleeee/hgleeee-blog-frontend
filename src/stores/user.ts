import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import api from '@/stores/api.js'
import { callApi } from '@/stores/api.js'

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

    const changeProfileImage = function(file: Blob) {
        const formData = new FormData(); 
        formData.append('image', file);
        return new Promise((resolve, reject) => {
            callApi('multipart/form-data')
                .post('/api/profile-image/upload', formData)
                .then((response) => {
                    resolve(response.data); // 성공 시 데이터를 resolve
                })
                .catch((error) => {
                    alert("업로드 중 문제가 발생하였습니다.");
                    reject(error); // 실패 시 에러를 reject
                });
        });
    }

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

    const isAnonymous = function(): boolean {
        if (userInfo.value.role === ('ANONYMOUS' as Role)) {
          return true;
        }
        return false;
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

    return { userInfo, login, fetchUserInfo, logout, changeProfileImage, isAnonymous };
});