<script lang="ts" setup>
import { ref } from 'vue'

const searchContent = ref('');

const resetContent = () => {
    searchContent.value = '';
}

</script>
<template>
<div class="footer">
    <div class="search-container">
        <div class="search-wrapper">
            <div class="search-input">
                <form action="#" >
                <input type="search" class="input-box" placeholder="키워드로 검색하세요." v-model="searchContent" >
                <button type="submit" style="width: 0; height: 0; visibility: hidden;"></button>
                </form>
            </div>
            <div class="reset-click" @click="resetContent()">
                <font-awesome-icon v-if="searchContent.length > 0" :icon="['fas', 'square-xmark']" style="font-size: 20px; color: #FA5882; padding: 5px 0; margin-right: 3px"/>
            </div>
            <div class="search-click" >
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #FA5882; width: 100%; padding: 7px 0;" />
            </div>
        </div>
    </div>
    <div class="wrapper">
        <div class="footer-message">방문해주셔서 감사합니다. 항상 건강하고 행복하세요.</div>
        <div class="footer-contact">컨택: zdsay5863@gmail.com</div>
        <div class="footer-copyright">hgleeee © 2024. All Rights Reserved.</div>
    </div>
</div>
</template>

<style scoped>

.wrapper{
    margin-top: 100px;
    padding: 10px;
    background-color: #F8E0F1;
    min-height: 80px;
}

.footer-message{
    font-weight: bold;
    font-size:0.9rem;
    color:#545e6f;
    margin-bottom:0.3rem;
    margin:0 0 0 0.6rem;
}
.footer-contact{
    font-size:0.9rem;
    color:#545e6f;
    margin:0.6rem;
}
.footer-copyright{
    font-size:0.9rem;
    color:#545e6f;
    margin:0.6rem;
}



.search-container {
  width: 100%;
  margin-top: 100px;
}

.search-wrapper {
  display: flex;
  align-content: center;
  flex-direction: row;
  width: auto;
  margin: 0;
  padding: 8px;
  height: 28px;
  background-color: #fff;
  border: 2px solid #FA5882;
  overflow: hidden;
  border-radius: 30px;
}

.search-input {
  width: 100%;
  height: 100%;
  margin: 0 10px;
  padding: 0 5px;
  float: left;
  box-shadow: none;
  position: relative;
}

.search-input input {
  width: 100%;
  font-weight: 400;
  font-family: Open Sans;
  color: #000 !important;
  font-size: 14px;
  text-shadow: 0 0 0 rgba(255,255,255,0);
  border: none;
  position: absolute;
  top: 5px;
  outline: transparent;
}

.reset-click {
    width: 28px;
}
.reset-click {
    cursor: pointer;
}

.search-click {
  width: 28px;
}
.search-click:hover {
  cursor: pointer;
}

input::-ms-clear, input::-ms-reveal{
    display: none;
}

input::-webkit-search-decoration, input::-webkit-search-cancel-button, input::-webkit-search-results-button, input::-webkit-search-results-decoration {
    display: none;
}
</style>
