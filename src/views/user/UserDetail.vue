<template>
  <div>
    <div class="info">
      <div class="img">
        <img :src="user.avatar" alt />
      </div>
      <div class="text">
        <h2>{{user.nickName}}</h2>
        <h3>{{user.email}}</h3>
        <p>{{user.balance}}元</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserDetail",
  data() {
    return {
      user: "",
    };
  },
  created() {},
  mounted() {
    // console.log(this.$route.params.email);
    this.$axios
      .get("/user/getUserInfo", { _id: this.$route.params.id })
      .then((res) => {
        // console.log(res);
        this.user = res.data;
      });
  },
  methods: {},
};
</script>