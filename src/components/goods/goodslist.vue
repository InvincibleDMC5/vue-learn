<template>
  <div>
    <div :class="['good-list',{full:hasinfo}]">
      <div class="good-item" v-for="i in goodsinfo" :key="i.id" @click="goodDetials(i.id)">
        <img :src="i.img_url" />
        <h3>{{i.title}}</h3>
        <div class="info">
          <p class="price">
            <span class="now-price">¥{{i.sell_price}}</span>
            <span class="old-price">¥{{i.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{i.stock_quantity}}件</span>
          </p>
        </div>
      </div>
    </div>
    <mt-button size="large" type="danger" @click="more" :disabled="goon">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodsinfo: [],
      goon: false,
    };
  },
  methods: {
    getGoodPhoto() {
      this.axios
        .get("/api/getgoods?pageindex=" + this.pageindex)
        .then(response => {
          if (response.data.status === 0 && response.data.message.length != 0) {
            var msg = response.data.message;
            msg.some(function(v, i) {
              if (v.id === 95) {
                v.img_url =
                  "http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201504/desc1284/1000016696/6.jpg";
                return true;
              }
              if (v.id === 97) {
                v.img_url =
                  "http://demo.dtcms.net/upload/201504/20/201504200258403759.jpg";
                return true;
              }
            });
            this.goodsinfo = [...this.goodsinfo, ...msg];
          } else {
            this.goon = true;
          }
        });
    },
    more() {
      this.pageindex += 1;
      this.getGoodPhoto();
    },
    goodDetials(i) {
      this.$router.push("/home/goodsinfo/" + i);
    }
  },
  created() {
    this.getGoodPhoto();
  },
  computed: {
    hasinfo(){
      return this.goodsinfo.length === 0 ? true:false;
    }
  },
};
</script>
<style lang="scss" scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  .good-item {
    box-sizing: border-box;
    width: 48%;
    margin: 1%;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 5px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      width: 100%;
    }
    h3 {
      line-height: 16px;
      height: 32px;
      font-size: 16px;
      margin: 1px;
      margin-bottom: 3px;
      overflow: hidden;
    }
    .info {
      background-color: #ecf0f1;
      margin: 1px;
      overflow: hidden;
      .price {
        margin: 5px;
        .now-price {
          color: rgb(230, 14, 14);
          font-weight: bold;
          font-size: 20px;
          line-height: 20px;
          padding: 0 5px;
        }
        .old-price {
          text-decoration: line-through;
          padding: 0 5px;
        }
      }
      .sell {
        margin: 0px;
        padding: 5px 2px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.full{
  height: 100vh;
}
</style>