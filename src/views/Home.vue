<template>
  <div class="home">
    <Header />
    <div class="main">
      <SiderBar class="siderbar" />
      <router-view class="content"></router-view>
    </div>
  </div>
</template>
<script>
import Header from "@/components/home/Header";
import SiderBar from "@/components/home/SiderBar";

export default {
  name: "Home",
  components: {
    Header,
    SiderBar,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  .main {
    // flex: 1;
    height: calc(100vh - 66px);
    display: flex;

    .siderbar {
      width: 200px;
    }
    .content {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>