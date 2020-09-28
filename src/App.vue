<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #555;
    // background-image: -webkit-linear-gradient(
    //   45deg,
    //   rgba(255, 255, 255, 0.2) 25%,
    //   transparent 25%,
    //   transparent 50%,
    //   rgba(255, 255, 255, 0.2) 50%,
    //   rgba(255, 255, 255, 0.2) 75%,
    //   transparent 75%,
    //   transparent
    // );
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
}
</style>
