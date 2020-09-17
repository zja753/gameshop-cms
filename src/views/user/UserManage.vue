<template>
  <div>
    <h2>用户管理</h2>

    <div class="content">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="用户昵称" prop="nickName"></el-table-column>
        <el-table-column label="账号" prop="email"></el-table-column>
        <el-table-column label="用户余额" prop="balance"></el-table-column>

        <el-table-column align="right">
          <template slot="header">
            <div class="operation">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              <el-button size="mini" type="warning" round>增加记录</el-button>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary">编辑</el-button> -->
            <el-button size="mini" type="info" @click="checkDetail(scope.$index, scope.row)">用户详情</el-button>
            <!-- <el-button size="mini" type="success">查看订单</el-button> -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
.content {
  width: 100%;
  // border: 1px solid blue;
}
.operation {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 0 5px;
  }
}
</style>