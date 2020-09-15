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
  .main {
    flex: 1;
    display: flex;

    .siderbar {
      width: 200px;
      border: 1px solid red;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .content {
      flex: 1;
      border: 1px solid red;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>