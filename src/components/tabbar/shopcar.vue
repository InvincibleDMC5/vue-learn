<template>
  <div>
    <div class="container">
      <div class="mui-card" v-for="i in shops" :key="i.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="mui-input-row mui-checkbox mui-left">
              <div class="pic-sel">
                <input
                  name="checkbox"
                  value="Item 1"
                  type="checkbox"
                  :checked="$store.getters.getSelected[i.id]"
                  @click="$store.commit('updateSelected',i.id)"
                />
                <img :src="i.thumb_path" />
              </div>
              <div class="info">
                <h1>{{i.title}}</h1>
                <div class="inline">
                  <p>
                    <span>￥{{i.sell_price}}</span>
                  </p>
                  <shopcarnumbox :id="i.id"></shopcarnumbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nothing" v-show="show">
        <div class="mui-icon-extra mui-icon-extra-cart"></div>
        <div class="article">
          <h4>购物车竟然是空的</h4>
          <p>再忙,也要记得买点什么犒赏自己~</p>
        </div>
        <router-link to="/home/goodlist">
          <mt-button siz="normal" type="danger" plain>去逛逛</mt-button>
        </router-link>
      </div>
      <div class="btns">
        <div class="mui-input-row mui-checkbox mui-left">
          <input
            name="checkbox"
            value="Item 1"
            type="checkbox"
            @click="$store.commit('selectedAll')"
            :checked="$store.getters.getAll"
          />
        </div>
        <mt-button size="small" type="danger" plain class="del" @click="del">删除</mt-button>
        <span>
          合计:
          <em>￥{{$store.getters.totalPrice}}</em>
        </span>
        <mt-button size="normal" type="danger" class="steɪtmənts">结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import shopcarnumbox from "../subcomponent/shopcar_numbox.vue";
export default {
  data() {
    return {
      shops: [],
    };
  },
  components: {
    shopcarnumbox
  },
  computed: {
    show:function(){
      return this.shops.length === 0 ? true:false;
    }
  },
  methods: {
    getShopInfo() {
      var ids = this.$store.getters.getIds;
      if (ids.length === 0) {
        this.shops = [];
        return;
      }
      this.axios
        .get("/api/goods/getshopcarlist/" + ids.join())
        .then(response => {
          if (response.data.status === 0) {
            this.shops = response.data.message;
          } else {
            alert("错了");
          }
        });
    },
    del() {
      //获取那些货物是被选中的
      this.$store.commit("delShop");
      this.getShopInfo();
    }
  },
  created() {
    this.getShopInfo();
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 94vh;
  .mui-card {
    .mui-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      input[name="checkbox"] {
        position: unset;
        &:checked:before {
          content: "\E442";
          color: red;
        }
      }
      .pic-sel {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          width: 60px;
          height: 60px;
          margin-left: 30px;
        }
      }
      .info {
        flex: 2;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: 13px;
          margin: 0;
        }
        .inline {
          p {
            display: inline-block;
            margin: 0;
            span {
              color: red;
              font-weight: bolder;
            }
          }
        }
      }
    }
  }
  .nothing {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    text-align: center;
    .mui-icon-extra {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      position: relative;
      box-shadow: 0px 0px 7px;
      background-color: #26A2FF;
      &::before {
        content: "\E107";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        color: white;
      }
    }
    div {
      margin: 10px 0;
      h4{
        color: #8f8f94;
        
      }
    }
  }
  .btns {
    background-color: #fff;
    margin: 10px 0px;
    display: flex;
    align-items: center;
    width: 100%;
    // max-width: 380px;
    min-width: 200px;
    justify-content: space-around;
    padding: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    position: fixed;
    bottom: -11px;

    .mui-left {
      display: inline-block;
      input[name="checkbox"] {
        position: unset;

        &:checked:before {
          content: "\E442";
          color: red;
        }
      }
    }
    .del {
    }
    .steɪtmənts {
    }
    em {
      color: red;
      font-style: unset;
    }
  }
}
</style>