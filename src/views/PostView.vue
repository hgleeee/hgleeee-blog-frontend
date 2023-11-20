<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

type Post = {
  title: string,
  content: string,
  createdAt: Date,
  view: number,
}

type Comment = {
  authorName: string,
  content: string,
  depth: number,
  createdAt: Date,
  deletedAt: Date | null,
}

const post: Post = reactive({
  title: '하이하이',
  content: '<p>하이용</p>',
  createdAt: new Date,
  view: 126,
})

const comments: Array<Comment>= [
  {authorName: 'hgleee', content: '댓글입니다1', depth: 0, createdAt: new Date, deletedAt: null,},
  {authorName: 'abcdef', content: '댓글입니다2', depth: 1, createdAt: new Date, deletedAt: null,},
  {authorName: '123456', content: '댓글입니다3', depth: 2, createdAt: new Date, deletedAt: null,},
  {authorName: '123', content: '댓글입니다4', depth: 3, createdAt: new Date, deletedAt: null,},
  {authorName: 'hgleee', content: '댓글입니다4', depth: 0, createdAt: new Date, deletedAt: null,},
  {authorName: 'hgleee', content: '댓글입니다5', depth: 1, createdAt: new Date, deletedAt: null,},
  {authorName: 'hgleee', content: '댓글입니다6', depth: 0, createdAt: new Date, deletedAt: null,},
]

const textarea = ref('');

onMounted(() => {
  const bodyTarget = document.getElementById('body')!;
  bodyTarget.innerHTML = post.content;
})


</script>

<template>
  <div id="container">
    <div id="header">
      <div id="title">
        <h3>{{ post.title }}</h3>
        <div>{{ post.createdAt }}</div>
      </div>
      <div id="meta">
        <div>조회 수 {{ post.view }}</div>
        <div>댓글 {{ 0 }}</div>
      </div>
    </div>
    <div id="body"></div>
    <div id="footer">
      <h4>댓글</h4>
      <div v-if="comments.length === 0">
        등록된 댓글이 없습니다.
      </div>
      <ul class="comment">
        <li v-for="(comment, i) in comments" :key="i">
          <div>
            <div v-if="comment.depth > 0" id="reply-head">
              <span id="reply-blank" v-for="n in (comment.depth-1)" :key="n"></span>
              <font-awesome-icon icon="share" flip="vertical" />
            </div>
            <div v-else>
              <span id="comment-head"></span>
            </div>
            <div id="comment-name-box">
              {{ comment.authorName }}
            </div>
            <div id="comment-content-box">
              {{ comment.content }}
            </div>
          </div>
        </li>
      </ul>
      <div id="input-area">
        <div id="text-area">
          <el-input
            v-model="textarea"
            :rows="2"
            type="textarea"
            placeholder="댓글을 입력해주세요"
          />
        </div>
        <div id="button-area">
          <button type="button">
            등록
          </button>
        </div>
      </div>
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
    border-top: $gray-color 1px solid;

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
    border-bottom: #dcdcdc 1px solid;
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
      padding: 0 20px;

      &>div {
        display: flex;
        width: 100%;
        padding: 9px 3px 7px;

        &>#comment-name-box {
          display: flex;
          align-items: center;
          color: $gray-color;
          font-weight: bold;
          font-size: 0.9rem;
          width: 100px;
        }

        &>#comment-content-box {
          @include content-font-regular;
          font-size: 0.95rem;
        }
      }
    }
  }

  &>#input-area {
    display: flex;
    margin: 20px 5px 0 5px;
    box-sizing: border-box;
    border-top: $main-color 2px solid;
    border-bottom: $main-color 2px solid;

    &>div {
      padding: 20px;
      display: flex;
    }
    &>#text-area {
      flex: 12;
    }
    &>#button-area {
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

#comment-head {
  margin: 0 2px;
}
#reply-head {
  color: $main-color; 
  font-size: 0.6rem;
  margin: 0 5px 0 2px;

  &>#reply-blank {
    margin: 0 5px;
  }
}

</style>