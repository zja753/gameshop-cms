<template>
  <div class="groupManageBox">
    <div class="operation"></div>
    <el-table :data="groupList" height="800" border style="width: 100%">
      <el-table-column prop="name" label="组名" width="180"></el-table-column>
      <el-table-column prop="introduction" label="介绍"></el-table-column>
      <el-table-column prop="click" label="点击数" width="180"></el-table-column>
      <el-table-column label="标签">
        <template slot-scope="{row}">
          <el-tag
            v-for="tag in row.tags"
            :key="tag+'-'+row.name"
            type="danger"
            effect="plain"
            style="margin-left:10px"
          >{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="{row}">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="editTargetGroup(row._id)">编辑</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="deleteTargetGroup(row._id)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="addBtn" type="primary" icon="el-icon-plus" circle @click="addBoxVisible=true"></el-button>

    <el-dialog
      title="添加组"
      :visible.sync="addBoxVisible"
      width="30%"
      :close-on-click-modal="false"
      :before-close="addBoxClose"
    >
      <el-form class="form" ref="form" :model="addGroup" label-width="80px">
        <el-form-item label="组名称">
          <el-input v-model="addGroup.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="addGroup.introduction" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="标签选择">
          <el-select v-model="addGroup.tagList" multiple placeholder="请选择">
            <el-option
              v-for="item in tagList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBoxVisible = false">取 消</el-button>
        <el-button type="primary" @click="addingGroup" :loading="addBtnLoding">添 加</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑组"
      :visible.sync="editBoxVisible"
      width="30%"
      :close-on-click-modal="false"
      :before-close="addBoxClose"
    >
      <el-form class="form" ref="form" :model="editGroup" label-width="80px">
        <el-form-item label="组名称">
          <el-input v-model="editGroup.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="editGroup.introduction" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="标签选择">
          <el-select
            v-model="editGroup.tagList"
            multiple
            placeholder="请选择"
            @change="$forceUpdate()"
          >
            <el-option
              v-for="item in tagList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBoxVisible = false">取 消</el-button>
        <el-button type="primary" @click="editingGroup" :loading="editBtnLoding">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupList: [],
      pagination: {
        page: 0,
        limit: 10,
      },
      addBoxVisible: false,
      addGroup: {},
      addBtnLoding: false,
      editBoxVisible: false,
      editGroup: {},
      editBtnLoding: false,
      tagList: [],
    };
  },
  methods: {
    fetchGroupList() {
      this.$axios.get("/group/fetch", this.pagination).then((res) => {
        this.groupList = res.data;
      });
    },
    addBoxClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    addingGroup() {
      this.addBtnLoding = true;
      if (this.addGroup.name === undefined || this.addGroup.name === "") {
        this.$message({
          message: "组名称不能为空",
          type: "warning",
        });
        this.addBtnLoding = false;
      } else {
        const group = { ...this.addGroup };
        group.tagList = this.addGroup.tagList.map((name) =>
          this.tagList.find((item) => item.name === name)
        );
        console.log({ group });
        this.$axios
          .post("/group/create", group)
          .then((res) => {
            console.log(res);
            this.addBtnLoding = false;
            if (res.status === 1) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.addBoxVisible = false;
              this.addGroup = {};
              this.fetchGroupList();
            } else {
              this.$message({
                message: res.err,
                type: "warning",
              });
            }
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
    editingGroup() {
      this.editBtnLoding = true;
      if (this.editGroup.name === undefined || this.editGroup.name === "") {
        this.$message({
          message: "组名称不能为空",
          type: "warning",
        });
        this.editBtnLoding = false;
      } else {
        const group = { ...this.editGroup };
        group.tagList = this.editGroup.tagList.map((name) =>
          this.tagList.find((item) => item.name === name)
        );
        console.log({ group });
        this.$axios
          .post("/group/update", group)
          .then((res) => {
            console.log(res);
            this.editBtnLoding = false;
            if (res.status === 1) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.editBoxVisible = false;
              this.editGroup = {};
              this.fetchGroupList();
            } else {
              this.$message({
                message: res.err,
                type: "warning",
              });
            }
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "warning",
            });
            this.editBtnLoding = false;
          });
      }
    },
    async editTargetGroup(id) {
      this.$axios.get("/group/get", { _id: id }).then((res) => {
        console.log({ res });
        this.editGroup = res.data;
        this.editGroup.tagList = [...this.editGroup.tags];
        this.editBoxVisible = true;
      });
    },
    deleteTargetGroup(id) {
      this.$confirm("是否删除该条数据???", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/group/delete", {
              _id: id,
            })
            .then((res) => {
              this.fetchGroupList()
              if (res.status === 1) {
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
          this.fetchGroupList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.fetchGroupList();
    this.$axios.get("/tag/fetch", this.pagination).then((res) => {
      this.tagList = res.data;
    });
  },
};
</script>

<style lang='scss'>
.groupManageBox {
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