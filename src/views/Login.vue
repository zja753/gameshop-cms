<template>
  <div class="container note" :style="note">
    <div class="form_login">
      <div class="left-part">
        <div class="content">
          <h2>登 录</h2>
          <input
            @keyup="params.email=params.email.replace(/\s+/g,'')"
            v-model="params.email"
            type="text"
            name="username"
            placeholder="请输入用户名"
          />
          <input
            @keyup="params.password=params.password.replace(/\s+/g,'')"
            @keyup.enter="handleLogin"
            v-model="params.password"
            type="password"
            name="password"
            placeholder="请输入密码"
          />
          <button type="submit" :plain="true" @click="handleLogin">登录</button>
        </div>
      </div>
      <div class="right-part">
        <div class="right-content">
          <h2>CMS后台管理系统</h2>
          <p>GGGGGGG</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import scrollReveal from "scrollreveal";

export default {
  name: "FormLogin",
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/img/loginBg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },
      scrollReveal: scrollReveal(),
      account: "",
      params: {
        email: "",
        password: "",
      },
    };
  },
  watch: {
    // email(n) {
    //   console.log(n);
    // },
  },
  created() {},
  mounted() {
    this.scrollReveal.reveal(".form_login", {
      // 动画的时长
      duration: 500,
      // 延迟时间
      delay: 100,
      // 动画开始的位置，'bottom', 'left', 'top', 'right'
      origin: "center",
      // 回滚的时候是否再次触发动画
      reset: false,
      // 在移动端是否使用动画
      mobile: false,
      // 滚动的距离，单位可以用%，rem等
      distance: "0",
      // 其他可用的动画效果
      opacity: 0.001,
      easing: "linear",
      scale: 0.9,
    });
  },
  methods: {
    handleLogin() {
      let re = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
      if (!re.test(this.params.email)) {
        this.$message({
          message: "请输入正确的邮箱!!!",
          type: "warning",
        });
        return;
      }
      if (this.params.password.length < 6) {
        this.$message({
          message: "密码不得小于6位",
          type: "warning",
        });
      }

      this.$axios.post("/user/login", this.params).then((res) => {
        if (res.status == 1) {
          res.data.Authorization = res.data.token;
          res.data.account = res.data.email;
          this.$store.commit("changeLogin", res.data);
          this.$router.push("/home");
        } else {
          this.$message({
            message: res.err,
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  .form_login {
    width: 800px;
    height: 500px;
    border: 1px solid white;
    border-radius: 20px;
    display: flex;
    overflow: hidden;

    .left-part {
      width: 400px;
      background: white;
      div {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        padding: 80px 0;
        position: relative;
        transition: 0.6s;
      }
      h2 {
        font-size: 40px;
      }
      input {
        border: none;
        width: 300px;
        border-bottom: 1px solid #f8a5c2;
        margin: 30px 20px;
        height: 40px;
        &:focus {
          outline: none;
        }
      }
      button {
        color: white;
        width: 100px;
        padding: 10px;
        margin: 0 auto;
        font-size: 20px;
        background: rgba($color: #c44569, $alpha: 1);
        border: 1px solid white;
        border-radius: 30px;
        cursor: pointer;
        transition: 1s;
        &:focus {
          outline: none;
        }
        &:hover {
          background: rgba($color: #f78fb3, $alpha: 1);
        }
      }
    }

    .right-part {
      background-image: linear-gradient(#fd79a8, #fab1a0);
      flex: 1;
      text-align: center;
      color: white;
      div {
        bottom: 0px;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        transition: 0.6s;
      }
      h2 {
        font-size: 30px;
        margin-bottom: 10px;
      }
      p {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>