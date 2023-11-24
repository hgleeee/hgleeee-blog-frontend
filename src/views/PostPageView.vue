<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/post.js'
import { storeToRefs } from 'pinia';

const tableHead: Array<string> = ['카테고리', '제목', '날짜', '조회'];
const postStore = usePostStore();
const currentPage = ref(1);
const route = useRoute();
const code = route.params.code;
const { tableData, pageSize } = storeToRefs(postStore);

const movePage = function() {
    postStore.fetchPostPreviews(code as string, currentPage.value);
}

onMounted(() => {
    postStore.fetchPostPreviews(code as string, currentPage.value);
});
</script>

<template>
<div>
    <div id="container">
        <h2>글 목록</h2>
        <div id="body">
            <table>
                <thead>
                    <tr>
                        <th v-for="(head, i) in tableHead" :key="i">{{ head }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, i) in tableData" :key="i">
                        <td>{{ data.categoryName }}</td>
                        <td><a href="#">{{ data.title }}</a></td>
                        <td>{{ data.date }}</td>
                        <td>{{ data.viewCount }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="pagination">
            <el-pagination
                @click="movePage"
                v-model:current-page="currentPage"
                :page-size="10"
                :pager-count="11"
                layout="prev, pager, next"
                :total="pageSize"
            />
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
$primary-color: #008cba;
$gray-color: #ddd;
$medium-up: 600px;
$large-up: 1000px;
$global-radius: 4px;

@mixin heading-font-regular {
  font-family: 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
}

#container {
    padding: 30px 20px;

    #pagination {
        display: flex;
        justify-content: center;
        .el-pagination {
            padding: 50px;
        }
    }
    
}

a {
    color: #222;
    font-weight: bold;
    text-decoration: none;
}

table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 2em;
    font-size: 0.95rem;
    thead {
        border-bottom: 2px solid $gray-color;
        th {
            padding: 0.35em 0 .35em;
            font-weight: 400;
            text-align: center;
            @include heading-font-regular;
            font-weight: bold;

            &:nth-child(1) {
                width: 100px;
            }
            &:nth-child(3) {
                width: 150px;
            }
            &:nth-child(4) {
                width: 50px;
            }
        }
    }
    tbody {
        border-bottom: 2px solid $gray-color;
        
        tr {
            border-bottom: 2px #ddd;
        }
       
        td {
            padding: .75em 0;
            text-align: center;

            &:nth-child(2) {
                text-align: left;
                padding: .75em 0.5em;
            }

            a {
                color: darkgray;
                text-decoration: none;
                display: inline-block;
                margin: 0 .5em 0 0;
                &:hover, &:active, &:focus {
                    color: darken($primary-color, 10%);
                    border: none;
                }
            }
        }
    }
}
</style>