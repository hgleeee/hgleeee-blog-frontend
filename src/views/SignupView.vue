<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'

type Signup = {
    email: string,
    password: string,
    name: string,
}

const signup: Signup = reactive({
    email: '',
    password: '',
    name: '',
});

const validCheck = reactive({
    email: true,
    password: true,
    passwordConfirm: true,
    name: true,
});

const errorMessage = {
    email: "이메일은 빈 칸일 수 없습니다.",
    password: "비밀번호는 8~16자리로 입력해주세요.",
    passwordConfirm: "비밀번호 항목과 다릅니다. 다시 한 번 확인해주세요.",
    name: "이름은 빈 칸일 수 없습니다.",
}

const init = () => {
    validCheck.email = true;
    validCheck.password = true;
    validCheck.passwordConfirm = true;
    validCheck.name = true;
}

const validate = function(signup: Signup) {
    init();
    if (!signup.email) {
        validCheck.email = false;
    }
    if (!signup.name) {
        validCheck.name = false;
    }
    if (!signup.password || signup.password.length < 8 || signup.password.length > 16) {
        validCheck.password = false;
    }
    const input: HTMLInputElement | null = document.getElementById('password_confirm') as HTMLInputElement;
    if (!input || signup.password !== input.value) {
        validCheck.passwordConfirm = false;
    }
    return validCheck.email && validCheck.name && validCheck.password && validCheck.passwordConfirm;
}

const submit = function() {
    const isValid = validate(signup);
    if (!isValid) return;
    axios.post("/api/auth/signup", signup)
        .then(() => {
            alert("회원가입이 완료되었습니다.")
            window.location.href = '/';
        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(signup.password);
        });
}

</script>

<template>
  <div id="wrapper">
    <div id="head">
        <h2>회원가입 페이지</h2>
    </div>
    <div id="body">
        <div class="editfield">
            <label for="signup_email">이메일 *</label>
            <input v-if="validCheck.email" v-model="signup.email" type="text" placeholder="이메일을 입력해주세요" id="email" />
            <input v-else v-model="signup.email" type="text" placeholder="이메일을 입력해주세요" class="error" id="email" />
            <div v-if="!validCheck.email" class="error-message">{{ errorMessage.email }}</div>
        </div>
        <div class="editfield">
            <label for="signup_password">비밀번호 *</label>
            <input v-if="validCheck.password" v-model="signup.password" type="password" placeholder="비밀번호를 입력해주세요" id="password" />
            <input v-else v-model="signup.password" type="password" placeholder="비밀번호를 입력해주세요" class="error" id="password" />
            <div v-if="!validCheck.password" class="error-message">{{ errorMessage.password }}</div>
        </div>
        <div class="editfield">
            <label for="password_confirm">비밀번호 확인 *</label>
            <input v-if="validCheck.passwordConfirm" type="password" placeholder="비밀번호를 한 번 더 입력해주세요" id="password_confirm" />
            <input v-else type="password" placeholder="비밀번호를 한 번 더 입력해주세요" class="error" id="password_confirm" />
            <div v-if="validCheck.password && !validCheck.passwordConfirm" class="error-message">{{ errorMessage.passwordConfirm }}</div>
        </div>
        <div class="editfield">
            <label for="signup_name">이름 *</label>
            <input v-if="validCheck.name" v-model="signup.name" type="text" placeholder="이름(닉네임)을 입력헤주세요" id="name" />
            <input v-else v-model="signup.name" type="text" placeholder="이름(닉네임)을 입력헤주세요" class="error" id="name" />
            <div v-if="!validCheck.name" class="error-message">{{ errorMessage.name }}</div>
        </div>
        <div class="submit">
            <el-button type="submit" @click="submit">가입하기</el-button>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#wrapper {
    box-sizing: border-box;
    padding: 20px;
}
#body {
    padding: 20px 300px 0 0;
    .editfield {
        label {
            display: block;
            font-weight: 700;
            margin: 15px 0 10px;
        }
        input {
            width: 100%;
            box-sizing: border-box;
            padding: 10px !important;
            margin-bottom: 3px;
            border-radius: 2px;
            color: #313b3d;
            font: inherit;
            font-size: 100%;
        }
    }

    .submit {
        margin: 50px 0 0 0;

        .el-button {
            font-weight: bold;
            color: #FF5675;
            border-color: #FF5675;
            width: 130px;
            height: 40px;
            &:hover {
                background: #FF5675;
                color: white;
            }
        }
    }
}

.error {
    border-color: red;
}
.error-message {
    color: red;
    font-size: 0.9rem;
    padding: 0 0 0 5px;
}
</style>
