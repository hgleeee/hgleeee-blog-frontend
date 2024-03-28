import { defineStore } from 'pinia'
import { type Ref, ref, computed } from 'vue'
import { formatTimeAgo } from '@/stores/utils.js'
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { watch } from 'vue'
import axios from 'axios'
import { useFileStore } from './file'

export type WrittenPost = {
    title: string,
    content: string,
    postImageFilePathList: string[], 
}

type PostForm = {
    postId: string,
    title: string,
    content: string,
    categoryCode: string,
}


export const useWrittenPostStore = defineStore('writtenPost', () => {
    const categoryCode = ref(100);
    const fileStore = useFileStore();

    const writtenPost: Ref<WrittenPost> = ref({
        title: '',
        content: '',
        postImageFilePathList: [],
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

    function attachImageToEditor(filePath: string, editor: Editor) {
        console.log(filePath);
        editor.chain().setImage({ src: filePath }).run();
    }

    async function fetchWrittenPost(id: string): Promise<void> {
        try {
            const result = await axios.get(`/api/post/${id}`)
            writtenPost.value.title = result.data.title;
            writtenPost.value.content = result.data.content;
            fileStore.fetchImageList(result.data.postImageFilePathList);
        } catch (error) {
            console.log(error);
        }
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
    
    return { writtenPost, createEmptyPost, fetchWrittenPost, submitPost, attachImageToEditor };
});