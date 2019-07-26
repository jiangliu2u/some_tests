<template>
  <div class="about">
    <h1>{{ msgs }}</h1>
    <el-button type="danger" @click="gohome">巨像能对空</el-button>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    msg: String
  },
  data() {
    return {
        msgs:"fuck"
    };
  },
  methods:{
      gohome(){
          this.$router.push("/");
      }
  }
};
</script>