<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容(最多BB120个字)" maxlength="120" v-model="value"></textarea>
    <mt-button type="primary" size="large" @click="uploadComment" @keydown.enter="uploadComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time" >
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateformat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>
    <mt-button type="danger" plain size="large" @click="moreNew">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments: [],
      pageindex: 1,
      value:""
    };
  },
  props: ["id"],
  methods: {
    getComments() {
      this.axios
        .get(`/api/getcomments/${this.id}?pageindex=${this.pageindex}`)
        .then(response => {
          if (response.data.status === 0) {
            this.comments = [...this.comments,...response.data.message]; 
          } else {
            alert("获取数据失败");
          }
        });
    },
    uploadComment() {
      if(this.value.trim().length === 0){
        return alert("输入不能为空!")
      }
      var that = this;
        this.axios.post(`/api/postcomment/${this.id}`,{
          content : that.value.trim()
        }).then(function(response){
          if(response.data.status === 0){
            var cmt;
            cmt = {
              user_name:"匿名用户",
              add_time:Date.now(),
              content:that.value.trim()
            }
            that.comments.splice(9,1);
            that.comments.unshift(cmt);
            that.value = ""
          }
        })
    },
    moreNew(){
        this.pageindex += 1;
        this.getComments();
    }
  },
  created() {
    this.getComments();
  }
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  .mint-button--danger {
    margin-bottom: 10px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>