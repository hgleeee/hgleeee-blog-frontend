<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onBeforeMount, reactive } from 'vue';
import { useSimplePostStore, useSimpleCommentStore } from '@/stores/postInMainPage.js'
import { dateExpressionBrief } from '@/stores/utils.js'
import { storeToRefs } from 'pinia'
const router = useRouter();

const moveToHome = function() {
  router.push(`/`);
}
const moveToPost = function(postId: number) {
    router.push(`/${postId}`);
}

const tabNavMap = reactive(new Map<string, boolean>());
tabNavMap.set('clock', false);
tabNavMap.set('star', false);
tabNavMap.set('comments', false);
const activate = function(input: string) {
    for (const [key] of tabNavMap) {
        tabNavMap.set(key, false);
    }
    tabNavMap.set(input, true);
}
const isActive = (input: string) => {
    return tabNavMap.get(input);
}

const simplePostStore = useSimplePostStore();
const { bestFivePost, recentFivePost } = storeToRefs(simplePostStore);
const simpleCommentStore = useSimpleCommentStore();
const { recentFiveComments } = storeToRefs(simpleCommentStore);

const abc = function() {
    console.log(bestFivePost.value);
}

onBeforeMount(() => {
    simplePostStore.fetchBestFivePost();
    simplePostStore.fetchRecentFivePost();
    simpleCommentStore.fetchRecentFiveComments();
    tabNavMap.set('clock', true);
});

</script>
<template>
    <div class="wrapper">
        <h1 class="title" @click="moveToHome()">
            <a>Hgleeee</a>
        </h1>
        <p class="description">
            Programming 아카이브
        </p>
        <div class="sidebar">
            <div id="profile">
                <div id="profile-image">
                    <img src="@/image/hgleeee.png">
                </div>
                <div id="profile-name">
                    Hyeonggon Lee
                </div>
                <div id="profile-introduce">
                    Back-end
                </div>
            </div>
            <div id="blog-info">
                <ul class="tab-nav">
                    <li :class="{'clicked-nav-ele': isActive('clock'), 'nav-ele': !isActive('clock')}" @click="activate('clock')">
                        <a><font-awesome-icon :icon="['fas', 'clock']" /></a>
                    </li>
                    <li :class="{'clicked-nav-ele': isActive('star'), 'nav-ele': !isActive('star')}" @click="activate('star')">
                        <a><font-awesome-icon :icon="['fas', 'star']" /></a>
                    </li>
                    <li :class="{'clicked-nav-ele': isActive('comments'), 'nav-ele': !isActive('comments')}" @click="activate('comments')">
                        <a><font-awesome-icon :icon="['fas', 'comments']" /></a>
                    </li>
                </ul>
                <div>
                    <div v-if="isActive('clock')">
                        <div class="info-element" v-for="post in recentFivePost" :key="post.postId">
                            <div class="element-image">
                                <img v-if="post.representImageFilePath === null" src="@/image/empty_file.png">
                                <img v-else :src="post.representImageFilePath">
                            </div>
                            <div class="element-description">
                                <p class="element-category">
                                    <span>{{ post.categoryName }}</span>
                                </p>
                                <p class="element-title" @click="moveToPost(post.postId)">
                                    <span>{{ post.title }}</span>
                                </p>
                                <p class="element-date">
                                    <span>{{ dateExpressionBrief(post.createdAt) }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="isActive('star')">
                        <div class="info-element" v-for="post in bestFivePost" :key="post.postId">
                            <div class="element-image">
                                <img v-if="post.representImageFilePath === null" src="@/image/empty_file.png">
                                <img v-else :src="post.representImageFilePath">
                            </div>
                            <div class="element-description">
                                <p class="element-category">
                                    <span>{{ post.categoryName }}</span>
                                </p>
                                <p class="element-title" @click="moveToPost(post.postId)">
                                    <span>{{ post.title }}</span>
                                </p>
                                <p class="element-date">
                                    <span>{{ dateExpressionBrief(post.createdAt) }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="isActive('comments')">
                        <div class="info-element" v-for="comment in recentFiveComments" :key="comment.id">
                            <div class="element-image">
                                <img v-if="comment.authorProfileImageFilePath === null" src="@/image/empty_profile.png">
                                <img v-else :src="comment.authorProfileImageFilePath">
                            </div>
                            <div class="element-description">
                                <p class="element-author">
                                    <span>{{ comment.authorName }} 님의 댓글 : </span>
                                </p>
                                <p class="element-content" @click="moveToPost(comment.postId)">
                                    <span>{{ comment.content }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>카테고리 수정</div>
                <div>글 작성</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-element {
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    height: 70px;
    img {
        width: 60px;
    }
    &>.element-image {
        border-radius: 50%;
        background-color: #fff;
        &:hover{
            cursor: pointer;
            filter: brightness(2);
        }
    }
    & > .element-description {
        padding: 5px 10px;
        width: 200px;
        margin-left: 10px;
        p {
            margin: 0;
        }
        & > .element-category {
            font-weight: 400;
            font-size: 15px;
            color: #9A2EFE;
            &:hover{
                cursor: pointer;
            }
        }
        & > .element-title {
            width: 170px;
            font-weight: 500;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #424242;
            &:hover{
                cursor: pointer;
                font-weight: bold;
            }
        }
        & > .element-date {
            font-weight: 400;
            font-size: 12px;
            color: #9fabbe;
            margin-top: 2px;
        }
        & > .element-author {
            font-weight: 400;
            font-size: 15px;
            color: #9fabbe;
            margin-bottom: 1px;
        }
        & > .element-content {
            width: 100%;
            font-weight: 500;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #424242;
            &:hover{
                cursor: pointer;
                font-weight: bold;
            }
        }
    }
}

#blog-info {
    .tab-nav {
        margin: 50px 20px 15px;
        background-color: #fff;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        list-style: none;
        height: 70px;
        li {
            padding: 20px 0;
            font-size: 20px;
            width: 33%;
            float: left;
            display: block;
            a {
                padding: 10px 0;
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
}

.nav-ele {
    &:hover {
        color: gray;
    }
}

.clicked-nav-ele {
    background-color: #F5A9BC;
    color: #fff;
}

.wrapper {
    background-color: #FBEFF2;
    .title {
        color: #9A2EFE;
        text-align: center;
        font-size: 33px;
        font-weight: 600;
        letter-spacing: -.5px;
        line-height: 50px;
        padding: 25px 30px;
        position: relative;
        margin: 0;

        &:hover {
            cursor: pointer;
        }
    }

    .description {
        text-align: center;
        padding: 0 20px 30px;
        font-size: 15px;
        line-height: 1.6em;
        font-weight: 400;
        color: #9fabbe;
        position: relative;
        z-index: 2;
        margin: 0;
    }
}

.sidebar {
    text-align: center;
    min-height: 600px;
}
#profile {
    background-color: #fff;
    margin: 0 30px;
    box-shadow: 0 0 1px #ccd4d9;
    border-bottom: 5px solid #9A2EFE;
    border-radius: 15px;

    img {
        width: 140px;
        height: 70%;
        padding: 20px;
    }
    
    #profile-name {
        color: #3d4e59;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.2rem;
        margin: 0 0 10px 0;
    }
    #profile-introduce {
        font-size: 15px;
        line-height: 1.6em;
        font-weight: 400;
        color: #9fabbe;
        position: relative;
        padding: 0 0 10px 0;
    }
}
</style>