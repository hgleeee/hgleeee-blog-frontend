import type { UploadFile } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

type FileInfo = {
    'fileUrl': string,
}

export const useFileStore = defineStore('file', () => {
    const toAttachImage = ref<UploadFile | undefined>(undefined);
    const imageList = ref<UploadFile[]>([]);

    const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
        for (let i=0; i < uploadFiles.length; ++i) {
            if (uploadFiles[i].url === uploadFile.url) {
                uploadFiles.splice(i, 1);
            }
        }
    }

    function attachImage(file: UploadFile) {
        console.log(file);
        toAttachImage.value = file;
    }

    function handleSuccess(result: FileInfo) {
        const len = imageList.value.length;
        // imageList.value[len-1].url = result.fileUrl;
        imageList.value[len-1].url = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        console.log(result.fileUrl);
    }

    return { toAttachImage, imageList, handleRemove, attachImage, handleSuccess };
})
  