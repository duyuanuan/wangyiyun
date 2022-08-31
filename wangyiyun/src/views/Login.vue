<template>
    <div class="login">
        <div class="loginTop">
            欢迎登录
        </div>
        <div class="loginContent">
            <input type="text" name="account" class="account" placeholder="请输入账号" v-model="account">
            <input type="password" name="password" class="password" placeholder="请输入密码" v-model="password">
            <button class="loginBtn" @click="Login">登 录</button>
        </div>
    </div>
</template>
<script>
import { getUserInf } from '../request/api/home'
export default {
    data() {
        return {
            account: '',
            password: ''
        }
    },
    methods: {
        async Login() {
            let res = await this.$store.dispatch('getLogin', { account: this.account, passwork: this.password });
            if (res.code == 200) {//登录成功
                this.$store.commit('updateIsLogin', true);
                this.$store.commit('updateToken', res.token);
                // let result = await getUserInf('res.id');
                // console.log(result);
                this.$router.push('/userInf');
            } else if (res.code == 400) {
                alert("登录超时");
            }
        },
    }
}
</script>
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: cadetblue;


    .loginTop {
        margin-top: 10rem;
        text-align: center;
        width: 100%;
        height: 30%;
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loginContent {
        display: flex;
        width: 100%;
        height: 40%;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;

        .account,
        .password {
            width: 50%;
            height: 1.5rem;
            margin-top: 2rem;
        }

        .loginBtn {
            margin-top: 2rem;
            width: 4rem;
            border-radius: 1rem;
            background-color: white;
            border: 0;
        }
    }

}
</style>