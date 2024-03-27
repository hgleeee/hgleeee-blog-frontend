<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useModalStateStore } from '@/stores/modalState'
import { storeToRefs } from 'pinia'

const userStore = useUserStore();
const modalStateStore = useModalStateStore();
const { userInfo } = storeToRefs(userStore);
const { modalState } = storeToRefs(modalStateStore);

const file: Ref<File | null> = ref(null);


function base64 (file: File) {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const target = e.target as FileReader;
            resolve(target.result)
            const imagePreview = document.getElementById('preview') as HTMLImageElement;
            imagePreview.src = target.result as string;
        }
        fileReader.readAsDataURL(file);
    })
}

async function handleFileChange (this: any, event: Event) {
    if (event.target instanceof HTMLInputElement) {
        if (event.target.files === null) {
            alert('파일이 제대로 업로드되지 않음');
        }
        this.file = (event.target.files as FileList)[0];
        console.log(this.file);
        await this.base64(this.file);
    }
}

function localChangeProfileImage() {
    userStore.changeProfileImage(file.value as Blob)
        .then(() => {
            userStore.fetchUserInfo();
            modalState.value.closeModal();
        });
}

function cancel() {
    modalState.value.closeModal();
}

</script>
<template>
    <div id="body">
        <div class="wrapper">
            <div class="before-area">
                <div class="profile-image">
                    <img v-if="userInfo.profileImageUrl === null" src="@/image/empty_profile.png">
                    <img v-else :src="userInfo.profileImageUrl">
                </div>
                <div class='description'>
                    현재 프로필 사진
                </div>
            </div>
            <div class="arrow">
                <img src="@/image/arrow.png">
            </div>
            <div class="after-area">
                <div class="profile-image">
                    <input type="file" id="upload-image" hidden @change="handleFileChange($event)" />
                    <label for="upload-image">
                        <img id="preview" src="@/image/upload_image.png" />
                    </label>
                </div>
                <div class='description'>
                    변경할 프로필 사진
                </div>
            </div>
        </div>        
        <div class="footer">
            <el-button type="submit" @click="localChangeProfileImage()">변경사항 저장</el-button>
            <el-button type="submit" @click="cancel()">취소</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#body {
    &>.wrapper {
        margin: 0 auto;
        display: flex;
        width: 600px;
        padding: 20px;
        justify-content: center;
        align-items: center;
        & > .before-area {
            width: 200px;
            margin: 10px 50px;
        }
        & > .after-area {
            width: 200px;
            margin: 10px 50px;
        }
        .profile-image {
            width: 200px;
            height: 200px;
            img {
                width: 200px;
                height: 200px;
            }
        }
        .arrow {
            img {
                width: 100px;
            }
        }

        .description {
            padding-top: 5px;
            text-align: center;
            font-size: 16px;
        }

        #preview {
            margin: auto;
            &:hover {
                cursor: pointer;
                background-color: gainsboro;
            }
        }
    }

    &>.footer {
        text-align: right;
        margin: 30px 30px 0 0;

        .el-button {
            font-weight: bold;
            color: #FF5675;
            border-color: #FF5675;
            width: 130px;
            height: 40px;
            &:hover {
                background: #FF5675;
                color: white;
            }
        }
    }
}
</style>