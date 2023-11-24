<script lang="ts" setup>
import { ref } from 'vue'
import { useCategoryStore, UPDATETYPE } from '@/stores/category.js'

const props = defineProps(['code', 'mode', 'name']);
const emit = defineEmits(['closeInput']);
const mode = props.mode;
const isHovered = ref(false);
const categoryStore = useCategoryStore();
const inputName = ref(props.name);

const handleHover = () => {
  isHovered.value = true;
}
const handleLeave = () => {
  isHovered.value = false;
}

const handleOk = () => {
  if (mode === UPDATETYPE.MAINADD) {
    categoryStore.addCategory(inputName.value);
  } else if (mode === UPDATETYPE.MAINEDIT) {
    categoryStore.editCategoryName(props.code, inputName.value);
  } else if (mode === UPDATETYPE.SUBEDIT) {
    categoryStore.editSubCategoryName(props.code, inputName.value);
  } else if (mode === UPDATETYPE.SUBADD) {
    categoryStore.addSubCategory(props.code, inputName.value);
  }
  closeInput();
}

const closeInput = () => {
  emit('closeInput');
}

</script>

<template>
  <div>
    <div class="category-input" :class="{ 'hovered' : isHovered }" @mouseover="handleHover" @mouseleave="handleLeave">
        <div class="input-box">
            <input class="my-input" v-model="inputName" autofocus />
        </div>
        <div class="btn-bundle">
            <button type="button" class="btn-cancel" @click="closeInput()">취소</button>
            <button type="button" class="btn-default" @click="handleOk()">확인</button>
        </div>
    </div>      
  </div>
</template>

<style lang="scss" scoped>
$default-color: #F2F2F2;
$border-color: #F8E0F1;

.category-input {
    padding: 2px 20px 2px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    font-size: 16px;
    border: 1px solid $border-color;

    &>.input-box {
        &>.my-input {
            display: block;
            width: 300px;
            height: 24px;
            padding: 6px 14px 8px;
            font-size: 16px;
            border: 1px solid #F5A9BC;
            border-radius: 1px;
            box-sizing: content-box;
            outline: none;
        }
    }

    &>.btn-bundle {
        &>button {
            width: 76px;
            height: 30px;
            line-height: 30px;
            border-radius: 1px;
            border: 1px solid $border-color;
            background: #FFF;
            text-align: center;
            box-sizing: content-box;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
            margin-right: 3px;

            &:hover {
              cursor: pointer;
              background-color: $default-color;
              font-weight: bold;
            }
        }
    }
}

.hovered {
  border: 1px solid #C5CDD7;
}

</style>