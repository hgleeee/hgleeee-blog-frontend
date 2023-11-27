import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
import { formatTimeAgo } from '@/stores/utils.js'
import axios from 'axios'

type PostPreview = {
    id: bigint,
    categoryName: string,
    title: string,
    authorName: string,
    createdAt: Date,
    viewCount: number,
}

type PostsPreview = {
    posts: PostPreview[],
    totalPostCount: bigint,
}

export const usePostPreviewStore = defineStore('postPreview', () => {
    const postsPreview: Ref<PostsPreview> = ref({
        posts: [] as PostPreview[],
        totalPostCount: BigInt(0),
    });

    const tableData = computed(() => {
        return postsPreview.value.posts.map((postPreview) => ({
            id: postPreview.id,
            categoryName: postPreview.categoryName,
            title: postPreview.title,
            authorName: postPreview.authorName,
            date: formatTimeAgo(postPreview.createdAt),
            viewCount: postPreview.viewCount,
        }));
    });

    const pageSize = computed(() => {
        return postsPreview.value.totalPostCount;
    });

    function fetchPostPreviews(categoryCode: string, pageNo?: number): void {
        if (pageNo === undefined) {
            axios.get(`/api/post/posts?category=${categoryCode}`)
                .then((result) => {
                    console.log(result.data);
                    postsPreview.value = result.data;
                })
                .catch(() => {
                    console.log("error");
            });
            return;
        }
        axios.get(`/api/post/posts?category=${categoryCode}&pageNo=${pageNo}`)
            .then((result) => {
                console.log(result.data);
                postsPreview.value = result.data;
            })
            .catch(() => {
                console.log("error");
        });
    };
    
    return { tableData, pageSize, fetchPostPreviews };
});