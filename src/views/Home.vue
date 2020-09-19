<template>
  <div class="home">
    <Header />
    <div class="main">
      <SiderBar class="siderbar" />
      <vue-scroll :ops="ops" style="width:100%;height:100%">
        <router-view class="content"></router-view>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import Header from "@/components/home/Header";
import SiderBar from "@/components/home/SiderBar";

export default {
  name: "Home",
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true,
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#F5F5F5", //滚动条颜色
          opacity: 0.5, //滚动条透明度
          "overflow-x": "hidden",
        },
      },
    };
  },
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
      background-color: #636e72;
    }
  }
}
</style>