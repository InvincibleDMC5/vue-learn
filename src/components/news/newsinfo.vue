<template>
  <div class="newsinfo-container">
    <p class="title">{{nl.title}}</p>
    <p class="subtitle">
      <span>发表时间:{{nl.add_time | dateformat}}</span>
      <span>点击:{{nl.click}}次</span>
    </p>
    <hr />
    <article class="content" v-html="nl.content"></article>
    <comment :id="msg"></comment>
  </div>
</template>
<script>
import comment from "../subcomponent/comment.vue"

export default {
  data() {
    return {
      msg: this.$route.params.id,
      nl:{}
    };
  },
  methods: {
    getNewByid() {
        this.axios.get("/api/getnew/" + this.msg).then(response => {
            if(response.data.status === 0){
                this.nl = response.data.message[0];
            }else{
                alert("获取数据失败")
            }
        })
    }
  },
  components:{
      comment
  },
  created() {
      this.getNewByid()
  },
};
</script>
<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 10px;
  overflow: hidden;
  .title {
    text-align: center;
    font-size:1rem;
    font-weight: bold;
    margin: 10px 0;
    color: black;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    color: blue;
  }
  
}
</style>