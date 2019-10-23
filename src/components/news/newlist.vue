<template>
  
    <ul class="mui-table-view" ref="container">
      <li class="mui-table-view-cell mui-media" v-for="i in newList" :key="i.id">
        <router-link :to="'/home/newsinfo/' + i.id">
          <img class="mui-media-object mui-pull-left" :src="i.img_url" />
          <div class="mui-media-body">
            <h4>{{i.title}}</h4>
            <h5>{{i.zhaiyao}}</h5>
            <p class="mui-ellipsis">
              <span>发表时间:{{i.add_time | dateformat}}</span>
              <span>点击{{i.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  
</template>
<script>
export default {
  data() {
    return {
      newList: []
    };
  },
  methods: {
    getNews() {
      this.axios.get("/api/getnewslist").then(Response => {
        if (Response.data.status === 0) {
          this.newList = Response.data.message;
        } else {
          alert("数据获取失败");
        }
      });
    }
  },
  created() {
    this.getNews();
  }
};
</script>
<style lang="scss" scoped>
.mui-table-view {
  li {
    h4,
    h5 {
      font-size: 0.875rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>