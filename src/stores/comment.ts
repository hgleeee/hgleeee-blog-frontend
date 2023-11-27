import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
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
    totalCommentCount: bigint,
}

export const useCommentStore = defineStore('comment', () => {
    const commentsInfo: Ref<Comments>= ref({
        comments: [],
        totalCommentCount: BigInt(0),
    })

    function fetchCommentsInfo(postId: bigint, pageNo?: number): Promise<void> {
        if (pageNo === undefined) {
            return axios.get(`/api/comment/comments?postId=${postId}`)
            .then((result) => {
                commentsInfo.value = result.data;
            })
            .catch(() => {
                console.log("댓글 불러오기에 실패하였습니다.");
            });
        }
        return axios.get(`/api/comment/comments?postId=${postId}&pageNo=${pageNo}`)
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
  