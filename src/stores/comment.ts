import { defineStore } from 'pinia'
import { type Ref, ref, reactive } from 'vue'
import { formatTimeAgo } from '@/stores/utils.js'
import axios from 'axios'

type Comment = {
    id: string,
    authorName: string,
    content: string,
    level: number,
    createdAt: Date,
    deletedAt: Date | null,
}

export type CommentRegisterForm = {
    postId: string,
    parentCommentId: string | null,
    content: string,
}

export type Comments = {
    comments: Comment[],
    totalCommentCount: number,
}

export type CommentState = {
    currentPage: number,
    postId: bigint,
}

export const commentState: CommentState = reactive({currentPage: -1, postId: 0n});
//export const currentPage: Ref<number> = ref(0);


export const useCommentStore = defineStore('comment', () => {

    const commentsInfo: Ref<Comments>= ref({
        comments: [],
        totalCommentCount: 0,
    })

    function fetchCommentsInfo(): void {
        if (commentState.currentPage === 0) {
            console.log("hello");
            axios.get(`/api/comment/comments?postId=${commentState.postId}`)
                .then((result) => {
                    commentsInfo.value = result.data;
                    console.log(commentsInfo.value.totalCommentCount);
                    commentState.currentPage = Math.ceil(commentsInfo.value.totalCommentCount / 10);
                })
                .catch(() => {
                    console.log("댓글 불러오기에 실패하였습니다.");
                });
            return;
        }
        axios.get(`/api/comment/comments?postId=${commentState.postId}&pageNo=${commentState.currentPage}`)
            .then((result) => {
                commentsInfo.value = result.data;
            })
            .catch(() => {
                console.log("댓글 불러오기에 실패하였습니다.");
            });
    }

    function registerComment(form: CommentRegisterForm) {
        const json: string = JSON.stringify(form, (_, v) => typeof v === 'bigint' ? v.toString() : v);
        return axios.post('/api/comment/register', json, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                alert("댓글 등록이 완료되었습니다.");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return { commentsInfo, fetchCommentsInfo, registerComment };
})
  