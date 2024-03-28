import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import "bootstrap/dist/css/bootstrap-utilities.css"
import { convertToString } from './stores/utils.js'
import { useUserStore } from './stores/user'
import { usePostStore } from './stores/post.js'
import { commentState, useCommentStore } from './stores/comment.js'
import VueCookies from 'vue-cookies'
import { useWrittenPostStore } from './stores/writtenPost'

library.add(fas, far, fab);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueCookies)

const userStore = useUserStore();
const postStore = usePostStore();
const commentStore = useCommentStore();
const writtenPostStore = useWrittenPostStore();
router.beforeEach((to, from) => {
    userStore.fetchUserInfo();
    if (to.name === 'post') {
        postStore.fetchPost(BigInt(convertToString(to.params.id)));
        commentState.postId = BigInt(convertToString(to.params.id));
        commentState.currentPage = 0;
        commentStore.fetchCommentsInfo();
    }
    if (to.path.startsWith('/admin') && userStore.isAdmin()) {
        router.push('/unauthorized')
    }
})
app.mount('#app')
