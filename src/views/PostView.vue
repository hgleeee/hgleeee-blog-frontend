<script setup lang="ts">
import { ref, onBeforeMount, onUpdated, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post.js'
import { type CommentRegisterForm, useCommentStore } from '@/stores/comment.js'
import { storeToRefs } from 'pinia';
import { dateExpression } from '@/stores/utils';

const route = useRoute();
const commentText = ref('');
const replyText = ref('');
const postId = route.params.id;
const postStore = usePostStore();
const { postRender } = storeToRefs(postStore);
const commentStore = useCommentStore();
const { commentsInfo } = storeToRefs(commentStore);
const currentPage = ref(0);
const parentIdClicked = ref('');

onBeforeMount(() => {
  postStore.fetchPost(BigInt(postId as string));
  commentStore.fetchCommentsInfo(BigInt(postId as string))
    .then(() => {
      currentPage.value = Math.ceil(Number(commentsInfo.value.totalCommentCount) / 10);
    });
  }
)

onUpdated(() => {
  const bodyTarget = document.getElementById('body')!;
  bodyTarget.innerHTML = postRender.value.content;
})

watch(currentPage, () => {
  console.log(currentPage.value);
  commentStore.fetchCommentsInfo(BigInt(postId as string), currentPage.value);
})

const openReplyArea = function(idx: number, id: string) {
  const replyArea = document.getElementById('reply-input')!;
  // console.log(document.getElementById('reply-input-area'+idx)!.childElementCount);
  parentIdClicked.value = id;
  if (replyArea.style.display !== 'none' && document.getElementById(`reply-input-area-${idx}`)!.childElementCount >= 1) {
    replyArea.style.display = 'none';
    return;
  }
  replyArea.style.display = 'flex';
  replyText.value = '';
  document.getElementById(`reply-input-area-${idx}`)!.appendChild(replyArea);
}

const submitComment = function() {
  const commentRegisterForm: CommentRegisterForm = {
    'postId': postId as string,
    'parentCommentId': null,
    'content': commentText.value,
  };
  commentStore.registerComment(commentRegisterForm);
}

const submitReply = function() {
  const replyRegisterForm: CommentRegisterForm = {
    'postId': postId as string,
    'parentCommentId': parentIdClicked.value,
    'content': replyText.value,
  };
  commentStore.registerComment(replyRegisterForm);
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
          v-model:current-page="currentPage"/>
      </div>
      
      <div id="comment-input">
        <div class="text-area">
          <el-input
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

    </div>
  </div>
  
  <!-- 답글 입력할 때 필요한 파츠 -->
  <div id="reply-input">
    <div class="text-area">
      <el-input
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
}

#footer {
  margin: 50px 0 0 0;

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

  &>#comment-input {
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
}

.comment-head {
  margin: 0 2px;
}

#reply-input {
  display: none;
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

#pagination {
  display: flex;
  justify-content: center;
  align-items: center;

}

.custom-pagination {
  --el-color-primary: rgb(255, 2, 102);
}

</style>