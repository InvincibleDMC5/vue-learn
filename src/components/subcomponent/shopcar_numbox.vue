<template>
  <div class="mui-numbox" data-numbox-min="0">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="count" @change="updateCount" ref="count"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      count: 5
    };
  },
  mounted() {
    mui(".mui-numbox").numbox();
    this.setCount(this.id);
  },
  methods: {
    setCount(i) {
      var initCount = this.$store.getters.getCount[i];
      this.count = initCount;
      mui(".mui-numbox")
        .numbox()
        .setValue(this.count);
    },
    updateCount(){
      var counts = {};
      counts.id = this.id;
      counts.selectedCount = parseInt(this.$refs.count.value) > 0 ? parseInt(this.$refs.count.value) : 0;
      this.$store.commit("updateCount",counts);
      // this.$store.commit("jump");
    }
  },
  props: ["max", "id"],
  watch: {
    max: function(newV, oldV) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newV);
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-numbox {
  height: 20px;
  display: inline-block;
  margin: 0;
}
</style>