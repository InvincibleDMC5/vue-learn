<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      ref="numValue"
      @change="numChange"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {};
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    numChange() {
      var v = parseInt(this.$refs.numValue.value);
      if(v >= this.max){
        v = this.max;
      }
      if(v < 1){
        v = 1;
      }
      this.$emit("setCount",v);
    }
  },
  props: ["max"],
  watch: {
    'max': function(newV, oldV) {
      mui('.mui-numbox').numbox().setOption('max',newV)//调用mui提供的jsapi设置输入框的最大值
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-numbox {
  display: inline-block;
}
</style>