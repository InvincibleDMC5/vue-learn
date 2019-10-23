<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',i.id === 0 ? 'mui-active':'']"
            href="#"
            v-for="i in cates"
            :key="i.id"
            @click="getPicsById(i.id)"
          >{{ i.title }}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <li v-for="i in pics" :key="i.id">
        <div class="mui-card">
          <div class="img-container">
            <img v-lazy="i.img_url" class="mui-card-header mui-card-media" />
          </div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <p v-if="show(i.update_time)">分享日期:{{ i.update_time | dateformat}}</p>
              <p style="color: #333;">{{ i.title }}</p>
            </div>
          </div>
          <div class="mui-card-footer">
            <a class="mui-card-link">Like</a>
            <router-link class="mui-card-link" :to="'/home/photoinfo/' + i.id">Read more</router-link> 
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
//导入mui的js

export default {
  data() {
    return {
      cates: [],
      pics: [],
    };
  },
  methods: {
    getAllCates() {
      this.axios.get("/api/getimgcategory").then(response => {
        if (response.data.status === 0) {
          var all = {
            title: "全部",
            id: 0
          };
          this.cates = response.data.message;
          this.cates.unshift(all);
        } else {
          alert("获取失败");
        }
      });
    },
    getPicsById(id) {
      this.axios.get("/api/getimages/" + id).then(response => {
        if (response.data.status === 0) {
          this.pics = response.data.message;
        } else {
          alert("获取失败");
        }
      });
    },
    show(t){
        if(t)return true;
        return false;
    }
  },
  created() {
    this.getAllCates();
    this.getPicsById(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      //初始化scroll控件
      deceleration: 0.0005
      //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  padding: 0;
  li {
    list-style: none;
    .mui-card {
      .img-container {
        width: 100%;
        height:100%;
        background-color: grey;
        img[lazy="loading"] {
          width: 40px;
          height: 300px;
          margin: auto;
        }
        img {
          width: 100%;
          height: 100%;
          padding: 0;
        }
      }
    }
  }
}
</style>