<template>
  <div>
    账号：
    <input v-model="params.email" type="text" name id />
    <br />
    <br />密码:
    <input v-model="params.password" type="text" name id />
    <br />
    <br />
    <button @click="handleReg">注册</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    handleReg() {
      console.log(this.params);
      this.$axios.post("/user/register", this.params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>