<template>
  <div class="hC">
    <swiper :lbtList="picS" :isFull="false"></swiper>
    <div class="icons">
      <ul class="row1">
        <li><router-link to="/home/newlist"><img src="../../images/menu1.png" ><div>新闻资讯</div></router-link></li>
        <li><router-link to="/home/photolist"><img src="../../images/menu2.png"><div>图片分享</div></router-link></li>
        <li><router-link to="home/goodlist"><img src="../../images/menu3.png"><div>商品购买</div></router-link></li>
      </ul>
      <ul class="row2">
        <li><router-link to=""><img src="../../images/menu4.png"><div>留言反馈</div></router-link></li>
        <li><router-link to=""><img src="../../images/menu5.png"><div>视频专区</div></router-link></li>
        <li><router-link to=""><img src="../../images/menu6.png"><div>联系我们</div></router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponent/swiper.vue"

export default {
  data() {
    return {
      picS: []
    };
  },
  methods: {
    getHPic() {
      this.axios.get("/api/getlunbo").then(respone => {
        if (respone.data.status === 0) {
          this.picS = respone.data.message;
        }
      });
    }
  },
  created() {
    this.getHPic();
  },
  components:{
    swiper
  }
};
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.hC{
  width: 100%;
}

.icons{
  width: 100%;
  font-size: small;
}
.icons .row1,
.icons .row2{
  display: flex;
  justify-content: space-between;
}
.icons .row1 li,
.icons .row2 li{
  width: 33%;
  height: 0;
  /* 重要 */
  padding-top: 33%;
  position: relative;
  box-sizing: border-box;
  /* border: 1px solid black; */
}
.icons .row1 li img,
.icons .row2 li img{
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

li:hover a {
  background-color: lightgray;
  /* color: white; */
  font-size: medium;
}
a{
  display: inline-flex;
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
a div{
  line-height: 2rem;
  color: black;
}
</style>