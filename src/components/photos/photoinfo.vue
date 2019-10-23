<template>
  <div class="photoinfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间 {{photoInfo.add_time | dateformat}}</span>
      <span>点击:{{photoInfo.click}}次</span>
    </p>
    <hr />
    <!-- 缩略图 -->
    <vue-preview :slides="pics" @close="handleClose"></vue-preview>

    <!-- 图片内容 -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 评论组件 -->
    <comment :id="msg"></comment>
  </div>
</template>
<script>
import comment from "../subcomponent/comment.vue";

export default {
  data() {
    return {
      msg: this.$route.params.id,
      photoInfo: {},
      pics: []
    };
  },
  components: {
    comment
  },
  methods: {
    handleClose() {
      console.log("close event");
    },
    getPhotoInfo() {
      this.axios.get("/api/getimageinfo/" + this.msg).then(response => {
        if (response.data.status === 0) {
          this.photoInfo = response.data.message[0];
        } else {
          alert("获取失败");
        }
      });
    },
    getPics() {
      this.axios.get("/api/getthumimages/" + this.msg).then(response => {
        if (response.data.status === 0) {
          var p = response.data.message;
          this.pics = p.map(function(v, i) {
            return {
              src: v.src,
              msrc: v.src,
              w: 600,
              h: 400
            };
          });
        }
      });
    },

  },
  created() {
    this.getPhotoInfo();
    this.getPics();
  },
  
};
</script>
<style lang="scss" scoped>

.photoinfo-container {
  padding: 3px;
  figure{
      margin: 0px;
  }
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 15px;
    line-height: 30px;
    margin-bottom: 10px;
  }
}

</style>