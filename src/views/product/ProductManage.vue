<template>
  <div class="productManageBox">
    <div class="operation"></div>
    <el-table :data="productList" height="800" border style="width: 100%">
      <el-table-column prop="group_name" label="组名"></el-table-column>
      <el-table-column prop="name" label="游戏名" width="180"></el-table-column>
      <el-table-column prop="name_en" label="英文名"></el-table-column>
      <el-table-column prop="brief_introduction" label="简介"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="discount" label="折扣"></el-table-column>
      <el-table-column prop="is_dlc" label="DLC">
        <template slot-scope="{row}">{{row.is_dlc?'是的':'不是'}}</template>
      </el-table-column>
      <el-table-column prop="is_demo" label="试玩版">
        <template slot-scope="{row}">{{row.is_demo?'是的':'不是'}}</template>
      </el-table-column>
      <el-table-column prop="rate" label="评分"></el-table-column>
      <el-table-column prop="sale_date" label="发售时间" placeholder="选择日期"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="{row}">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="editTargetGroup(row._id)">编辑</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="deleteTargetGroup(row._id)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="addBtn" type="primary" icon="el-icon-plus" circle @click="toAddPage"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList: [],
      pagination: {
        page: 0,
        limit: 10,
      },
    };
  },
  methods: {
    fetchProductList() {
      this.$axios.get("/product/fetch", this.pagination).then((res) => {
        this.productList = res.data;
      });
    },
    editTargetGroup(id) {
      console.log(id);
    },
    deleteTargetGroup(id) {
      console.log(id);
    },
    toAddPage() {
      this.$router.push("./addproduct");
    },
  },
  mounted() {
    this.fetchProductList();
  },
};
</script>

<style lang='scss'>
.productManageBox {
  padding: 20px;
  .operation {
    display: flex;
  }
  .addBtn {
    position: fixed;
    right: 100px;
    bottom: 100px;
    z-index: 2;
  }
}
</style>