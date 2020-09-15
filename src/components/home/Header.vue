<template>
  <div class="header">
    <h2>游戏商城管理系统</h2>
    <div class="logo">
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
      <i class="el-icon-pear"></i>
    </div>

    <i class="el-icon-search"></i>
    <div class="touxiang">头像</div>
  </div>
</template>
<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
  height: 66px;
  // background: #2d3436;
  background: rgba($color: #2d3436, $alpha: 0.8);
  position: relative;
  display: flex;
  align-items: center;
  h2 {
    flex: 1;
    // text-align: center;
    padding-left: 100px;
  }
  .logo {
    height: 100%;
    width: 100px;
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
  .touxiang {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: white;
    border: 1px solid red;
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
</style>