<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile, UploadProps } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const imageList: UploadFile[] = reactive([]);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    for (let i=0; i<uploadFiles.length; ++i) {
        if (uploadFiles[i].url === uploadFile.url) {
            uploadFiles.splice(i, 1);
        }
    }
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const emit = defineEmits(['attachImage']);

const attachImage = (file: UploadFile) => {
    emit('attachImage', file);
}

</script>

<template>
<el-upload 
    v-model:file-list="imageList"
    action="#" 
    list-type="picture-card" 
    :auto-upload="false"
>
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
        <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <el-icon><zoom-in /></el-icon>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="attachImage(file)"
                >
                    <el-icon><Download /></el-icon>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file, imageList)"
                >
                    <el-icon><Delete /></el-icon>
                </span>
            </span>
        </div>
    </template>
</el-upload>

<el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
</el-dialog>
</template>
