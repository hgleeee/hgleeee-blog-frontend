import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
import { formatTimeAgo } from '@/stores/utils.js'
import axios from 'axios'

export type WrittenPost = {
    title: string,
    content: string,
}

type PostForm = {
    postId: string,
    title: string,
    content: string,
    categoryCode: string,
}

export const useWrittenPostStore = defineStore('writtenPost', () => {
    const categoryCode = ref('100');
    const writtenPost: Ref<WrittenPost> = ref({
        title: '',
        content: '',
    });

    function createEmptyPost(): string | undefined {
        axios.post('/api/post/register')
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                console.log(error);
            })
        return undefined;
    }

    function fetchWrittenPost(id: string) {
        axios.get(`/api/post/${id}`)
            .then((result) => {
                writtenPost.value.title = result.data.title;
                writtenPost.value.content = result.data.content;
            });
    }

    function submitPost(id: string): Promise<void> {
        const postForm: PostForm = {
            'postId': id,
            'title': writtenPost.value.title,
            'content': writtenPost.value.content,
            'categoryCode': categoryCode.value,
        }
        return axios.patch('/api/post/update', postForm)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            })
    };
    
    return { writtenPost, createEmptyPost, fetchWrittenPost, submitPost };
});