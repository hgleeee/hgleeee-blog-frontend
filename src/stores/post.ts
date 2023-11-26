import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
import { formatTimeAgo } from '@/stores/utils.js'
import axios from 'axios'

export type Post = {
    title: string,
    content: string,
    createdAt: string,
    viewCount: number,
}

export const usePostStore = defineStore('post', () => {
    const post: Ref<Post> = ref({
        title: '',
        content: '',
        createdAt: Date(),
        viewCount: 0,
    });

    const postRender = computed(() => {
        post.value.createdAt = formatTimeAgo(new Date(post.value.createdAt));
        return post.value;
    });

    function fetchPost(id: bigint): void {
        axios.get(`/api/post/${id}`)
            .then((result) => {
                post.value = result.data;
            })
            .catch(() => {
                console.log("error");
        });
    };
    
    return { post, postRender, fetchPost };
});