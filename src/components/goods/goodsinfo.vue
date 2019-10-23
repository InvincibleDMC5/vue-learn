<template>
  <div class="goodsinfo-container">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lbtList="lbtPhoto" :isFull="true"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodinfo.market_price}}</del>
            销售价:
            <span class="now-price">￥{{goodinfo.sell_price}}</span>
          </p>

          <span>购买数量:</span>
          <div class="inline-box">
            <numberbox  :max="goodinfo.stock_quantity" @setCount="setCount"></numberbox>
          </div>

          <div class="button-box">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodinfo.goods_no}}</p>
          <p>库存情况:{{goodinfo.stock_quantity}}</p>
          <p>上架时间:{{goodinfo.add_time | dateformat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(goodinfo.id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(goodinfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponent/swiper.vue";
import numberbox from "../subcomponent/goodsinfo_numberbox.vue";

export default {
  data() {
    return {
      msg: this.$route.params.id,
      lbtPhoto: [],
      goodinfo: {},
      // isShow: true,
      selectedCount:1
    };
  },
  methods: {
    getlbt() {
      this.axios.get("/api/getthumimages/" + this.msg).then(response => {
        if (response.data.status === 0) {
          this.lbtPhoto = response.data.message;
        } else {
          alert("获取失败");
        }
      });
    },
    getgoodinfo() {
      this.axios.get("/api/goods/getinfo/" + this.msg).then(response => {
        if (response.data.status === 0) {
          this.goodinfo = response.data.message[0];
        } else {
          alert("获取失败");
        }
      });
    },
    goComment(i) {
      //不同于使用routerlink 这是函数式导航
      this.$router.push({ name: "goodcomment", params: { id: i } });
    },
    goDesc(i) {
      this.$router.push({ name: "gooddesc", params: { id: i } });
    },
    addToShopCar() {
      var goodObj = {
        id:this.goodinfo.id,
        price:this.goodinfo.sell_price,
        selected:false,
        selectedCount:this.selectedCount
      }
      this.$store.commit('addToCar',goodObj);
      this.$store.commit('jump');
    },
    setCount(c){
      this.selectedCount = c;
    }
  },
  created() {
    this.getlbt();
    this.getgoodinfo();
  },
  components: {
    swiper,
    numberbox
  },
  
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now-price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card {
    overflow: unset;
    .inline-box {
      position: relative;
      display: inline-block;
      
    }
  }
  .button-box {
    margin-top: 10px;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0px;
    }
  }
}
</style>