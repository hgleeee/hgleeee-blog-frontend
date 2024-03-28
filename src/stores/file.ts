import type { UploadFile } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export type FileInfo = {
    'fileUrl': string,
}

export const useFileStore = defineStore('file', () => {
    const imageList = ref<UploadFile[]>([]);

    function fetchImageList(postImages: string[]) {
        for (const postImageFilePath of postImages) {
            const file: UploadFile = {
                name: 'example.jpg',
                response: { fileUrl: postImageFilePath },
                status: 'success',
                uid: Math.random(),
                url: postImageFilePath,
            }
            imageList.value.push(file);
        }
    }

    function coverUrlFromFilePath() {
        console.log(imageList);
        for (const image of imageList.value) {
            if (image.response && (image.response as FileInfo).fileUrl) {
                image.url = (image.response as FileInfo).fileUrl;
            } else {
                console.error("File URL not found in image response:", image);
            }
        }
    }

    function handleRemove(filePath: string) {
        for (let i=0; i < imageList.value.length; ++i) {
            if ((imageList.value[i].response as FileInfo).fileUrl === filePath) {
                imageList.value.splice(i, 1);
            }
        }
    }

    function handleSuccess(result: FileInfo) {
        const len = imageList.value.length;
        (imageList.value[len-1].response as FileInfo).fileUrl = result.fileUrl;
    }

    return { imageList, handleRemove, fetchImageList, coverUrlFromFilePath };
})
  