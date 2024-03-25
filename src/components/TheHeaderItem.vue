<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import {
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const props = defineProps(['category']);
const categoryName = props.category.name;
const categoryLink = props.category.link;
const router = useRouter();

const profileImageUrl = function() {
  if (!userInfo.value.profileImageUrl) {
    return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  }
  return userInfo.value.profileImageUrl;
}

const showText = ref(true);

const clickChangeProfile = function() {
  alert("clcik");
}

const showNotifications = function() {

}

const handleLogout = function() {
  alert("로그아웃 되었습니다.");
  userStore.logout();
}

</script>

<template>
    <div id="wrapper">
        <div v-if="categoryLink !== null">
          <a :href="categoryLink">{{ categoryName }}</a>
        </div>
        <div v-else>
          <div v-if="userInfo.role === 'ANONYMOUS'">
            <a @click="$emit('clickLogin')">{{ categoryName }}</a>
          </div>
          <div v-else class="profile-box">
            <el-popover
              placement="bottom"
              :width="150"
              trigger="hover"
              content="프로필 이미지 변경"
            >
              <template #reference>
                <el-avatar :size="35" :src="profileImageUrl()"
                @mouseover="showText = true" 
                @mouseleave="showText = false" 
                @click="clickChangeProfile()" />
              </template>
            </el-popover>
            <el-dropdown>
              <span class="name-area">{{ userInfo.name }}</span>
              <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="showNotifications()"> <font-awesome-icon icon="bell" /> <span class="dropdown-text">알림</span></el-dropdown-item>
                <el-dropdown-item @click="handleLogout()"> <font-awesome-icon icon="arrow-right-to-bracket" /> <span class="dropdown-text" style="padding-left: 8px;">로그아웃</span></el-dropdown-item>
              </el-dropdown-menu>
            </template>
            </el-dropdown>
          </div>
        </div>
    </div>
</template>

<style scoped>
a {
    margin: 0 10px;
    text-decoration: none;
    color: black;
    text-decoration: solid;
    text-shadow: 1px 1px 5px gray;
}
a:visited {
  text-decoration: none;
}
a:hover {
  color: #FF5675;
  cursor: pointer;
}
a:focus {
  color: #FF5675;
}
#wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 10px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
}

.profile-box {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}
.name-area {
  outline: none;
  font-size: 20px;
  color: black;
  padding: 1px;
  margin-left: 6px;
}
.name-area:hover {
  outline: none;
  cursor: pointer;
}

.dropdown-text {
  padding-left: 10px;
}


.profile-box > .el-avatar:hover {
  cursor: pointer;
}

</style>
