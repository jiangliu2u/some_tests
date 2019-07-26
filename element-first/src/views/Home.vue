<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button type="primary" @click="go">干死黄旭东</el-button>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      radio1: "",
      num: 1
    };
  },
  methods: {
    go() {
      this.$router.push("about");
    }
  },
  watch: {
    radio1: function(v) {
      console.log(v);
    }
  }
};
</script>
<style scoped>
div {
  padding: 2px;
}
</style>