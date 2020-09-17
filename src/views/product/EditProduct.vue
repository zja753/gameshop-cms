<template>
  <div class="editProduct">
    <el-form ref="form" class="productForm" :model="product" :rules="rules" label-width="120px">
      <el-form-item label="游戏组：" prop="group">
        <el-select v-model="product.group" filterable placeholder="请选择">
          <el-option v-for="item in groups" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏名：" prop="name">
        <el-input v-model="product.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="游戏英文名：" prop="name_en">
        <el-input v-model="product.name_en" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="游戏简介：" prop="brief_introduction">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="product.brief_introduction"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细介绍：" prop="introduction">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="product.introduction"></el-input>
      </el-form-item>
      <el-form-item label="销售价格：" prop="price">
        <el-input-number v-model="product.price" controls-position="right" :min="0.1"></el-input-number>
      </el-form-item>
      <el-form-item label="折扣：" prop="discount">
        <el-input-number v-model="product.discount" controls-position="right" :min="0.1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="是否是DLC：" prop="is_dlc">
        <el-radio-group v-model="product.is_dlc" size="medium">
          <el-radio-button label="是的"></el-radio-button>
          <el-radio-button label="不是"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否是试玩版：" prop="is_demo">
        <el-radio-group v-model="product.is_demo" size="medium">
          <el-radio-button label="是的"></el-radio-button>
          <el-radio-button label="不是"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发售日期：" prop="sale_date">
        <el-date-picker v-model="product.sale_date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editProduct">立即修改</el-button>
        <el-button @click="backToManage">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      groups: [],
      rules: {
        group: [{ required: true, message: "请选择游戏组", trigger: "change" }],
        name: [{ required: true, message: "请输入游戏名", trigger: "blur" }],
        brief_introduction: [
          { required: true, message: "请输入游戏简介", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请输入详细介绍", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入销售价格", trigger: "blur" }],
        discount: [{ required: true, message: "请输入折扣", trigger: "blur" }],
        is_dlc: [
          { required: true, message: "请确定是否是DLC", trigger: "change" },
        ],
        is_demo: [
          { required: true, message: "请确定是否是试玩版", trigger: "change" },
        ],
        sale_date: [
          {
            required: true,
            message: "请选择发售日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    editProduct() {
      console.log(this.product);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const group = this.groups.find(
            (item) => this.product.group === item._id
          );
          this.product.group_id = group._id;
          this.product.group_name = group.name;
          this.product.is_dlc = this.product.is_dlc === "是的" ? true : false;
          this.product.is_demo = this.product.is_demo === "是的" ? true : false;
          this.$axios
            .post("/product/update", this.product)
            .then((res) => {
              if (res.status === 1) {
                console.log("修改游戏成功", res);
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.$router.push("../ProductManage");
              } else {
                console.log("修改游戏失败", res);
                this.$message({
                  message: res.err,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              this.$message({
                message: "未知错误",
                type: "error",
              });
              console.log(err);
            });
        } else {
          this.$message({
            message: "请将游戏信息填写完全",
            type: "warning",
          });
          return false;
        }
      });
    },
    backToManage() {
      this.$router.push("../ProductManage");
    },
    fetchGroups() {
      this.$axios.get("/group/fetch", { page: 0, limit: 999 }).then((res) => {
        this.groups = res.data;
        console.log(this.groups);
      });
    },
    getProduct() {
      this.$axios
        .get("/product/get", { _id: this.$route.params.id })
        .then((res) => {
          if (res.status === 1) {
            this.product = {
              ...res.data,
              group: res.data.group_id,
              is_dlc: res.data.is_dlc ? "是的" : "不是",
              is_demo: res.data.is_demo ? "是的" : "不是",
            };
            console.log(this.product);
          } else {
            this.$message({
              message: res.err,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "获取商品时发生未知错误",
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.fetchGroups();
    this.getProduct();
  },
};
</script>

<style lang='scss'>
.editProduct {
  display: flex;
  justify-content: center;
  align-items: center;
  .productForm {
    width: 80%;
    height: 80%;
  }
}
</style>