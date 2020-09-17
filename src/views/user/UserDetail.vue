<template>
  <div class="userdetail">
    <div class="info">
      <div class="img">
        <img :src="user.avatar" alt />
      </div>
      <div class="text">
        <h2>{{user.nickName}}</h2>
        <h3>账号:{{user.email}}</h3>
      </div>
      <p class="p">
        <el-tag>余额{{user.balance}}元</el-tag>
      </p>
    </div>
    <p class="title">用户订单</p>
    <div class="order"></div>
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

<style lang="scss" scoped>
.info {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 20px 50px;
  padding: 10px;
  position: relative;
  display: flex;
  // justify-content: center;
  align-items: center;
  .img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .text {
    flex: 1;
    margin-left: 50px;
    h2 {
      color: chocolate;
    }
  }
  .p {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
.title {
  margin: 0 50px;
  padding-bottom: 10px;
  color: #3dc1d3;
  border-bottom: 1px solid rgba($color: #596275, $alpha: 0.5);
}
</style>