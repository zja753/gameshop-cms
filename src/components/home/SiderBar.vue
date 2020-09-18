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
          <el-menu-item index="1">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">游戏组管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">游戏管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="5">
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
    handleSelect(key) {
      switch (key) {
        case "1":
          this.to("/home/usermanage");
          break;
        case "2":
          this.to("/home/groupmanage");
          break;
        case "3":
          this.to("/home/productmanage");
          break;
        case "4":
          this.to("/home/ordermanage");
          break;
        case "5":
          this.to("/home/tagmanage");
          break;
      }
    },
    to(path) {
      if (path !== this.$route.path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.siderbar {
  background: #636e72;
  .tac {
    width: 100%;
    .el-menu-vertical-demo {
      border-right: none;
    }
  }
}
</style>