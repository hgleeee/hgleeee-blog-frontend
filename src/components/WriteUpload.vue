<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { useFileStore } from '@/stores/file.js'
import { storeToRefs } from 'pinia';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const fileStore = useFileStore();
const { imageList } = storeToRefs(fileStore);

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const props = defineProps(['postId']);
const postId: string = props.postId;

const beforeUpload = function() {
    console.log(postId);
}

const handleError = function(error: Error) {
    console.log(error);
}

onMounted(() => {
    
})

onUnmounted(() => {
    
});

</script>

<template>
<el-upload 
    v-model:file-list="imageList"
    :action="`/api/post-image/upload/${postId}`"
    :before-upload="beforeUpload"
    :on-success="fileStore.handleSuccess" 
    :on-error="handleError"
    list-type="picture-card" 
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
                    @click="fileStore.attachImage(file)"
                >
                    <el-icon><Download /></el-icon>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="fileStore.handleRemove(file, imageList)"
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
