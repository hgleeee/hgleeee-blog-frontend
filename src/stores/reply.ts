import { defineStore } from "pinia"
import { type Ref, ref } from 'vue'

export const useReplyStore = defineStore('reply', () => {
    const replyText: Ref<string> = ref('');

    function resetReplyText(): void {
        replyText.value = '';
    }

    return { replyText, resetReplyText };
})