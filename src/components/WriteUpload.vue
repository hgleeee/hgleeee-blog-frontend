<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Delete, Top, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { useFileStore, type FileInfo } from '@/stores/file.js'
import { storeToRefs } from 'pinia';
import { useWrittenPostStore } from '@/stores/writtenPost';
import { Editor } from '@tiptap/vue-3';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const fileStore = useFileStore();
const { imageList } = storeToRefs(fileStore);
const writtenPostStore = useWrittenPostStore();
const { writtenPost } = storeToRefs(writtenPostStore);

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = (file.url as string);
  dialogVisible.value = true;
}

const props = defineProps(['postId', 'editor']);
const postId: string = props.postId;
const editor: Editor = props.editor;

const handleSuccess = function() {
  fileStore.coverUrlFromFilePath();
  console.log(imageList);
}

const handleRemove = function(file: UploadFile) {
    fileStore.handleRemove((file.response as FileInfo).fileUrl);
}

const attachImage = function(file: UploadFile) {
  writtenPostStore.attachImageToEditor((file.response as FileInfo).fileUrl, editor);
}

</script>

<template>
<el-upload 
    v-model:file-list="imageList"
    list-type="picture-card"
    :action="`/api/post-image/upload/${postId}`"
    :on-success="handleSuccess()"
>
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="attachImage(file)"
          >
            <el-icon><Top /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
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


<style lang="scss" scoped>
.el-dialog {
    img {
        width: 600px;
    }
}
</style>