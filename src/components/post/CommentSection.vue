<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { type CommentRegisterForm, useCommentStore, commentState } from '@/stores/comment.js'
import { convertToString } from '@/stores/utils';
import { useUserStore } from '@/stores/user';
import { useModalStateStore } from '@/stores/modalState';
import { storeToRefs } from 'pinia';

const commentStore = useCommentStore();
const userStore = useUserStore();
const modalStateStore = useModalStateStore();
const { modalState } = storeToRefs(modalStateStore);

const commentText = ref('');
const route = useRoute();
const postId = convertToString(route.params.id);

const submitComment = function() {
  const commentRegisterForm: CommentRegisterForm = {
    'postId': postId as string,
    'parentCommentId': null,
    'content': commentText.value,
  };
  commentStore.registerComment(commentRegisterForm);
}

const openLoginPage = function(): void {
    if (confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
        modalState.value.openLoginPage();
    }
}

</script>
<template>
    <div id="comment-input">
        <div class="text-area">
            <el-input
                v-if=userStore.isAnonymous()
                v-model="commentText"
                readonly
                :rows="2"
                type="textarea"
                placeholder="댓글 입력을 위해 로그인이 필요합니다."
                @click="openLoginPage()"
            />
            <el-input
                v-else
                v-model="commentText"
                :rows="2"
                type="textarea"
                placeholder="댓글을 입력해주세요"
            />
        </div>
        <div class="button-area">
            <button type="button" @click="submitComment()">
                등록
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$gray-color: #aaaaaa;
$main-color: #FF5675;

#comment-input {
    display: flex;
    margin: 20px 5px 0 5px;
    box-sizing: border-box;
    border-top: $main-color 2px solid;
    border-bottom: $main-color 2px solid;

    &>div {
        padding: 20px;
        display: flex;
    }
    &>.text-area {
        flex: 12;
    }
    &>.button-area {
        flex: 1;

        &>button {
            width: 100%;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            color: $main-color;
            border-color: $main-color;
            &:hover {
                background: $main-color;
                color: white;
            }
        }
    }
}
</style>