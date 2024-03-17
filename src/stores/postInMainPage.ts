import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'
import { dateExpression } from '@/stores/utils.js'

export type SimplePost = {
    'postId': number,
    'title': string,
    'createdAt': Date,
    'viewCnt': number,
    'commentCnt': number,
    'categoryCode': string,
    'categoryName': string,
    'representImageFilePath': string,
}

export type SimpleComment = {
    'id': number,
    'content': string,
    'postId': number,
    'authorName': string,
    'authorProfileImageFilePath': string,
}

export const useSimplePostStore = defineStore('simplePost', () => {
    const bestFivePost: Ref<SimplePost[]> = ref([]);
    const recentFivePost: Ref<SimplePost[]> = ref([]);

    function fetchBestFivePost(): void {
        axios.get(`/api/post/simpleFivePosts?keyword=best`)
            .then((result) => {
                bestFivePost.value = result.data;
                bestFivePost.value.forEach((simplePost) => {
                    simplePost.createdAt = new Date(simplePost.createdAt);
                })
            })
            .catch(() => {
                console.log("error");
        });
    };

    function fetchRecentFivePost(): void {
        axios.get(`/api/post/simpleFivePosts?keyword=recent`)
            .then((result) => {
                recentFivePost.value = result.data;
                recentFivePost.value.forEach((simplePost) => {
                    simplePost.createdAt = new Date(simplePost.createdAt);
                })
            })
            .catch(() => {
                console.log("error");
        });
    };
    
    return { bestFivePost, recentFivePost, fetchBestFivePost, fetchRecentFivePost };
})
  

export const useSimpleCommentStore = defineStore('simpleComment', () => {
    const recentFiveComments: Ref<SimpleComment[]> = ref([]);

    function fetchRecentFiveComments(): void {
        axios.get(`/api/comment/comments/recent`)
            .then((result) => {
                recentFiveComments.value = result.data;
            })
            .catch(() => {
                console.log("error");
        });
    };
    
    return { recentFiveComments, fetchRecentFiveComments };
})