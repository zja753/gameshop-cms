<template>
  <div class="productManageBox">
    <div class="operation"></div>
    <el-table class="productListTable" :data="productList" height="800" border>
      <el-table-column prop="group_name" label="组名"></el-table-column>
      <el-table-column prop="name" label="游戏名" width="180"></el-table-column>
      <el-table-column prop="name_en" label="英文名"></el-table-column>
      <el-table-column prop="brief_introduction" label="简介"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="discount" label="折扣"></el-table-column>
      <el-table-column prop="is_dlc" label="DLC">
        <template slot-scope="{ row }">{{
          row.is_dlc ? "是的" : "不是"
        }}</template>
      </el-table-column>
      <el-table-column prop="is_demo" label="试玩版">
        <template slot-scope="{ row }">{{
          row.is_demo ? "是的" : "不是"
        }}</template>
      </el-table-column>
      <el-table-column prop="rate" label="评分"></el-table-column>
      <el-table-column
        prop="sale_date"
        label="发售时间"
        placeholder="选择日期"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="{ row }">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editTargetGroup(row._id)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="deleteTargetGroup(row._id)"
              >删除</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next, jumper"
      :total="totle"
      :page-size="pagination.limit"
      @current-change="toCurrentPage"
    >
    </el-pagination>
    <el-button
      class="addBtn"
      type="primary"
      icon="el-icon-plus"
      circle
      @click="toAddPage"
    ></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList: [],
      pagination: {
        page: 0,
        limit: 20,
      },
      totle: 10,
    };
  },
  methods: {
    fetchProductList() {
      this.$axios.get("/product/fetch", this.pagination).then((res) => {
        this.productList = res.data.map((item) => {
          return {
            ...item,
            rate: 2 * parseFloat(item.score_count / item.user_count).toFixed(1),
            sale_date: new Date(item.sale_date * 1000).toLocaleDateString(),
            brief_introduction: item.brief_introduction.slice(0, 20) + "...",
          };
        });
      });
    },
    editTargetGroup(id) {
      this.$router.push(`./EditProduct/${id}`);
    },
    deleteTargetGroup(id) {
      this.$confirm("是否删除该条数据???", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/product/delete", {
              _id: id,
            })
            .then((res) => {
              if (res.status === 1) {
                this.fetchProductList();
                this.$message({
                  message: res.msg,
                  type: "success",
                });
              } else {
                this.$message({
                  message: res.err,
                  type: "warning",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toAddPage() {
      this.$router.push("./addproduct");
    },
    toCurrentPage(currentPage) {
      this.pagination.page = currentPage - 1;
      this.fetchProductList();
      console.log(this.pagination);
    },
  },
  mounted() {
    this.fetchProductList();
    this.$axios.get("product/count").then((res) => {
      this.totle = res.data;
    });
  },
};
</script>

<style lang='scss'>
.productManageBox {
  padding: 20px;

  .operation {
    display: flex;
  }
  .productListTable {
    width: 100%;
    border-radius: 10px;
  }
  .pagination {
    margin-top: 10px;

    .el-pagination__jump {
      color: white;
    }
  }
  .addBtn {
    position: fixed;
    right: 100px;
    bottom: 100px;
    z-index: 2;
  }
}
</style>