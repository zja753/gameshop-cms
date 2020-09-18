<template>
  <div class="header">
    <h2>
      游戏商城管理系统
      <i class="el-icon-pear"></i>
    </h2>
    <!-- <div class="logo">
      <i class="el-icon-pear" v-for="(item,index) in pears" :key="item+index"></i>
    </div>-->
    <span class="userName">欢迎您，管理员</span>
    <el-avatar
      class="avatar"
      :size="40"
      src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2842818322,1815386921&fm=15&gp=0.jpg"
    ></el-avatar>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      pears: [1, 1],
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 66px;
  background: linear-gradient(rgba($color: #2d3436, $alpha: 0.8), #636e72);
  position: relative;
  display: flex;
  align-items: center;
  h2 {
    flex: 1;
    padding-left: 100px;
    color: rgb(241, 241, 241);
    font-weight: 400;
  }
  .userName{
    font-size: 14px;
    color: #222;
  }
  .logo {
    height: 100%;
    width: 500px;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;

    i {
      font-size: 20px;
    }
  }
  .el-icon-search {
    width: 50px;
    font-size: 40px;
    margin-right: 80px;
  }
  .avatar {
    margin-right: 50px;
    margin-left: 30px;
  }
}
</style>