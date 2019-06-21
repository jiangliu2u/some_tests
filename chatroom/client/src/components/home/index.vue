<style lang='less'>
.app-home-vue {
  .home-part-body {
    height: 350px;
    .echarts-vue {
      height: 350px;
    }
  }

  .home-part-body2 {
    height: 420px;
    .echarts-vue {
      height: 420px;
    }
  }

  .progress-div {
    > p {
      padding: 8px 0;
    }
    .h-progress {
      &-title {
        color: @dark2-color;
        font-size: 15px;
      }
      &-text {
        width: 40px;
      }
    }
  }
}
</style>
<template>
  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="h-panel">
          <div class="relative">
            <textarea :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-model="chat_content"></textarea>
            <div></div>
          </div>
          <div class="home-part-body"></div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chat_content: '',
      type: 'type1'
    };
  },
  methods: {}
};
</script>
