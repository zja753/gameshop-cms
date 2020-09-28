<template>
  <div class="userManage">
    <div class="operation"></div>
    <el-table class="tagListTable" :data="tableData" height="800" border>
      <el-table-column label="用户昵称" prop="nickName"></el-table-column>
      <el-table-column label="账号" prop="email"></el-table-column>
      <el-table-column label="用户余额" prop="balance"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary">编辑</el-button> -->
          <el-button
            size="mini"
            type="info"
            @click="checkDetail(scope.$index, scope.row)"
            >用户详情</el-button
          >
          <!-- <el-button size="mini" type="success">查看订单</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="addBtn"
      type="primary"
      icon="el-icon-plus"
      circle
      @click="addBoxVisible = true"
    ></el-button>
  </div>
</template>
<script>
export default {
  name: "UserManage",
  data() {
    return {
      tableData: [],
      search: "",
      addBoxVisible: false,
      addBtnLoding: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index) {
      this.$confirm("是否删除该条数据???", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/user/delete", { _id: this.tableData[index]._id })
            .then((res) => {
              // console.log(res);
              if (res.status == 1) {
                this.$message({
                  type: "success",
                  message: "删除数据成功",
                });
              }
              this.fetchAll();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    checkDetail(index) {
      this.$router.push("/home/userdetail/" + this.tableData[index]._id);
    },
    fetchAll() {
      this.$axios.get("/user/fetch").then((res) => {
        this.tableData = res.data.filter((item) => {
          return item.role !== "admin";
        });
        console.log(this.tableData);
      });
    },
  },
  created() {},
  mounted() {
    this.fetchAll();
  },
};
</script>

<style lang="scss" scoped>
.userManage {
  padding: 20px;
  .operation {
    display: flex;
  }
  .tagListTable {
    width: 100%;
    border-radius: 10px;
  }
  .addBtn {
    position: fixed;
    right: 100px;
    bottom: 100px;
    z-index: 2;
  }
}
</style>