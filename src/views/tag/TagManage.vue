<template>
  <div class="tagManageBox">
    <div class="operation"></div>
    <el-table :data="tagList" height="800" border style="width: 100%">
      <el-table-column prop="name" label="标签名" width="180"></el-table-column>
      <el-table-column prop="introduction" label="介绍"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="{row}">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="editTargetTag(row._id)">编辑</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="deleteTargetTag(row._id)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="addBtn" type="primary" icon="el-icon-plus" circle @click="addBoxVisible=true"></el-button>

    <el-dialog title="添加标签" :visible.sync="addBoxVisible" width="30%" :before-close="addBoxClose">
      <el-form class="form" ref="form" :model="addTag" label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="addTag.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="addTag.introduction" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBoxVisible = false">取 消</el-button>
        <el-button type="primary" @click="addingTag" :loading="addBtnLoding">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: [],
      pagination: {
        page: 0,
        limit: 10,
      },
      addBoxVisible: false,
      addTag: {},
      addBtnLoding: false,
    };
  },
  methods: {
    fetchTagList() {
      this.$axios.get("/tag/fetch", this.pagination).then((res) => {
        this.tagList = res.data;
      });
    },
    addBoxClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    addingTag() {
      // 要先数据验证
      this.addBtnLoding = true;
      if (this.addTag.name === undefined || this.addTag.name === "") {
        this.$message({
          message: "标签名称不能为空",
          type: "warning",
        });
        this.addBtnLoding = false;
      } else {
        this.$axios
          .post("/tag/create", this.addTag)
          .then((res) => {
            if (res.status === 1) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.addBoxVisible = false;
              this.addTag = {};
              this.fetchTagList();
            } else {
              this.$message({
                message: res.err,
                type: "warning",
              });
            }
            this.addBtnLoding = false;
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "warning",
            });
            this.addBtnLoding = false;
          });
      }
    },
    editTargetTag(id) {
      console.log(id);
    },
    deleteTargetTag(id) {
      console.log(id);
    },
  },
  mounted() {
    this.fetchTagList();
  },
};
</script>

<style lang='scss'>
.tagManageBox {
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