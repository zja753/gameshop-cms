<template>
  <div class="siderbar">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          :style="{width:'200px'}"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#636e72"
          text-color="#fff"
          active-text-color="#e84393"
        >
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
          </el-submenu>-->
          <el-menu-item index="1">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">游戏管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">标签管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SiderBar",
  data() {
    return {
      activeNames: ["0"],
    };
  },
  mounted() {},
  methods: {
    // handleOpen(key, keyPath) {
    //   // console.log(key, keyPath);
    //   // console.log(233);
    // },
    // handleClose(key, keyPath) {
    //   // console.log(key, keyPath);
    // },
    handleSelect(key) {
      // console.log(key, keyPath);
      if (key == 1) this.$router.push("/home/usermanage");
      if (key == 2) this.$router.push("/home/productmanage");
      if (key == 3) this.$router.push("/home/ordermanage");
      if (key == 4) this.$router.push("/home/tagmanage");
    },
  },
};
</script>

<style lang="scss" scoped>
.siderbar {
  background: #636e72;
  .tac {
    width: 100%;
  }
}
</style>