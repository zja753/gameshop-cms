<template>
  <div>
    <h2>用户管理</h2>

    <div class="content">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="标签名称" prop="tagname"></el-table-column>
        <el-table-column label="标签介绍" prop="tagintro"></el-table-column>

        <el-table-column align="right">
          <template slot="header">
            <div class="operation">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              <el-button size="mini" type="warning" round>增加记录</el-button>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "TagManage",
  data() {
    return {
      tableData: [
        {
          tagintro: "2016-05-02",
          tagname: "王小虎",
          balance: 111,
        },
        {
          account: "2016-05-02",
          nickname: "王小虎",
          balance: 111,
        },
        {
          account: "2016-05-02",
          nickname: "王小虎",
          balance: 111,
        },
        {
          account: "2016-05-02",
          nickname: "王小虎",
          balance: 111,
        },
      ],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  border: 1px solid blue;
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