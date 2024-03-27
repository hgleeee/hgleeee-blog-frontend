<script setup lang="ts">
import { ref, onBeforeUpdate, onUpdated, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post.js'
import { useReplyStore } from '@/stores/reply.js'
import { type CommentRegisterForm, useCommentStore, commentState } from '@/stores/comment.js'
import { storeToRefs } from 'pinia';
import { dateExpression, convertToString } from '@/stores/utils';
import CommentSection from '@/components/post/CommentSection.vue'
import ReplySection from '@/components/post/ReplySection.vue'

const route = useRoute();
const router = useRouter();
const postId = convertToString(route.params.id);

const postStore = usePostStore();
const { postRender } = storeToRefs(postStore);
const commentStore = useCommentStore();
const { commentsInfo } = storeToRefs(commentStore);
const replyStore = useReplyStore();

const parentIdClicked = ref('');


onUpdated(() => {
  const bodyTarget = document.getElementById('body')!;
  bodyTarget.innerHTML = postRender.value.content;
})

watch(
  () => commentState.postId, 
  () => {
    commentState.currentPage = 0;
    commentStore.fetchCommentsInfo();
  }
);

watch(
  () => commentState.currentPage, 
  (newValue, oldValue) => {
    if (oldValue === 0) return;
    commentStore.fetchCommentsInfo();
  }
);

const openReplyArea = function(idx: number, id: string) {
  const replyArea = document.getElementById('reply-input')!;
  parentIdClicked.value = id;
  console.log(replyArea);
  if (replyArea.style.display !== 'none' && document.getElementById(`reply-input-area-${idx}`)!.childElementCount >= 1) {
    replyArea.style.display = 'none';
    return;
  }
  replyStore.resetReplyText();
  replyArea.style.display = 'block';
  document.getElementById(`reply-input-area-${idx}`)!.appendChild(replyArea);
}

const editPost = function() {
  router.push(`/edit/${postId}`);
}

</script>

<template>
  <div id="container">
    <div id="header">
      <div id="title">
        <h3>{{ postRender.title }}</h3>
        <div>{{ postRender.createdAt }}</div>
      </div>
      <div id="meta">
        <div>조회 수 {{ postRender.viewCount }}</div>
        <div>댓글 {{ 0 }}</div>
      </div>
    </div>
    <div id="body"></div>
    <div id="edit-area">
      <a :href="`/edit/${postId}`">글 수정</a>
    </div>
    <div id="footer">
      <h4>댓글 : {{ commentsInfo.totalCommentCount }}</h4>
      <div v-if="!commentsInfo.totalCommentCount" style="margin-left: 20px;">
        등록된 댓글이 없습니다.
      </div>

      <ul class="comment">
        <li v-for="(comment, i) in commentsInfo.comments" :key="i">
          <div class="comment-area">
            <div class="reply-head" v-if="comment.level > 0">
              <span class="reply-blank" v-for="n in (comment.level-1)" :key="n"></span>
              <font-awesome-icon icon="share" flip="vertical" style="align-items: center;" />
            </div>
            <div class="comment-name-box">
              {{ comment.authorName }}
            </div>
            <div class="comment-content-box">
              <p @click="openReplyArea(i, comment.id)">{{ comment.content }}</p>
            </div>
            <div class="comment-etc-box">
              {{ dateExpression(new Date(comment.createdAt)) }}
            </div>
          </div>
          <div :id="`reply-input-area-${i}`">
          </div>
        </li>
      </ul>

      <div id="pagination">
        <el-pagination class="custom-pagination" 
          layout="prev, pager, next" 
          :total="commentsInfo.totalCommentCount" 
          v-model:current-page="commentState.currentPage"/>
      </div>
      
      <CommentSection />
    </div>
     <!-- 답글 입력할 때 필요한 파츠 -->
    <div id="reply-input" style="display: none">
      <ReplySection />
    </div>
  </div>
  
 
</template>

<style lang="scss" scoped>
$gray-color: #aaaaaa;
$main-color: #FF5675;
@mixin content-font-regular {
  font-family: 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
}

#container {
  padding: 30px 50px;
}

#header {
  &>div {
    padding: 0.8rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: $main-color 2px solid;

    h3 {
      margin: 0 10px;
    }
    div {
      font-size: 0.8rem;
      margin-right: 10px;
    }
  }

  &>#meta {
    justify-content: flex-end;
    border-bottom: $gray-color 1px solid;
    &>div{
      margin: 2px 7px;
    }
  }
}

#body {
  padding: 20px;
  margin-bottom: 40px;
}

#edit-area {
  display: flex;
  justify-content: flex-end;
  &>a {
    text-decoration: none;
    color: #ff5656;
    &:hover {
      font-weight: bold;
    }
  }
}

#footer {
  margin: 10px 0 0 0;

  &>h4 {
    padding: 10px;
    border-top: $main-color 2px solid;
    border-bottom: #FF5675 1px dotted;
    margin: 10px 0;
  }
  &>.comment {
    list-style: none;
    padding: 0;
    &>li {
      padding: 0 10px;

      &>.comment-area {
        display: flex;
        padding: 9px 3px 7px;

        &>.reply-head {
          display: flex;
          align-items: center;
          color: $main-color; 
          font-size: 0.6rem;
          margin: 0 5px 0 0;

          &>.reply-blank {
            margin: 0 9px;
          }
        }

        &>.comment-name-box {
          display: flex;
          align-items: center;
          color: $gray-color;
          font-weight: bold;
          font-size: 0.9rem;
          min-width: 100px;
          max-width: 100px;
        }

        &>.comment-content-box {
          @include content-font-regular;
          font-size: 0.95rem;
          flex: 1;

          &>p {
            word-break: break-all;
            margin: 0;
            &:hover {
              cursor: pointer;
            }
          }
        }

        &>.comment-etc-box {
          margin-left: 10px;
          font-size: 0.8rem;
          color: rgba(70, 70, 70, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }

      }
    }
  }
}

.comment-head {
  margin: 0 2px;
}

#pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-pagination {
  --el-color-primary: rgb(255, 2, 102);
}

</style>