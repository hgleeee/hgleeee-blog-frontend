<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { useCommentStore, type CommentRegisterForm } from '@/stores/comment';
import { convertToString } from '@/stores/utils';
import { useReplyStore } from '@/stores/reply';
import { type Role, useUserStore } from '@/stores/user';
import { useModalStateStore } from '@/stores/modalState';

const route = useRoute();

const commentStore = useCommentStore();
const replyStore = useReplyStore();
const { replyText } = storeToRefs(replyStore);
const userStore = useUserStore();
const modalStateStore = useModalStateStore();
const { modalState } = storeToRefs(modalStateStore);

const postId = convertToString(route.params.id);
const props = defineProps(['parentIdClicked']);

const submitReply = function() {
  const replyRegisterForm: CommentRegisterForm = {
    'postId': postId as string,
    'parentCommentId': props.parentIdClicked,
    'content': replyText.value,
  };
  commentStore.registerComment(replyRegisterForm);
}



const openLoginPage = function(): void {
  if (confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
      modalState.value.openLoginPage();
    }
}

</script>
<template>
    <div id="reply-input">
      <div class="text-area">
        <el-input
          @click="openLoginPage()"
          v-if="userStore.isAnonymous()"
          v-model="replyText"
          :rows="2"
          readonly
          type="textarea"
          placeholder="답글을 입력하기 위해 로그인이 필요합니다."
        />
        <el-input
          v-else
          v-model="replyText"
          :rows="2"
          type="textarea"
          placeholder="답글을 입력해주세요"
        />
      </div>
      <div class="button-area">
        <button type="button" @click="submitReply()">
            등록
        </button>
      </div>
  </div>
</template>

<style lang="scss" scoped>
$gray-color: #aaaaaa;
$main-color: #FF5675;

#reply-input {
  display: flex;
  margin: 5px 2px 5px 30px;
  box-sizing: border-box;
  border: $gray-color 1px solid;

  &>.text-area {
    flex: 1;
    padding: 20px;
  }
  &>.button-area {
    display: flex;
    padding: 20px;
    &>button {
      width: 80px;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      color: $gray-color;
      border-color: $gray-color;
      &:hover {
          background: $gray-color;
          color: white;
      }
    }
  }
}
</style>